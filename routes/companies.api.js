const express = require("express");
const router = express.Router();
const fs = require("fs");
const { off } = require("process");
const { sendResponse, throwException } = require("../helpers/util");

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
    return sendResponse(200, newCompanies, "jobs", res, next);
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
    return sendResponse(200, newCompanies, "jobs", res, next);
  }
  if (!city) {
    companies = companies.slice(offset, limit * page);
    // const number = companies.length;
    return sendResponse(200, companies, "companies", res, next);
  }
});

router.post("/", function (req, res, next) {
  try {
    const {
      id,
      name,
      benefits,
      description,
      ratings,
      jobs,
      numOfJobs,
      numOfRatings,
    } = req.body;
    if (
      !id ||
      !name ||
      !benefits ||
      !description ||
      !ratings ||
      !jobs ||
      !numOfJobs ||
      !numOfRatings
    ) {
      throwException("Missing info", 400);
    }
    db = loadData();
    const objCompany = {
      id,
      name,
      benefits,
      description,
      ratings,
      jobs,
      numOfJobs,
      numOfRatings,
    };
    db.companies.unshift(objCompany);
    let newDb = db;
    newDb = JSON.stringify(newDb);
    fs.writeFileSync("data2.json", newDb);
    return sendResponse(200, {}, "Successful update!", res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    db = loadData();
    let companies = db.companies;
    let companiesId = companies.map((company) => company.id);
    if (!companiesId.includes(id)) {
      throwException("Company not found", 404);
    }
    let foundCompanyId = companies.find((company) => company.id === id);
    let indexFoundCompanyId = companies.indexOf(foundCompanyId);
    foundCompanyId = { ...foundCompanyId, enterprise: "true" };
    companies.splice(indexFoundCompanyId, 1, foundCompanyId);
    db = { ...db, companies: companies };
    let newDb = db;
    newDb = JSON.stringify(newDb);
    fs.writeFileSync("data2.json", newDb);
    return sendResponse(200, {}, "Successful update!", res, next);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    db = loadData();
    let companies = db.companies;
    let companiesId = companies.map((company) => company.id);
    if (!companiesId.includes(id)) {
      throwException("Company not found", 404);
    }
    let companiesAfterDelete = companies.filter((company) => company.id !== id);
    companiesAfterDelete = JSON.stringify(companiesAfterDelete);
    fs.writeFileSync("data2.json", companiesAfterDelete);
    return sendResponse(200, {}, "Successful delete!", res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
