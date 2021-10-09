<template>
  <a-card hoverable>
    <template #extra>
      <a-switch checked-children="中" un-checked-children="EN" v-model:checked="isChinese"  />
    </template>
    <template #title>
      <span>{{ userInfo.title }}</span>
    </template>
    <template #cover>
      <img alt="cover" :src="cover"/>
    </template>
    <a-card-meta :title="user.name" :description="user.introduction">
      <template #avatar>
        <a-avatar :src="user.avatar" />
      </template>
    </a-card-meta>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>{{ userInfo.edu }}</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <p v-for="eduItem in userInfo.eduList" :key="eduItem.label">{{ `${eduItem.label}：${eduItem.value}` }}</p>
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>{{ userInfo.skill }}</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue</span>
            <a-progress :percent="70" :stroke-color="strokeColor"/>
          </div>
          <div class="progress-item">
            <span>JavaScript</span>
            <a-progress :percent="65" :stroke-color="strokeColor" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <a-progress :percent="60" :stroke-color="strokeColor" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <a-progress :percent="40" :stroke-color="strokeColor"/>
          </div>
          <div class="progress-item">
            <span>php</span>
            <a-progress :percent="45" :stroke-color="strokeColor"/>
          </div>
          <div class="progress-item">
            <span>Python</span>
            <a-progress :percent="25" :stroke-color="strokeColor"/>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import { readonly, ref, computed } from 'vue'

export default {
  name: 'userCard',
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          description: ''
        }
      }
    }
  },
  setup() {
    const cover = readonly(require('@/assets/saber.jpg'))
    // https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png
    const strokeColor = readonly({
      '0%': '#108ee9',
      '100%': '#87d068',
    })
    const isChinese = ref(true)
    const chineseInfo = {
      title: '自我介绍',
      edu: '教育背景',
      eduList: [
        { label: '专业', value: '环境工程' },
        { label: '学历', value: '本科' },
      ],
      skill: '编程技能',
    }
    const enInfo = {
      title: 'About me',
      edu: 'Education',
      eduList: [
        { label: 'major', value: 'Environmental Engineering' },
        { label: 'education', value: 'undergraduate' },
      ],
      skill: 'Skills',
    }
    const userInfo = computed(() => (isChinese.value ? chineseInfo : enInfo))

    return {
      cover,
      strokeColor,
      isChinese,
      userInfo
    }
  }
}
</script>
<style lang="scss" scoped>
.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>

