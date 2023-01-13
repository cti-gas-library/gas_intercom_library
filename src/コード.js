class IntercomLibrary {
  constructor(option = {}) {
    this.onPush = option?.onPush ?? (() => {});
  }

  pushIntercom(data) {
    this.onPush?.(data);
  }

  hookHandler(e) {
    const template = HtmlService.createTemplateFromFile('src/index')
    const tag = e?.parameter?.tag ?? null
    template.prop = {
      tag,
    }
    return template
      .evaluate()
      .setTitle('IntercomLibrary')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  }
}

function create(option = {}) {
  return new IntercomLibrary(option)
}
