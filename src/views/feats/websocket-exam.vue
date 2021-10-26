<template>
  <div class="web-socket-exam">
    <sys-title title="WebSocket 示例"></sys-title>
    <div class="web-socket-exam__content">
      <a-row :gutter="16">
        <a-col :span="8">
          <div class="ws-exam">
            <div class="label-item">
              <span class="lb">连接状态：</span>
              <a-tag :color="getTagColor">
                <template #icon>
                  <component :is="getTagIcon" class="a-tag-customer" :spin="getTagIconOptions && getTagIconOptions.spin" />
                </template>
                {{ getTagText }}
              </a-tag>
            </div>
            <hr class="sys-line">
            <div class="sy-flex">
              <a-input
                addon-before="服务地址"
                v-model:value="state.server"
                placeholder="请输入weSocket地址" />
              <a-button :danger="getIsOpen" type="primary" @click="toggle">
                {{ getIsOpen ? '关闭连接' : '开启连接' }}
              </a-button>
            </div>
            <div class="label-item mar-1"><span class="lb">设置</span></div>
            <hr class="sys-line">
            <a-textarea v-model:value="state.sendValue" placeholder="发送服务器的内容" :rows="4" />
            <a-button type="primary" class="send-btn" @click="handlerSend">发送</a-button>
          </div>
        </a-col>
        <a-col :span="16">
          <div class="ws-exam">
            <div class="label-item"><span class="lb">消息记录：</span></div>
            <hr class="sys-line">
            <div class="ws-records">
              <ul>
                <li v-for="item in resList" class="ws-res-item" :key="item.time">
                  <div class="flex items-center">
                    <span class="text-primary">收到消息:</span>
                    <span>{{ parseTime(item.time) }}</span>
                  </div>
                  <div>
                    {{ item.data }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { defineComponent, watchEffect, computed, reactive } from 'vue'
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import { useWebSocket } from '@vueuse/core'
import { parseTime } from '@/utils'

const WebSocketStatusMap = {
  OPEN: {
    label: 'OPEN',
    value: 'success',
    icon: CheckCircleOutlined,
  },
  CONNECTING: {
    label: 'CONNECTING',
    value: 'processing',
    icon: SyncOutlined,
    iconOptions: {
      spin: true
    }
  },
  CLOSED: {
    label: 'CLOSED',
    value: 'error',
    icon: CloseCircleOutlined
  }
}

const dataDemo = {
  "id": 10000
}

export default defineComponent({
  name: 'webSocketExam',
  components: {
    CheckCircleOutlined, SyncOutlined, CloseCircleOutlined
  },
  setup () {
    const state = reactive({
      server: 'ws://localhost:30001',
      sendValue: JSON.stringify(dataDemo),
      recordList: [],
    })
    const { status, data, send, open, close } = useWebSocket(state.server, {
      autoReconnect: false,
      heartbeat: true,
    })
    watchEffect(() => {
      if (data.value) {
        try {
          const res = JSON.parse(data.value)
          state.recordList.push(res)
        } catch (error) {
          state.recordList.push({
            data: data.value,
            id: Math.ceil(Math.random() * 1000),
            time: new Date().getTime(),
          })
        }
      }
    })

    const getIsOpen = computed(() => status.value === 'OPEN')
    const getTagColor = computed(() => WebSocketStatusMap[status.value].value)
    const getTagText = computed(() => WebSocketStatusMap[status.value].label)
    const getTagIcon = computed(() => WebSocketStatusMap[status.value].icon)
    const getTagIconOptions = computed(() => WebSocketStatusMap[status.value].iconOptions)
    const resList = computed(() => ([...state.recordList].reverse()))

    function toggle() {
      if (getIsOpen.value) {
        close()
      } else {
        open()
      }
    }
    function handlerSend() {
      send(state.sendValue)
      state.sendValue = ''
    }

    return {
      state,
      status,
      getIsOpen,
      getTagColor,
      getTagText,
      getTagIcon,
      getTagIconOptions,
      toggle,
      handlerSend,
      resList,
      parseTime
    }
  }
})
</script>
<style lang="scss" scoped>
.web-socket-exam {

  &__content {
    padding: 1rem;
  }

  .ws-exam {
    background-color: white;
    padding: 1rem;
    height: 348px;

    .label-item {
      // font-size: 1.125rem;
      font-size: 0;
      line-height: 1.75rem;
    }
    .label-item > span {
      display: inline-block;
      vertical-align: middle;
    }
    .label-item > .lb {
      display: inline-block;
      vertical-align: middle;
      font-size: 1.125rem;
    }

    .send-btn {
      width: 100%;
      margin-top: 1rem;
    }

    .ws-records {
      height: 254px;
      overflow: auto;
      background: aliceblue;
      padding: 4px;
    }
  }

  .mar-1 {
    margin-top: 1rem;
  }

  .ant-tag {
    vertical-align: middle;
  }

  .sy-flex {
    display: flex;
  }
}
</style>
