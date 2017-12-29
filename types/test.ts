import { actions, placeholders, Discovery, DefaultHostPage } from 'office-online-utils';

const discovery = new Discovery('<?xml version="1.0" encoding="utf-8"?><wopi-discovery></wopi-discovery></xml>');

const sampleAction = discovery.action('https', actions.VIEW, 'docx');

sampleAction; // $ExpectType Action

// $ExpectType string | undefined
sampleAction.favicon;

// $ExpectType string
sampleAction.getUrl('https://example.com', {
  [placeholders.DC_LLCC]: 'en-US'
});

const defaultHostPage = new DefaultHostPage({
  accessToken: 'some string',
  officeUrl: 'office url'
});

// $ExpectType string
defaultHostPage.render();
