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
  const limit = req.query.limit || 20;
  const page = req.query.page || 1;
  const city = req.query.city;
  const offset = limit * (page - 1);

  if (city === "Miami") {
    const newJobs = jobs.filter((job) => job.city === "Miami");
    const listCompanyId = newJobs.map((job) => job.companyId);
    const newCompanies = companies.filter((company) =>
      listCompanyId.includes(company.id)
    );
    const number = newCompanies.length;
    return res.send({ number, newCompanies, message: "jobs" });
  }
  if (city === "Miami,New York") {
    const jobsMiami = jobs.filter((job) => job.city === "Miami");
    const jobsNewYork = jobs.filter((job) => job.city === "New York");

    const listMiamiCompanyId = jobsMiami.map((job) => job.companyId);
    const listNewYorkCompanyId = jobsNewYork.map((job) => job.companyId);
    const newCompanies = companies.filter(
      (company) =>
        listMiamiCompanyId.includes(company.id) &
        listNewYorkCompanyId.includes(company.id)
    );
    const number = newCompanies.length;
    return res.send({ number, newCompanies, message: "jobs" });
  }
  if (!city) {
    companies = companies.slice(offset, limit * page);
    const number = companies.length;
    return res.send({ number, companies, message: "companies" });
  }
});

router.post("/", function (req, res, next) {
  console.log("haha");
});

module.exports = router;
