import axios from "axios";
import encodeQueryData from "@/workers/encodeQueryData";
import generateObjectWithRequiredKeys from "@/workers/generateObjectWithRequiredKeys";

export default {
  state: () => ({
    starships: [],
    search: ''
  }),
  mutations: {
    setStarships(state, starships) {
      state.starships = starships
    },
    setStarship(state, starship) {
      let idx = state.starships.findIndex(el=>el.url===starship.url)
      if (idx === -1) {
        state.starships.push(starship)
      }
      state.starships[idx] = starship
    },
    setSearch(state, search) {
      state.search = search
    },
  },
  actions: {
    fetchStarships({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url = 'https://swapi.dev/api/starships/'
        let objectWithRequiredKeys = generateObjectWithRequiredKeys(payload, ['search', 'page'])
        if (Object.keys(objectWithRequiredKeys).length !== 0) {
          url += '?' + encodeQueryData(objectWithRequiredKeys)
        }
        axios({ url, method: 'GET' })
          .then(res=>{
            commit('setStarships', res.data.results)
            resolve(res)
          })
      })
    },
    fetchStarship({commit}, id) {
      return new Promise((resolve, reject) => {
        let url = 'https://swapi.dev/api/starships/' + id + '/'
        axios({ url, method: 'GET' })
          .then(res=>{
            commit('setStarship', res.data)
            resolve(res.data)
          })
      })
    },
  },
  getters: {
    search: state => state?.search,
    starships: state => state?.starships,
    starship: state => id => {
      let idx = state.starships.findIndex(el=>el.url===`https://swapi.dev/api/starships/${id}/`)
      if (idx !== -1) {
        return state.starships[idx]
      }
      return null
    }
  }
}
