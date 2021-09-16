
console.log('---window---', window)

window.addEventListener('keydown', (e) => {
  console.log('----e----', e)
  const { altKey, ctrlKey, metaKey, key } = e
  if (altKey && ctrlKey && metaKey && key.toLocaleLowerCase() === 'd') {
    // const currentWindow = window.getFocusedWindow();
    // currentWindow && currentWindow.webContents.openDevTools ();
    // BrowserWindow.webContents.openDevTools ()
    e.preventDefault();
  }
});

// window.onbeforeunload = (e) => {
//   console.log('I do not want to be closed')
//   // 返回除 undefined之外的任何值都将取消关闭
//   // 与通常的浏览器不同,会提示给用户一个消息框,
//   // 返回非空值将默认取消关闭，
//   // 建议使用对话框 API 让用户确认关闭应用程序.
//   e.returnValue = false // 相当于 `return false` ，但是不推荐使用
// }
