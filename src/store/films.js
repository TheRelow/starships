import axios from "axios";

export default {
  state: () => ({
    films: [],
  }),
  mutations: {
    setFilm(state, film) {
      let idx = state.films.findIndex(el=>el.url===film.url)
      if (idx === -1) {
        state.films.push(film)
      }
      state.films[idx] = film
    },
  },
  actions: {
    fetchFilm({commit}, id) {
      return new Promise((resolve, reject) => {
        let url = 'https://swapi.dev/api/films/' + id + '/'
        if (typeof id === 'string') {
          url = id
        }
        axios({ url, method: 'GET' })
          .then(res=>{
            commit('setFilm', res.data)
            resolve(res.data)
          })
      })
    },
  },
  getters: {
    film: state => id => {
      let idx = state.films.findIndex(el=>el.url===`https://swapi.dev/api/films/${id}/`)
      if (typeof id === 'string') {
        idx = state.films.findIndex(el=>el.url===id)
      }
      if (idx !== -1) {
        return state.films[idx]
      }
      return null
    }
  }
}
