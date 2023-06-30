const config = require("../../config");

const { IMAGE_BASE_PATH } = config;
const json = {
  insert: `
  INSERT INTO user_album_info
  (   
    user_id
    , image_file_name
    , image_original_file_name
    , ext
    , use_yn
    , image_file_size
    , image_file_path
    , registeration_date
    , modification_date
    )
  VALUES(
    :user_id
    , :image_file_name
    , :image_original_file_name
    , :ext
    , 1
    , :image_file_size
    , :image_file_path
    , now()
    , now()
    );
    `,
  multiInsert: `
  INSERT INTO user_album_info
  (   
    user_id
    , image_file_name
    , image_original_file_name
    , ext
    , image_file_size
    , image_file_path
    , registeration_date
    , modification_date 
  )
  VALUES 
  (:user_id
  , :image_file_name
  , :image_original_file_name
  , :ext
  , :image_file-size
  , :image_file_path
  , now()
  , now())
  `,
  updateUseYn: `
  UPDATE user_album_info SET
    use_yn      = 0
    ,modification_date = now()
  WHERE user_id = :user_id
    AND image_file_id = :image_file_id
    AND use_yn = 1
  `,
  selectUserAlbum: `
  SELECT
      user_id
      ,image_file_id
      ,image_file_name
      ,image_file_path
      ,image_original_file_name
      ,ext
      ,${IMAGE_BASE_PATH}|| image_file_name || '.' || ext as image_url_path
  FROM user_album_info
  WHERE use_yn = 1
    AND user_id IN (
  `,
  selectProfileImages: `
  SELECT
    user_id
    ,image_file_id
    ,image_file_name
    ,image_file_path
    ,image_original_file_name
    ,ext
    ,'${IMAGE_BASE_PATH}'|| image_file_name || '.' || ext as image_url_path
  FROM user_album_info
  WHERE user_id = :user_id
    AND use_yn = 1
  ORDER BY registeration_date
  `,
};

module.exports = json;
