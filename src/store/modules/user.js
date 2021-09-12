
const state = {
  token: '',
  name: '',
  avatar: 'https://avatars.githubusercontent.com/u/21010325?s=60&v=4',
  introduction: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
