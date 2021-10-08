<template>
  <div class="json-editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
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
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/brace-fold.js'
import { ref, toRefs, reactive, watch, nextTick, onMounted } from 'vue'

export default {
  name: 'JsonEditor',
  props: ['value'],
  emits: ['update:value'],
  setup(props, context) {
    const { value } = toRefs(props)
    const textarea = ref(null)
    let jsonEditor = reactive(null)

    const getValue = () => {
      return jsonEditor && jsonEditor.getValue()
    }

    const initCodeMirror = () => {
      nextTick(() => {
        jsonEditor = CodeMirror.fromTextArea(textarea.value, {
          theme: 'rubyblue',
          mode: { name: "javascript", json: true },
          lint: true,
          lineNumbers: true,  // 显示行号
          lineWrapping: true, // 文字过长时，换行
          // showCursorWhenSelecting: true,  // 文本选中时显示光标
          // cursorHeight: 0.85, //光标高度，默认是1
          // matchBrackets: true, // 括号匹配
          // smartIndent: true, // 智能缩进
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
          extraKeys: {'Ctrl-Q': function(cm){ cm.foldCode(cm.getCursor()) }},
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
          jsonEditor.setValue(JSON.stringify(value.value, null, 2))
          jsonEditor.refresh()
        }
        jsonEditor.on('change', cm => {
          context.emit('update:value', cm.getValue())
        })
      })
    }

    onMounted(() => {
      initCodeMirror()
    })

    watch(value.value, (val) => {
      const editorValue = getValue()
      if (val !== editorValue) {
        jsonEditor.setValue(JSON.stringify(val, null, 2))
      }
    })

    return {
      textarea,
      jsonEditor,
      getValue
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
}
</style>
