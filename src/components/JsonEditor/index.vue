<template>
  <div class="json-editor">
    <section class="edit-menu">
      <a-space>
        <a-button type="text" class="icon-btn" @click="onFormatJson" title="美化，校验"><Icon icon="vscode-icons:file-type-json" width="20" /></a-button>
        <a-button type="text" class="icon-btn" @click="onCompact" title="压缩"><Icon icon="grommet-icons:text-align-full" width="20" /></a-button>
        <!-- <a-button type="text" class="icon-btn"><Icon icon="ant-design:tool-filled" width="20" /></a-button> -->
      </a-space>

      <a-space class="right-btn-group">
        <a-button type="text" class="icon-btn" @click="onSetSymple" title="JSON示例">JSON示例</a-button>
        <a-button type="text" class="icon-btn" @click="onUriDecode" title="URI编码">URI编码</a-button>
        <a-button type="text" class="icon-btn" @click="onUriEncode" title="URI解码">URI解码</a-button>
        <a-button type="text" class="icon-btn" @click="onClear" title="清空"><Icon icon="codicon:clear-all" width="20" /></a-button>
        <a-button type="text" class="icon-btn" @click.stop="onCopy" title="复制"><Icon icon="vaadin:copy" width="20" class="no-point-event" /></a-button>
        <a-button type="text" class="icon-btn" @click.stop="onDownload" title="下载"><Icon icon="bx:bxs-download" width="20" /></a-button>
      </a-space>
    </section>
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import { ref, toRefs, watch, onMounted, getCurrentInstance } from 'vue'
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/mode/javascript/javascript.js'
import clipboard from '@/utils/clipboard'
import { saveAs } from 'file-saver'

export default {
  name: 'JsonEditor',
  props: ['value'],
  emits: ['update:value'],
  setup(props, context) {
    const internalInstance = getCurrentInstance()
    const Message = internalInstance.appContext.config.globalProperties.$message
    const { value } = toRefs(props)
    const textarea = ref(null)
    let jsonEditor, sample = value.value

    const getValue = () => {
      return jsonEditor && jsonEditor.getValue()
    }

    const initCodeMirror = () => {
      jsonEditor = CodeMirror.fromTextArea(textarea.value, {
        theme: 'rubyblue',
        // mode: { name: "javascript", json: true },
        mode: 'application/json',
        lint: true,
        lineNumbers: true,  // 显示行号
        lineWrapping: true, // 文字过长时，换行
        // showCursorWhenSelecting: true,  // 文本选中时显示光标
        // cursorHeight: 0.85, //光标高度，默认是1
        // matchBrackets: true, // 括号匹配
        // smartIndent: true, // 智能缩进
        extraKeys: {'Ctrl-Q': function(cm){ cm.foldCode(cm.getCursor()) }},
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
        foldOptions: {
          widget: (from, to) => {
            var count = undefined

            // Get open / close token
            var startToken = '{', endToken = '}'
            var prevLine = jsonEditor.getLine(from.line)
            if (prevLine.lastIndexOf('[') > prevLine.lastIndexOf('{')) {
              startToken = '[', endToken = ']'
            }

            // Get json content
            var internal = jsonEditor.getRange(from, to)
            var toParse = startToken + internal + endToken

            // Get key count
            try {
              var parsed = JSON.parse(toParse)
              count = Object.keys(parsed).length
            // eslint-disable-next-line no-empty
            } catch(e) {}

            return count ? `\u21A4${count}\u21A6` : '\u2194'
          }
        }
      })

      if (value.value) {
        jsonEditor.setValue(JSON.stringify(JSON.parse(value.value), null, 2))
        jsonEditor.refresh()
      }
      jsonEditor.on('change', cm => {
        context.emit('update:value', cm.getValue())
      })
    }

    watch(value, (val) => {
      if (val !== getValue()) {
        jsonEditor.setValue(JSON.stringify(val, null, 2))
      }
    })

    const onFormatJson = () => {
      try {
        jsonEditor.setValue(JSON.stringify(JSON.parse(value.value), null, 2))
        jsonEditor.refresh()
        Message.success("正确的JSON")
      } catch(err) {
        console.error(err)
        Message.error(err.toString())
      }
    }

    const onCompact = () => {
      try {
        jsonEditor.setValue(JSON.stringify(JSON.parse(value.value)))
        jsonEditor.refresh()
      } catch(err) {
        console.error(err)
        Message.error(err.toString())
      }
    }

    const onClear = () => {
      jsonEditor.setValue('')
      jsonEditor.refresh()
    }

    const onSetSymple = () => {
      try {
        jsonEditor.setValue(JSON.stringify(JSON.parse(sample), null, 2))
        jsonEditor.refresh()
      } catch(err) {
        console.error(err)
        Message.error(err.toString())
      }
    }

    const onCopy = (event) => {
      const content =  getValue() || ''
      if (!content || content === '') {
        Message.success('无可拷贝的内容')
        return
      }
      clipboard(content, event)
    }

    const onUriEncode = () => {
      const content =  getValue() || ''
      jsonEditor.setValue(decodeURIComponent(content))
    }

    const onUriDecode = () => {
      const content =  getValue() || ''
      jsonEditor.setValue(encodeURIComponent(content))
    }
    
    const onDownload = () => {
      const content =  getValue() || '{}'

      Message.success(content)
      saveAs(new Blob([content], { type: 'application/json' }), 'data.json')
    }

    onMounted(() => {
      initCodeMirror()
    })

    return {
      textarea,
      onFormatJson,
      onCompact,
      onSetSymple,
      onClear,
      onCopy,
      onUriEncode,
      onUriDecode,
      onDownload
    }
  }
}
</script>

<style lang="scss" scoped>
.json-editor {
  height: 100%;
  position: relative;

  :deep {
    .CodeMirror {
      height: auto;
      min-height: 300px;
    }

    .CodeMirror-scroll {
      min-height: 300px;
    }

    .cm-s-rubyblue span.cm-string {
      color: #F08047;
    }
  }

  .edit-menu {
    // display: flex;
    background-color: #528BC6;
    color: #fff;
    padding: 6px 12px;

    .icon-btn {
      color: #fff;
      padding: 4px 4px;
      font-size: 12px;
      line-height: 1;
      border: solid 1px rgba($color: #000000, $alpha: 0);
    }

    .icon-btn:hover {
      opacity: .8;
      border: solid 1px;
    }

    .right-btn-group {
      float: right
    }
  }

  .no-point-event {
    pointer-events: none;
  }
}
</style>
