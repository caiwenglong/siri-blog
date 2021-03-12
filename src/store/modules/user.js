import { apiLogin, apiGetUserInfo, apiGetRegisterCode, apiRegister } from '../../api/user'
import { setToken, setRole, setUserId } from '../../utils/auth'

const getDefaultState = () => {
  return {
    id: '',
    token: '',
    name: '',
    avatar: '',
    role: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  /**
   * 登录
   * @param commit
   * @param userInfo：{ username: 用户名，password: 密码}
   * @returns {Promise<unknown>}
   */
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      apiLogin({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 通过token获取用户信息
   * @param commit
   * @param token
   * @returns {Promise<unknown>}
   */
  getUserInfos({ commit }, token) {
    return new Promise((resolve, reject) => {
      apiGetUserInfo(token).then(response => {
        const { data } = response
        commit('SET_ID', data.result.id)
        commit('SET_ROLE', data.result.role)
        setUserId(data.result.id)
        setRole(data.result.role)
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 获取注册码
   */
  getRegisterCode({ commit }, phoneNum) {
    return new Promise((resolve, reject) => {
      apiGetRegisterCode(phoneNum).then(response => {
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  },

  registerUser({ commit }, data) {
    const registerInfo = {
      mobile: data.phoneNum,
      nickname: data.username,
      password: data.password,
      phoneCode: data.getRegisterCode()
    }
    return new Promise((resolve, reject) => {
      apiRegister(registerInfo).then(response => {
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
