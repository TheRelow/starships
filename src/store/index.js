import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import starships from './starships'
import people from './people'
import films from './films'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    starships, people, films
  }
})
