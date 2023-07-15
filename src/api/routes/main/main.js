const express = require("express");

const router = express.Router();
const mainController = require("../../../controller/main.controller");
const { upload } = require("../../../loaders/file");
const { logger } = require("../../../loaders/logger");
const fileController = require("../../../controller/file.controller");

module.exports = (app) => {
  app.use("/main", router);

  router.get("/", (req, res) => {
    res.json({ state: 200 });
  });

  router.post("/location", async (req, res) => {
    res.json(await mainController.updateLocation(req, res));
  });

  router.post("/alarm", async (req, res) => {
    res.json(await mainController.updateToken(req, res));
  });

  router.get("/user/:user_id", async (req, res) => {
    res.json(await mainController.getUserDetail(req, res));
  });

  router.post("/album", upload.array(), async (req, res) => {
    await fileController.createImages(req, res);
  });

  router.post("/image", upload.single(), async (req, res) => {
    logger.debug(req.file);
    await fileController.createSingleImage(req, res);
  });

  router.post("/image/:profile_id", upload.single(), async (req, res) => {
    await fileController.updateProfileMainImage(req, res);
  });

  router.patch("/image/:image_file_id", async (req, res) => {
    await fileController.removeUserImage(req, res);
  });

  router.get("/album", async (req, res) => {
    await fileController.getUserProfileImages(req, res);
  });
};
