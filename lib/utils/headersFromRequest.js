const { convert } = require('encoding');
const headers = require('../constants/headers');
const headerKeys = Object.keys(headers);
const utf7Headers = [headers.SUGGESTED_TARGET, headers.RELATIVE_TARGET];

function reduceHeaders(getHeader) {
  return headerKeys.reduce((acc, headerKey) => {
    const headerName = headers[headerKey];
    let wopiHeader = getHeader(headerName);
    if (wopiHeader !== undefined) {
      if (utf7Headers.includes(headerName)) {
        wopiHeader = convert(wopiHeader, 'utf7', 'utf8').toString();
      }
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
