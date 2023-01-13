class LikeLogLibrary {
  constructor(option = {}) {
    this.sheetName = option?.sheetName ?? 'TagList'
    this.tagColumnName = option?.tagColumnName ?? 'tag'
    this.likeColumnName = option?.likeColumnName ?? 'like'
  }

  getTagRange(tag) {
    if (!tag) return null
    const SS = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = SS.getSheetByName(this.sheetName)
    if (!sheet) return null

    const lastRow = sheet.getLastRow()
    const lastColumn = sheet.getLastColumn()
    const titleList = sheet.getRange(1, 1, 1, lastColumn).getValues().flat()
    const tagCol = titleList.indexOf(this.tagColumnName) + 1
    const likeCol = titleList.indexOf(this.likeColumnName) + 1
    if (tagCol <= 0 || likeCol <= 0) return null

    const tagList = sheet.getRange(2, tagCol, lastRow, 1).getValues().flat()
    const tagRow = tagList.indexOf(tag)

    if (tagRow >= 0) {
      return sheet.getRange(2, likeCol).offset(tagRow, 0)
    }
    sheet.getRange(lastRow + 1, tagCol).setValue(tag)
    return sheet.getRange(lastRow + 1, likeCol)
  }

  getLikeCount(tag) {
    const range = this.getTagRange(tag ?? 'default')
    return range?.getValue() || 0
  }

  addLikeCount(tag) {
    const range = this.getTagRange(tag ?? 'default')
    const prev = range?.getValue() || 0
    range?.setValue(prev + 1)
    return prev + 1
  }

  hookHandler(e) {
    const template = HtmlService.createTemplateFromFile('src/index')
    const tag = e?.parameter?.tag ?? null
    template.prop = {
      tag,
      count: this.getLikeCount(tag),
    }
    return template
      .evaluate()
      .setTitle('LikeLog')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  }
}

function create(option = {}) {
  return new LikeLogLibrary(option)
}
