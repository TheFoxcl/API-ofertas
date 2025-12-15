const express = require("express");
const IndexController = require("../controllers/index");

const router = express.Router();
const indexController = new IndexController();

function setRoutes(app) {
  router.post("/userinfo", indexController.getUserInfo);
  // router.get("/offer", indexController.getOfferInfo);
  // router.get("/fullequipo", indexController.getFullEquipoData);
  // router.get("/Matrix", indexController.getOfferMatrixData);

  app.use("/", router);
}

module.exports = setRoutes;
