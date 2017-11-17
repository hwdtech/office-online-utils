const path = require('path');
const Discovery = require('./discovery');
const Actions = require('./actions');

const discoveryPath = path.join(__dirname, 'discovery-fixture.xml');

function getDiscovery() {
  return Discovery.fromFile(discoveryPath);
}

test('it should be able to find action', async () => {
  const discovery = await getDiscovery();
  const action = discovery.action('https', Actions.VIEW, 'docx');

  expect(action).toBeDefined();
  expect(action.name).toEqual(Actions.VIEW);
  expect(action.ext).toEqual('docx');
});

test('it should return null for unknown zone', async () => {
  const discovery = await getDiscovery();
  const action = discovery.action('http', Actions.VIEW, 'docx');

  expect(action).toBeNull();
});

test('it should return null for unknown action', async () => {
  const discovery = await getDiscovery();
  const action = discovery.action('https', Actions.GETINFO, 'dsfsdsdf');

  expect(action).toBeNull();
});
