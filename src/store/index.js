import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '../modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: null,
    carTypes: null
  },
  getters: {
    getCarTypes: state => state.carTypes,
    getColors: state => state.colors
  },
  mutations: {
    setCarTypes(state, types) {
      state.carTypes = types
    },
    setColors(state, colors) {
      state.colors = colors
    }
  },
  actions: {
    async addCarType({dispatch}) {
      await dispatch('getCarTypes')
    },
    async addColor({dispatch}) {
      await dispatch('getColors')
    },

    async getCarTypes( {commit} ) {
      let response = await axios.get('/car-types')
      commit('setCarTypes', response.data.data);
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
