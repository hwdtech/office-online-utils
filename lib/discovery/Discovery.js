const fetch = require('node-fetch');
const $ = require('cheerio');
const fs = require('fs');
const { promisify } = require('util');
const Zone = require('./Zone');

const readFile = promisify(fs.readFile, fs);

module.exports = class Discovery {
  static async fromFile(discoveryPath) {
    const buffer = await readFile(discoveryPath);
    return new Discovery(buffer.toString('utf8'));
  }

  static async fromUrl(url) {
    const response = await fetch(url);
    const content = await response.text();
    return new Discovery(content);
  }

  constructor(discoveryContents) {
    this.$discovery = $(discoveryContents);

    this.zones = Array.from(this.$discovery.find('net-zone')).map(z => new Zone($(z)));
  }

  action(protocol, name, ext) {
    const zone = this.zones.find(z => z.protocol === protocol);

    if (!zone) {
      return null;
    }

    const actions = zone.apps.map(app => app.action(name, ext)).filter(Boolean);

    return actions[0] || null;
  }
};
