// Send Data Type
// https://learn.microsoft.com/ja-jp/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#properties-of-the-office-365-connector-card
function TeamsApp(webhookUrl) {
  const reg = /https:\/\/(.+)\.webhook\.office\.com\/(.*?)/
  const defaultOptions = {
    method: 'post',
    headers: {
      'contentType': 'application/json'
    },
    payload: {},
  }
  function postMessage(option = {}) {
    let options = {}
    if (typeof option !== 'object') {
      options = {
        ...defaultOptions,
        payload: JSON.stringify({
          text: option.toString(),
        }),
      }
    } else {
      options = { ...defaultOptions, payload: JSON.stringify({ ...option }) }
    }
    if (!reg.test(webhookUrl)) {
      return {
        message: "webhook url error"
      }
    }
    const res = UrlFetchApp.fetch(webhookUrl, options)
    return JSON.parse(res)
  }
  return { postMessage }
}