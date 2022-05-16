import axios from "axios";

export default {
  state: () => ({
    people: [],
  }),
  mutations: {
    setHuman(state, human) {
      let idx = state.people.findIndex(el=>el.url===human.url)
      if (idx === -1) {
        state.people.push(human)
      }
      state.people[idx] = human
    },
  },
  actions: {
    fetchHuman({commit}, id) {
      return new Promise((resolve, reject) => {
        let url = 'https://swapi.dev/api/people/' + id + '/'
        if (typeof id === 'string') {
          url = id
        }
        axios({ url, method: 'GET' })
          .then(res=>{
            commit('setHuman', res.data)
            resolve(res.data)
          })
      })
    },
  },
  getters: {
    human: state => id => {
      let idx = state.people.findIndex(el=>el.url===`https://swapi.dev/api/people/${id}/`)
      if (typeof id === 'string') {
        idx = state.people.findIndex(el=>el.url===id)
      }
      if (idx !== -1) {
        return state.people[idx]
      }
      return null
    }
  }
}
