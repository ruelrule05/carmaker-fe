const state = {
    user: null,
    token: null
};

const getters = {
    isAuthenticated: state => !!state.user,
    stateUser: state => state.user,
    stateToken: state => state.token
};

const actions = {
    async login({commit}, data) {
        await commit('setUser', data.user)
        await commit('setToken', data.token)
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