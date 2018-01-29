const headers = require('../constants/headers');

const headerKeys = Object.keys(headers);

function reduceHeaders(getHeader) {
  return headerKeys.reduce((acc, headerKey) => {
    const headerName = headers[headerKey];
    const wopiHeader = getHeader(headerName);
    if (wopiHeader !== undefined) {
      acc[headerName] = wopiHeader;
    }
    return acc;
  }, {});
}

function fromExpressRequest(req) {
  return reduceHeaders(header => req.header(header));
}

module.exports = {
  fromExpressRequest
};
