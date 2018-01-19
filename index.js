const Discovery = require('./lib/discovery/Discovery');
const DefaultHostPage = require('./lib/host-page/DefaultHostPage');
const actions = require('./lib/constants/actions');
const urlPlaceholders = require('./lib/constants/urlPlaceholders');
const headers = require('./lib/constants/headers');
const methods = require('./lib/constants/methods');

module.exports = {
  Discovery,
  DefaultHostPage,
  actions,
  urlPlaceholders,
  wopiHeaders: headers,
  wopiMethods: methods
};
