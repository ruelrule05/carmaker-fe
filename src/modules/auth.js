import axios from 'axios'

const state = {
    user: null,
    token: null,
    colors: null
};

const getters = {
    isAuthenticated: state => !!state.user,
    stateColors: state => state.colors,
    stateUser: state => state.user
};

const actions = {
    async login({commit}, data) {
        await commit('setUser', data.user)
        await commit('setToken', data.token)
    },

    async createColor({dispatch}, color) {
        await axios.post('colors', color)
        await dispatch('getColors')
    },

    async getColors( {commit} ) {
        let response = await axios.get('colors')
        commit('setColors', response.data)
    },

    async logout( {commit} ) {
        let user = null
        commit('logout', user)
    }
};

const mutations = {
    setUser(state, user) {
        state.user = user
    },
    
    setToken(state, token) {
        console.log('setting token')
        console.log(token)
        state.token = token
    },
    
    setColors(state, colors) {
        state.colors = colors
    },

    logout(state) {
        state.user = null
        state.token = null
        state.colors = null
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};