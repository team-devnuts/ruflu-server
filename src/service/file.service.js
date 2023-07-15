const { createClientException } = require("../exception/client-exception");
const Image = require("../models/file.model");

// 이미지 여러개의 정보를 DB에 저장하는 서비스
const createImages = async (data, user_id) => {
  const images = [];
  data.forEach((file) => {
    images.push(
      new Image({
        user_id,
        image_original_file_name: file.originalname,
        image_file_name: file.filename.split(".").shift(),
        ext: file.originalname.split(".").pop(),
        image_file_size: file.size,
        image_file_path: file.path,
      })
    );
  });
  const count = await Image.createImages(images);
  if (count < 1) createClientException(503, "image.multiInsert error creating");

  return count;
};

// 하나의 이미지 정보만 DB의 저장하는 서비스 로직
const createSingleImage = async (data) => {
  const image = new Image(data);
  const count = await Image.create(image);
  if (count < 1) createClientException(503, "image.insert error creating");
  return count;
};

// 저장되어있는 이미지의 use_yn을 0으로 변경
const removeUserImage = async (data) => {
  const image = new Image(data);
  const count = await Image.updateUseYn(image);
  if (count < 1) createClientException(503, "image.update error creating");
  return count;
};

// 프로필 정보에서 이미지 창에 들어갔을 때 회원이 업로드한 사진을 보여준다.
const getUserProfileImages = async (user_id) => {
  const result = await Image.getProfileImagesByUserId(user_id);
  return result;
};

// 기존 프로필 이미지에서 새로운 이미지로 교체할때 사용하는 서비스
const updateProfileMainImage = async (profile_id, data) => {
  const image = new Image(data);
  const count = await Image.updateProfileMainImage(profile_id, image);

  if (count < 1) createClientException(403, "프로필 메인 이미지 업로드 오류");

  return count;
};

module.exports = {
  createImages,
  createSingleImage,
  removeUserImage,
  getUserProfileImages,
  updateProfileMainImage,
};
