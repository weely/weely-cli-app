import defaultConfig from '@/config'
import variables from '@/styles/theme-variables.scss'

const { showSettings, fixedHeader, sidebarLogo } = defaultConfig

console.log('variables', variables)

// 系统设置
const state = {
  theme: variables.theme,
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    const stateKeys = Object.keys(state)
    if (stateKeys.includes(key)) {
      state[key] = value
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
