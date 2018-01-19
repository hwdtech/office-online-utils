/* global jasmine */

const path = require('path');
const Discovery = require('./Discovery');
const Actions = require('../constants/actions');

const discoveryPath = path.join(__dirname, 'discovery-fixture.xml');
const discoveryUrl = 'https://onenote.officeapps-df.live.com/hosting/discovery';

let discoveryFromFile;
let discoveryFromUrl;

beforeAll(async () => {
  const oldInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  discoveryFromFile = await Discovery.fromFile(discoveryPath);
  discoveryFromUrl = await Discovery.fromUrl(discoveryUrl);
  jasmine.DEFAULT_TIMEOUT_INTERVAL = oldInterval;
});

describe('discovery from file', () => {
  testDiscovery(() => discoveryFromFile);
});

describe('discovery from url', () => {
  testDiscovery(() => discoveryFromUrl);
});

function testDiscovery(getDiscovery) {
  test('it should be able to find action', async () => {
    const discovery = getDiscovery();
    const action = discovery.action('https', Actions.VIEW, 'docx');
    expect(action).toBeDefined();
    expect(action.name).toEqual(Actions.VIEW);
    expect(action.ext).toEqual('docx');
  });

  test('it should return null for unknown zone', async () => {
    const discovery = getDiscovery();

    const action = discovery.action('http', Actions.VIEW, 'docx');
    expect(action).toBeNull();
  });

  test('it should return null for unknown action', async () => {
    const discovery = getDiscovery();

    const action = discovery.action('https', Actions.GETINFO, 'dsfsdsdf');
    expect(action).toBeNull();
  });
}
