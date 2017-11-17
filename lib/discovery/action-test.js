const $ = require('cheerio');
const Action = require('./action');

const app = {
  favIconUrl: 'https://example.com'
};

const $action = $(
  `<action name="foo" ext="bar" requires="baz,qux" urlsrc="test"></action>`,
  {
    xmlMode: true
  }
);

test('it should delegate url format', () => {
  const action = new Action($action, app);
  const wopi = 'https://example.com';
  const opts = {};

  action.url = {
    toString(wopiSrc, options) {
      expect(wopiSrc).toEqual(wopi);
      expect(options).toEqual(opts);
    }
  };

  action.getUrl(wopi, opts);
});

test('it should parse requires string', () => {
  const action = new Action($action, app);
  expect(action.requires).toEqual(['baz', 'qux']);
});

test('it should has favicon', () => {
  const action = new Action($action, app);
  expect(action.favicon).toEqual(app.favIconUrl);
});
