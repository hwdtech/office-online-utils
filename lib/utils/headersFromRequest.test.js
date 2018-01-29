const mocks = require('node-mocks-http');
const headers = require('../constants/headers');
const getHeaders = require('./headersFromRequest');

const request = mocks.createRequest({
  method: 'GET',
  url: '/test',
  headers: {
    'Content-Type': 'application/json',
    Bearer: 'some bearer token',
    [headers.APP_ENDPOINT]: 'foo',
    [headers.CORRELATION_ID]: 'bar',
    [headers.FILE_CONVERSION]: '',
    [headers.DEVICE_ID]: undefined
  }
});

test('it should collect wopi related headers from express request', () => {
  const wopiHeaders = getHeaders.fromExpressRequest(request);
  expect(wopiHeaders).toEqual({
    [headers.APP_ENDPOINT]: 'foo',
    [headers.CORRELATION_ID]: 'bar',
    [headers.FILE_CONVERSION]: ''
  });
});
