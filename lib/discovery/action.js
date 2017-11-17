const OfficeUrl = require('./office-url');

module.exports = class Action {
  constructor($action, app) {
    this.name = $action.attr('name');
    this.ext = $action.attr('ext');
    this.requires = ($action.attr('requires') || '').split(',');

    this.url = new OfficeUrl($action.attr('urlsrc'));
    this.favicon = app.favIconUrl;
  }

  getUrl(wopiSrc, options) {
    return this.url.toString(wopiSrc, options);
  }
};
