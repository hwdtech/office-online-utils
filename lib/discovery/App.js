const Action = require('./Action');
const $ = require('cheerio');

module.exports = class App {
  constructor($app) {
    this.name = $app.attr('name');
    this.checkLicense = $app.attr('checklicense');

    const fav = $app.attr('faviconurl') || '';
    this.favIconUrl = fav.endsWith('.ico') ? fav : null;

    this.actions = Array.from($app.find('action')).map(a => new Action($(a), this));
  }

  action(name, ext) {
    return this.actions.find(a => a.name === name && a.ext === ext);
  }
};
