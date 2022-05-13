import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '../modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cars: null,
    colors: null,
    carTypes: null,
    manufacturers: null
  },
  getters: {
    getCars: state => state.cars,
    getCarTypes: state => state.carTypes,
    getColors: state => state.colors,
    getManufacturers: state => state.manufacturers
  },
  mutations: {
    setCars(state, cars) {
      state.cars = cars
    },
    setCarTypes(state, types) {
      state.carTypes = types
    },
    setColors(state, colors) {
      state.colors = colors
    },
    setManufacturers(state, manufacturers) {
      state.manufacturers = manufacturers
    }
  },
  actions: {
    async addCar({dispatch}) {
      await dispatch('getCars')
    },
    async addCarType({dispatch}) {
      await dispatch('getCarTypes')
    },
    async addColor({dispatch}) {
      await dispatch('getColors')
    },

    async addManufacturer({dispatch}) {
      await dispatch('getManufacturers')
    },

    async getCars( {commit} ) {
      let response = await axios.get('/cars')
      commit('setCars', response.data.data)
    },

    async getCarTypes( {commit} ) {
      let response = await axios.get('/car-types')
      commit('setCarTypes', response.data.data);
    },

    async getColors( {commit} ) {
      let response = await axios.get('/colors')
      commit('setColors', response.data.data)
    },

    async getManufacturers( {commit} ) {
      let response = await axios.get('/manufacturers')
      commit('setManufacturers', response.data.data)
    }
  },
  modules: {
    auth
  },
  plugins: [createPersistedState()]
})
