// Send Data Type
// https://notify-bot.line.me/doc/ja/#:~:text=POST%20https%3A//notify%2Dapi.line.me/api/notify
function LineApp(token) {
  const url = 'https://notify-api.line.me/api/'
  const defaultOptions = {
    method: 'post',
    headers: {
      "Authorization": "Bearer " + token
    },
    payload: {},
  }
  function convertImageBlobFile(url) {
    const imageBlob = UrlFetchApp.fetch(url).getAs(MimeType.PNG);
    return imageBlob
  }
  function postMessage(option = {}) {
    let options = {}
    if (typeof option !== 'object') {
      options = {
        ...defaultOptions,
        payload: {
          "message": option.toString()
        },
      }
    } else {
      options = { ...defaultOptions, payload: { ...option } }
    }
    const endpoint = `notify`
    const res = UrlFetchApp.fetch(url + endpoint, options)
    return JSON.parse(res)
  }
  return { postMessage, convertImageBlobFile }
}