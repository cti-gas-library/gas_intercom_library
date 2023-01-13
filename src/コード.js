class IntercomLibrary {
  constructor(option = {}) {
    this.tagSettings = option?.tagSettings ?? {};
    this.onPush = option?.onPush ?? (() => {});
    this.slackToken = option?.slackToken ?? null;
  }

  pushIntercom(data) {
    const dataSet = {
      ...(data.tag ? this.tagSettings[data.tag] : {} ),
      ...data
    };
    if(this.slackToken){
      const { postMessage: SlackPostMessage } = SlackApp(this.slackToken);
      const channel = dataSet?.slackChannel ?? null;
      const text = dataSet?.message ?? null;
      if(channel && text){
        SlackPostMessage(channel, {
          text,
        });
      }
    }
    if(dataSet?.teamsWebhookURL){
      const { postMessage : TeamsPostMessage } = TeamsApp(dataSet?.teamsWebhookURL);
      const text = dataSet?.message ?? null;
      if(text){
        TeamsPostMessage({
          text,
        });
      }
    }
    this.onPush?.(dataSet);
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
