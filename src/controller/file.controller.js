// const { createClientException } = require('../exception/client-exception');
const fileService = require("../service/file.service");

const createImages = async (req, res) => {
  const { files } = req;
  const count = await fileService.createImages(files, req.get("user_id"));
  req.responseObject.result = count;
  req.responseObject.message = "Success";
  res.json(req.responseObject);
};

const createSingleImage = async (req, res) => {
  const { file } = req;
  const count = await fileService.createSingleImage({
    user_id: req.get("user_id"),
    image_original_file_name: file.originalname,
    image_file_name: file.filename.split(".").shift(),
    ext: file.originalname.split(".").pop(),
    profile_yn: req.body.profile_yn,
    image_file_size: file.size,
    image_file_path: file.path,
  });
  req.responseObject.result = count;
  req.responseObject.message = "Success";
  res.json(req.responseObject);
};

const removeUserImage = async (req, res) => {
  const [params] = req;
  const count = await fileService.removeUserImage({
    user_id: req.get("user_id"),
    image_file_id: params.image_file_id,
  });
  req.responseObject.result = count;
  req.responseObject.message = "Success";

  res.jon(req, responseObject);
};

const getUserProfileImages = async (req, res) => {
  const result = await fileService.getUserProfileImages(req.get("user_id"));

  res.responseObject.result = result;
  res.json(res.responseObject);
};

const updateProfileMainImage = async (req, res) => {
  const [file, params] = req;
  const user_id = req.get("user_id");
  const count = await fileService.updateProfileMainImage(params.profile_id, {
    user_id,
    image_original_file_name: file.originalname,
    image_file_name: file.filename.split(".").shift(),
    ext: file.originalname.split(".").pop(),
    profile_yn: req.body.profile_yn,
    image_file_size: file.size,
    image_file_path: file.path,
  });
  req.responseObject.result = count;
  req.responseObject.message = "Success";
  res.json(req.responseObject);
};

module.exports = {
  createImages,
  createSingleImage,
  removeUserImage,
  getUserProfileImages,
  updateProfileMainImage,
};
