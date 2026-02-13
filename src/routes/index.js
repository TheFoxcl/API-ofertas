const express = require("express");
const IndexController = require("../controllers/index");
const tokenAuth = require("../middleware/token");

const router = express.Router();
const indexController = new IndexController();

function setRoutes(app) {
  router.post("/userinfo", tokenAuth, indexController.getUserInfo);
  router.post("/matrix", indexController.getMatrix);
  router.put("/updateMatrix", indexController.updateMatrix);
  // router.get("/Matrix", indexController.getOfferMatrixData);

  app.use("/", router);
}

module.exports = setRoutes;
