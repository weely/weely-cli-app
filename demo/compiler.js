

const template = `
<div>
  <h4>测试标题</h4>
  <div>
    <p>测试段落</p>
    demo
    <span>demo</span>
  </div>
</div>
`


// const tagName = /[a-z][\w]*/i
// const qnameCapture = `((?:${tagName}\\:)?)`
const attributesReg = /^(?:\s+([\w\-]+=[^>]+))/
const endTagReg = /^<\/([a-zA-Z][\w\-]*)\>/
var startTagReg = /^<([a-zA-Z][\w\-]*)(?:\s+([\w\-]+=[^>]+))*(\/)?>/

function parseHTML(html) {
  const treeNode = []
  html = html.trim()

  let lastIndex = 0
  while(html) {
    const node = {
      tag: '',
      lastIndex: lastIndex,
      attributes: null,
      children: null
    }
    if (!startTagReg.test(html)) {  // text
      node.tag = 'text'
      node.children = html
      html = html.slice(html.length)
    } else {
      const [all, tagName, attributes] = html.match(startTagReg)
      node.tag = tagName

      html = html.slice(all.length)

    }
    lastIndex++
  }
}


























/**
 * 
 * 
 * vNode: [
    {
      tag: '',
      children: [
        {
          tag: '',
          children: []
        }
      ]
    }
  ]
 * 
 * @param {string} html 
 */