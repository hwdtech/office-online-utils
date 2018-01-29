const mocks = require('node-mocks-http');
const cheerio = require('cheerio');
const DefaultHostPage = require('./DefaultHostPage');

const wopiSrc = 'https://example.com/wopi/files/foo';

const opts = {
  accessToken: 'foo',
  accessTokenTtl: 60,
  officeUrl: `https://excel.officeapps-df.live.com/x/_layouts/xlembedpreview.aspx?ui=foo&WOPISrc=${encodeURIComponent(
    wopiSrc
  )}`,
  title: 'title',
  favicon: 'favIcon.ico'
};

const render = opts => {
  return cheerio.load(new DefaultHostPage(opts).render());
};

test('it should render title', () => {
  const $ = render(opts);
  expect($('title').text()).toEqual('title');
});

test('it should skip empty title', () => {
  const $ = render(Object.assign({}, opts, { title: '' }));
  expect($('title')).toHaveLength(0);
});

test('it should render favicon', () => {
  const $ = render(opts);
  expect($('link[rel="shortcut icon"]').attr('href')).toEqual('favIcon.ico');
});

test('it should skip empty favicon', () => {
  const $ = render(Object.assign({}, opts, { favicon: '' }));
  expect($('link[rel="shortcut icon"]')).toHaveLength(0);
});

test('it should render access token', () => {
  const $ = render(opts);
  expect($('#office_form input[name="access_token"]').val()).toEqual(opts.accessToken);
  expect($('#office_form input[name="access_token_ttl"]').val()).toEqual(
    opts.accessTokenTtl.toString()
  );
});

test('it should render default access token ttl', () => {
  const $ = render(Object.assign({}, opts, { accessTokenTtl: null }));
  expect($('#office_form input[name="access_token_ttl"]').val()).toEqual('0');
});

test('it should render office action url', () => {
  const $ = render(opts);
  expect($('#office_form').attr('action')).toEqual(opts.officeUrl);
});

test('it should throw on empty officeUrl', () => {
  expect(() => render(Object.assign({}, opts, { officeUrl: null }))).toThrow();
});

test('it should throw on empty accessToken', () => {
  expect(() => render(Object.assign({}, opts, { accessToken: null }))).toThrow();
});

test('it should send response directly', () => {
  const page = new DefaultHostPage(opts);
  const html = page.render();
  const res = mocks.createResponse();

  page.sendResponse(res);

  expect(res._isEndCalled()).toBeTruthy();
  expect(res._getData()).toEqual(html);
  expect(res.getHeader('Content-Type')).toEqual('text/html');
});
