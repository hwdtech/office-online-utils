const $ = require('cheerio');
const App = require('./App');

test('it should be able to find action by name and extenstion', () => {
  const appDesc = `<app name="Foo" favIconUrl="http:/example.com/test.ico" checkLicense="true">
    <action name="bar" ext="baz"></action>
    <action name="one" ext="two"></action>
  </app>`;
  const $app = $(appDesc);

  const app = new App($app);

  const action = app.action('bar', 'baz');

  expect(action).toBeDefined();
  expect(action.name).toEqual('bar');
  expect(action.ext).toEqual('baz');
});

test('it should has favicon', () => {
  const appDesc = `<app favIconUrl="http:/example.com/test.ico"></app>`;
  const $app = $(appDesc, { xmlMode: true });
  const app = new App($app);

  expect(app.favIconUrl).toEqual('http:/example.com/test.ico');
});

test('it should omit invalid favicon', () => {
  const appDesc = `<app favIconUrl="http:/example.com"></app>`;
  const $app = $(appDesc, { xmlMode: true });
  const app = new App($app);

  expect(app.favIconUrl).toBeNull();
});
