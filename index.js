module.exports = {
  Discovery: require('./lib/discovery/Discovery'),
  DefaultHostPage: require('./lib/host-page/DefaultHostPage'),
  actions: require('./lib/constants/actions'),
  urlPlaceholders: require('./lib/constants/urlPlaceholders'),
  wopiHeaders: require('./lib/constants/headers'),
  wopiMethods: require('./lib/constants/methods'),
  getHeaders: require('./lib/utils/headersFromRequest')
};
