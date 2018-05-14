import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import event from './modules/event'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import user from './modules/user'
import getters from './getters'
import setters from './setters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    event,
    permission,
    user
  },
  getters,
  setters
})

export default store
