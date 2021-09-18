import defaultConfig from '@/config'
import variables from '@/styles/theme-variables.scss'
import store from 'store'

const { showSettings, fixedHeader, sidebarLogo } = defaultConfig

// 系统设置
const state = {
  theme: variables.theme,
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: store.get('wlSidebarLogo') || sidebarLogo,
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    const stateKeys = Object.keys(state)
    if (stateKeys.includes(key)) {
      state[key] = value

      if (key === 'sidebarLogo') {
        store.set('wlSidebarLogo', value)
      }
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
