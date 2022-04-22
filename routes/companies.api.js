const express = require("express");
const router = express.Router();
const fs = require("fs");
const { off } = require("process");

const loadData = () => {
  let db = fs.readFileSync("data.json", "utf8");
  return JSON.parse(db);
};

router.get("/", function (req, res, next) {
  db = loadData();
  let { companies, jobs, ratings } = db;
  // const city = req.query.city;
  // if (city === "Miami") {
  //   const newJobs = jobs.filter((job) => job.city === city);
  //   return res.send({ newJobs, message: "companies" });
  // }

  const limit = req.query.limit || 20;
  const page = req.query.page || 1;
  const offset = limit * (page - 1);
  companies = companies.slice(offset, limit * page);
  return res.send({ jobs, message: "companies" });
});

module.exports = router;
