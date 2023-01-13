class IntercomLibrary {
  constructor(option = {}) {
    this.tagSettings = option?.tagSettings ?? {};
    this.onInit = option?.onInit ?? ((prop) => prop);
    this.onPush = option?.onPush ?? (() => {});
    this.slackToken = option?.slackToken ?? null;
    this.teamsWebhookURL = option?.teamsWebhookURL ?? null;
    this.lineNotifyToken = option?.lineNotifyToken ?? null;
  }

  pushIntercom(data) {
    const dataSet = {
      ...(data.tag ? this.tagSettings[data.tag] : {} ),
      ...data
    };
    const replaceDataSet = dataSet?.replaceData ?? {};
    let text = dataSet?.message ?? null;
    Object.keys(replaceDataSet).forEach((key)=>{
      text = text.replaceAll(`{{${key}}}`, replaceDataSet[key]);
    });
    if(!text) {
      this.onPush?.(dataSet);
      return;
    }
    if(this.slackToken || dataSet?.slackToken){
      const { postMessage: SlackPostMessage } = SlackApp(dataSet?.slackToken ?? this.slackToken);
      const channel = dataSet?.slackChannel ?? null;
      const slackOption = dataSet?.slackOption ?? {};
      if(channel){
        SlackPostMessage(channel, {
          ...slackOption,
          text,
        });
      }
    }
    if(this.lineNotifyToken || dataSet?.lineNotifyToken){
      const { postMessage: LinePostMessage } = LineApp(dataSet?.lineNotifyToken ?? this.lineNotifyToken);
      const lineNotifyOption = dataSet?.lineNotifyOption ?? {};
      LinePostMessage({
        ...lineNotifyOption,
        message: text,
      });
    }
    if(this.teamsWebhookURL || dataSet?.teamsWebhookURL){
      const { postMessage : TeamsPostMessage } = TeamsApp(dataSet?.teamsWebhookURL ?? this.teamsWebhookURL);
      const teamsWebhookOption = dataSet?.teamsWebhookOption ?? {};
      TeamsPostMessage({
        ...teamsWebhookOption,
        text,
      });
    }
    this.onPush?.(dataSet);
  }

  hookHandler(e) {
    const template = HtmlService.createTemplateFromFile('src/index')
    const tag = e?.parameter?.tag ?? null
    template.prop = {
      tag,
    }
    if(typeof this?.onInit === "function"){
      template.prop = this?.onInit(template.prop);
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
