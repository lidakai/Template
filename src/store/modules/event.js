
const event = {
  state: {
   addHostStream:false,
  },
  mutations: {
    SET_ADDHOSTSTREAM: (state,addHostStream) => {
      state.addHostStream = addHostStream;
    }
  },
  actions: {
    set_addHostStream({ commit }, addHostStream) {
      commit('SET_ADDHOSTSTREAM',addHostStream)
    }
  }
}

export default event
