const OfficeUrl = require('./OfficeUrl');
const Placeholders = require('../constants/urlPlaceholders');

const urlSrc =
  'https://excel.officeapps-df.live.com/x/_layouts/xlembedpreview.aspx?<ui=UI_LLCC&><rs=DC_LLCC&><dchat=DISABLE_CHAT&><hid=HOST_SESSION_ID&>';
const url = new OfficeUrl(urlSrc);

test('it should replace all placeholders', () => {
  const formatted = url.toString(null, {
    [Placeholders.UI_LLCC]: 'foo',
    [Placeholders.DC_LLCC]: 'bar',
    [Placeholders.DISABLE_CHAT]: 'baz',
    [Placeholders.HOST_SESSION_ID]: 'qux'
  });

  expect(formatted).toEqual(
    'https://excel.officeapps-df.live.com/x/_layouts/xlembedpreview.aspx?ui=foo&rs=bar&dchat=baz&hid=qux&'
  );
});

test('it should clear unspecified placeholders', () => {
  const formatted = url.toString(null, {
    [Placeholders.DISABLE_CHAT]: 'baz'
  });

  expect(formatted).toEqual(
    'https://excel.officeapps-df.live.com/x/_layouts/xlembedpreview.aspx?dchat=baz&'
  );
});

test('it should encode url params', () => {
  const formatted = url.toString(null, {
    [Placeholders.DISABLE_CHAT]: '<baz>'
  });

  expect(formatted).toEqual(
    `https://excel.officeapps-df.live.com/x/_layouts/xlembedpreview.aspx?dchat=${encodeURIComponent(
      '<baz>'
    )}&`
  );
});

test('it should append wopisrc if specified', () => {
  const formatted = url.toString('https://example.com/wopi/files/foo', {
    [Placeholders.UI_LLCC]: 'foo'
  });

  expect(formatted).toEqual(
    `https://excel.officeapps-df.live.com/x/_layouts/xlembedpreview.aspx?ui=foo&WOPISrc=${encodeURIComponent(
      'https://example.com/wopi/files/foo'
    )}`
  );
});
