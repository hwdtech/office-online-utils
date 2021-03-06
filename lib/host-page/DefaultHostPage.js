const assert = require('assert');
const { encode } = require('he');

module.exports = class DefaultHostPage {
  constructor(opts) {
    assert.ok(opts.officeUrl, 'opts.officeUrl should be specified');
    this.officeUrl = encode(opts.officeUrl);

    assert.ok(opts.accessToken, 'opts.accessToken should be specified');
    this.accessToken = encode(opts.accessToken);

    this.title = opts.title ? encode(opts.title) : null;
    this.accessTokenTtl = opts.accessTokenTtl ? encode(opts.accessTokenTtl.toString()) : 0;
    this.favicon = opts.favicon ? encode(opts.favicon) : null;
  }

  render() {
    return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    ${this.title ? `<title>${this.title}</title>` : ''}
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    
    ${this.favicon ? `<link rel="shortcut icon" href="${this.favicon}">` : ''}

    <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      -ms-content-zooming: none;
    }
    #office_frame {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      border: none;
      display: block;
    }
    </style>
  </head>

  <body>
    <form id="office_form" 
          name="office_form" 
          target="office_frame" action="${this.officeUrl}" 
          method="post">
      <input name="access_token" value="${this.accessToken}" type="hidden"/>
      <input name="access_token_ttl" 
             value="${this.accessTokenTtl}" 
             type="hidden"/>
    </form>

    <span id="frameholder"></span>

    <script type="text/javascript">
      var frameholder = document.getElementById('frameholder');
      var office_frame = document.createElement('iframe');
      office_frame.name = 'office_frame';
      office_frame.id ='office_frame';
      // The title should be set for accessibility
      office_frame.title = 'Office Online Frame';
      // This attribute allows true fullscreen mode in slideshow view
      // when using PowerPoint Online's 'view' action.
      office_frame.setAttribute('allowfullscreen', 'true');
      frameholder.appendChild(office_frame);
      document.getElementById('office_form').submit();
    </script>
  </body>
</html>`;
  }

  sendResponse(res) {
    res.setHeader('Content-Type', 'text/html');
    const content = this.render();
    return res.end(content);
  }
};
