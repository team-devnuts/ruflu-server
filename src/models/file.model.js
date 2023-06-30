const { getPoolConection } = require("../loaders/database");
const { logger } = require("../loaders/logger");
const fileQueryStore = require("./query/file.query");

class Image {
  constructor(image) {
    this.user_id = image.user_id;
    this.image_file_id = image.image_file_id;
    this.image_file_name = image.image_file_name;
    this.image_original_file_name = image.image_original_file_name;
    this.ext = image.ext;
    this.use_yn = image.use_yn;
    this.image_file_size = image.image_file_size;
    this.image_file_path = image.image_file_path;
    this.registeration_date = image.registeration_date;
    this.modification_date = image.modification_date;
  }
}

Image.create = async (image) => {
  const poolConnection = await getPoolConection();
  // await poolConnection.beginTransaction();
  const [result] = await poolConnection.query(fileQueryStore.insert, image);
  // await poolConnection.commit();
  poolConnection.release();

  return result.affectedRows;
};

Image.createImages = async (images) => {
  const poolConnection = await getPoolConection();
  let count = 0;
  // eslint-disable-next-line
  for (const image of images) {
    // eslint-disable-next-line
    const [result] = await poolConnection.query(fileQueryStore.insert, image);
    count += result.affectedRows;
  }

  poolConnection.release();
  return count;
};

Image.updateUseYn = async (image) => {
  const poolConnection = await getPoolConection();
  const [result] = await poolConnection.query(
    fileQueryStore.updateUseYn,
    image
  );
  poolConnection.release();
  return result.affectedRows;
};

Image.getProfileImagesByUserId = async (user_id) => {
  const poolConnection = await getPoolConection();
  const result = await poolConnection.query(
    fileQueryStore.selectProfileImages,
    { user_id }
  );
  return result;
};

Image.getUserListImages = async (users) => {
  const poolConnection = await getPoolConection();
  let query = fileQueryStore.selectUserAlbum;
  const bindData = [];
  users.forEach((user) => {
    query += "?,";
    bindData.push(user.user_id);
  });

  query = query.slice(0, -1);
  query += ")";
  query = mysql.format(query, bindData);

  const result = await poolConnection.query(query);
  poolConnection.release();
  return result;
};

Image.updateProfileMainImage = async (profile_id, newImage) => {
  const poolConnection = await getPoolConection();
  await poolConnection.beginTransaction();

  let [result] = await poolConnection.query(fileQueryStore.updateUseYn, {
    user_id: newImage.user_id,
    image_file_id: profile_id,
  });

  if (result.affectedRows < 1) {
    await poolConnection.rollback();
    poolConnection.release();
    return result.affectedRows;
  }

  [result] = await poolConnection.query(fileQueryStore.insert, newImage);

  if (result.affectedRows < 1) {
    await poolConnection.rollback();
    poolConnection.release();
    return result.affectedRows;
  }

  await poolConnection.commit();

  poolConnection.release();
  return result.affectedRows;
};

module.exports = Image;
