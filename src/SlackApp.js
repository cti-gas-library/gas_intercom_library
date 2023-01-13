function SlackApp(token) {
  const url = 'https://slack.com/api/'
  const defaultOptions = {
    method: 'post',
    headers: {},
    payload: {},
  }
  function postMessage(channel, option = {}) {
    let options = {}
    if (typeof option !== 'object') {
      options = {
        ...defaultOptions,
        payload: {
          token,
          channel,
          text: option.toString(),
          unfurl_links: true,
        },
      }
    } else {
      options = { ...defaultOptions, payload: { token, channel, unfurl_links: true, ...option } }
    }
    const endpoint = `chat.postMessage`
    const res = UrlFetchApp.fetch(url + endpoint, options)
    return JSON.parse(res)
  }
  return { postMessage }
}