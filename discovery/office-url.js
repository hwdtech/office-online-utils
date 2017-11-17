function replaceHandler(opts, param, placeholder, amp) {
  const value = opts[placeholder];

  if (value == null) {
    return '';
  }

  const encoded = encodeURIComponent(value);
  return `${param}=${encoded}${amp}`;
}

module.exports = class OfficeUrl {
  constructor(src) {
    this.urlsrc = src;
  }

  toString(wopiSrc, opts = {}) {
    const officeUrl = this.urlsrc.replace(
      /<([^=]+)=([^>&]+)(&)?>/g,
      (match, paramName, placeholder, amp) =>
        replaceHandler(opts, paramName, placeholder, amp)
    );

    if (!wopiSrc) {
      return officeUrl;
    }

    return `${officeUrl}WOPISrc=${encodeURIComponent(wopiSrc)}`;
  }
};
