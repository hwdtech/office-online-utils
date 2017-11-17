# Utility belt for Office Online integration

## Discovery loader

WOPI discovery is the process by which a WOPI host identifies Office Online capabilities and how to initialize Office Online applications within a site [See more here](https://wopi.readthedocs.io/en/latest/discovery.html#discovery)
Discovery loader helps to process discovery.xml files easily, for ex

```js
const Discovery = require('./discovery/discovery');
const WopiActions = require('./discovery/actions');

const discovery = Discovery.fromFile(`path/to/discovery.xml`);

// finds an action in https net-zone for viewing .docx files
const action = discovery.action('https', WopiActions.VIEW, 'docx');
```

Discovery action urls have a bunch of template placeholders you have to replace. Actions allow to easily build final Office Online url, for ex

```js
const Placeholders = require('./discovery/placeholders');

const officeUrl = action.getUrl(
  'https://example.com/wopi/files/123',
  {
    [Placeholders.DC_LLCC]: 'en-US',
    [Placeholders.UI_LLCC]: 'en-US',
    [Placeholders.BUSINESS_USER]: false
  }
);
```

The resulted Office Online url can be used at the [host page](https://wopi.readthedocs.io/en/latest/hostpage.html) later
