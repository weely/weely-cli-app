<template>
  <div class="json-editor">
    <textarea ref="textarea" />
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

export default {
  name: 'JsonEditor',
  props: ['value'],
  data() {
    return {
      jsonEditor: false,
    }
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue()
      if (value !== editorValue) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
      }
    },
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      theme: 'rubyblue',
      mode: 'application/json',
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
          var prevLine = this.jsonEditor.getLine(from.line)
          if (prevLine.lastIndexOf('[') > prevLine.lastIndexOf('{')) {
            startToken = '[', endToken = ']'
          }

          // Get json content
          var internal = this.jsonEditor.getRange(from, to)
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

    if (this.value) {
      // this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    }
    this.jsonEditor.on('change', cm => {
      this.$emit('update:value', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue()
    },
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
