function _otherExoprt(filename, data) {
  // Worksheet名
  const worksheet = 'Sheet1'
  const uri = 'data:application/vnd.ms-excel;base64,'
  
  // 下载的表格模板数据
  const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
  xmlns:x="urn:schemas-microsoft-com:office:excel" 
  xmlns="http://www.w3.org/TR/REC-html40">
  <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
  <x:Name>${worksheet}</x:Name>
  <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
  </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
  </head><body>{data}</body></html>`
  var content = ''
  if (typeof data === 'string') {
    const el = document.querySelector(data)
    content = template.replace('{data}', el.outerHTML)
  }
  const elA = document.createElement('a')
  elA.href = uri + window.btoa(unescape(encodeURIComponent(content)))
  elA.download = filename
  elA.click()
}

function _IeExoprt(filename, data) {
  const oXL = new window.ActiveXObject('Excel.Application')
  const oWB = oXL.WorkBooks.Add()
  const oSheet = oWB.ActiveSheet

  if (typeof data === 'string') {
    const el = document.querySelector(data)
    var sel = document.body.createTextRange()
    sel.moveToElementText(el)
    try {
      console.log(sel.select)
      sel.select()
    } catch(e) {
      console.log(e)
    }
    sel.execCommand('Copy')
    oSheet.Paste()
    oXL.Visible = true
  }
  const file = oXL.Application.GetSaveAsFilename(filename, 'Excel Spreadsheet (*.xls),*.xls')
  oWB.SaveAs(file)
  oWB.close()
  oXL.quit()
}
export function exportToExcel(filename, data) {
  const isIe = window.navigator.userAgent.toLocaleUpperCase().indexOf('trident')
  if (isIe !== -1) {
    _IeExoprt(filename, data)
  } else {
    _otherExoprt(filename, data)
  }
}