import { message } from 'ant-design-vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  message.success('复制成功', 3)
}

function clipboardError() {
  message.success('复制失败', 1.5)
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
