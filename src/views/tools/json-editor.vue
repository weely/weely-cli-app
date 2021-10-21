<template>
  <div class="components-container">
    <sys-title title="JSON格式校验"></sys-title>
    <div class="editor-container">
      <json-editor v-model:value="value" />
    </div>
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
import { ref } from 'vue'

const jsonData = `{"project": "JSONViewer","description": "make JSON documents easy to read","描述": "校验JSON、格式化JSON","arr demo": [1, 2, 3, 4]}`

export default {
  name: 'JsonEditorView',
  components: { JsonEditor },
  setup() {

    return {
      value: ref(jsonData)
    }
  }
}
</script>

<style scoped>
.editor-container {
  position: relative;
  padding: 16px;
  height: 100%;
}
</style>

