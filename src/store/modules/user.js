import { login, logout, getRoles } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  email: '',
  introduction: '',
  roles: []
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
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log(userInfo)

    // if (userInfo.code) { // 邮箱登录
    //   console.log('进入邮箱登录', userInfo)
    //   return new Promise((resolve, reject) => {
    //     commit('SET_TOKEN', userInfo.name)
    //     commit('SET_NAME', userInfo.name) // 设置昵称
    //     commit('SET_AVATAR', 'https://thirdwx.qlogo.cn/mmopen/vi_32/xCIc7U9YzawpxOjH89Prg1LyQtgicbA8WVPOgMgibU35icXjDrdlzQvq5VicQy3TzxgNh0GdtVibhFCibibZ65E1uOMdw/132') // 头像
    //     setToken(userInfo.name)
    //     resolve()
    //   })
    // }
    // if (userInfo.token) { // 如果扫码登录直接携带了 token
    //   return new Promise((resolve, reject) => {
    //     commit('SET_TOKEN', userInfo.token)
    //     commit('SET_NAME', userInfo.nickname) // 设置昵称
    //     commit('SET_AVATAR', userInfo.avatar) // 头像
    //     setToken(userInfo.token)
    //     resolve()
    //   })
    // } else {
    const { username, token, id } = userInfo
    return new Promise((resolve, reject) => {
      sessionStorage.setItem('userId', id)
      commit('SET_TOKEN', token)
      setToken(token)
      resolve()

      // login({ username: username.trim(), password: password }).then(response => {
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
    // }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const userId = sessionStorage.getItem('userId')
      if (userId && userId != undefined) {
        getRoles({ ID: userId }).then(res => {
          console.log('进入获取信息', res.data)
          const { roles, nickName, avatarUrl, EMAIL } = res.data
          const rolesNew = []
          roles.forEach(v => {
            rolesNew.push(v.ROLE_ID.toString())
          })
          // roles must be a non-empty array
          if (!rolesNew || rolesNew.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_ROLES', rolesNew)
          commit('SET_NAME', nickName)
          commit('SET_AVATAR', avatarUrl)
          commit('SET_EMAIL', EMAIL)
          // commit('SET_INTRODUCTION', introduction)
          resolve(rolesNew)
        })
      } else { // 不存在用户
        reject()
      }
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
