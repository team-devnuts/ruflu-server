const multer = require("multer");
const { v1: uuidv1 } = require("uuid");
const config = require("../config");
const { ClientException } = require("../exception/client-exception");

const { MIME_TYPE_MAP } = config;

// 저장 경로 설정
const storage = multer.diskStorage({
  destination:
    process.platform === "linux"
      ? config.STATIC_IMAGE_DIR
      : config.DEV_STATIC_IMAGE_DIR,
  filename: (req, file, cb) => {
    const uuid = uuidv1();
    const [originalname, ext] = file.originalname.split(".");
    cb(
      null,
      `${uuid}${Buffer.from(originalname, "latin1").toString(
        "utf-8"
      )}.${ext.toLowerCase()}`
    );
  },
});

const imageFilter = (req, files, cb) => {
  const isValid = MIME_TYPE_MAP[files.mimetype];

  const error = isValid ? null : new ClientException(400, "Invalid ext");

  cb(error, isValid);
};

const upload = multer({ storage, fileFilter: imageFilter });

module.exports = { upload };
