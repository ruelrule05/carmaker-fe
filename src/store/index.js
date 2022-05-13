import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '../modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: null
  },
  getters: {
    getColors: state => state.colors
  },
  mutations: {
    setColors(state, colors) {
      state.colors = colors
    }
  },
  actions: {
    async addColor({dispatch}) {
      await dispatch('getColors')
    },

    async getColors( {commit} ) {
      let response = await axios.get('/colors')
      commit('setColors', response.data.data)
    }
  },
  modules: {
    auth
  },
  plugins: [createPersistedState()]
})
