const utilHelper = {};

utilHelper.sendResponse = (statusCode, data, message, res, next) => {
  const result = { data, message };
  return res.status(statusCode).send(result);
};

utilHelper.throwException = (msg, status) => {
  const err = new Error(msg);
  err.statusCode = status;
  throw err;
};

module.exports = utilHelper;
