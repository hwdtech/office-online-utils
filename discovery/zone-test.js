const $ = require('cheerio');
const Zone = require('./zone');

test('it should has protocol', () => {
  const $zone = $(`<net-zone name="external-https"></net-zone>`);
  const zone = new Zone($zone);

  expect(zone.protocol).toEqual('https');
});

test('it should be able to find app by name', () => {
  const $zone = $(`<net-zone name="external-https">
    <app name="Foo"></app>
    <app name="Bar"></app>
  </net-zone>`);
  const zone = new Zone($zone);
  const app = zone.app('Foo');

  expect(app).toBeDefined();
  expect(app.name).toEqual('Foo');
});
