# Utility belt for Office Online integration

## Discovery loader

WOPI discovery is the process by which a WOPI host identifies Office Online capabilities and how to initialize Office Online applications within a site [See more here](https://wopi.readthedocs.io/en/latest/discovery.html#discovery)
Discovery loader helps to process discovery.xml files easily, for ex

```js
const Discovery = require('office-online-utils/lib/discovery/discovery');
const WopiActions = require('office-online-utils/lib/discovery/actions');

(async () => {
  const discovery = await Discovery.fromFile(`path/to/discovery.xml`);

  // finds an action in https net-zone for viewing .docx files
  const action = discovery.action('https', WopiActions.VIEW, 'docx');
})()
```

Discovery action urls have a bunch of template placeholders you have to replace. Actions allow to easily build final Office Online url, for ex

```js
const Placeholders = require('office-online-utils/lib/discovery/placeholders');

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

## Default Host Page renderer

In the most cases file host page is a fullscreen version of Office Online page. Default host page renderer makes this event easier. Express example: 

```js
const DefaultHostPage = require('office-online-utils/lib/default-host-page');

// assume app is an express app or router
app.get('/files/:id', (req, res, next) => {
  // build page options first 
  const hostPage = new DefaultHostPage(opts);
  res.setHeader('Content-Type', 'text/html');
  res.end(hostPage.render())
});
```

You can see all available options [here](/lib/DefaultHostPage.js#L4)
