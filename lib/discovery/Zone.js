const $ = require('cheerio');
const App = require('./App');

module.exports = class Zone {
  constructor($zone) {
    this.protocol = $zone.attr('name').replace('external-', '');

    this.apps = Array.from($zone.find('app')).map(a => new App($(a)));
  }

  app(name) {
    return this.apps.find(app => app.name === name);
  }
};
