var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.send({ data: {}, message: "home" });
});

const companiesRouters = require("./companies.api");
router.use("/companies", companiesRouters);
module.exports = router;
