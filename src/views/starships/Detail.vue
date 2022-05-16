<template>
  <v-card v-if="starship">
    <v-card-title class="subheading font-weight-bold">
      {{ starship.name }}
    </v-card-title>
    
    <v-divider></v-divider>
    
    <v-list dense>
      <v-list-item
        v-for="(key, index) in starship"
        :key="index"
      >
        <template v-if="index === 'films'">
          <v-list-item-content>
            {{ index }}:
          </v-list-item-content>
          <v-list-item-content
            v-if="filmsLoaded"
            class="align-end"
          >
            {{ getFilmsNames(key) }}
          </v-list-item-content>
        </template>
        <template v-else-if="index === 'pilots'">
          <v-list-item-content>
            {{ index }}:
          </v-list-item-content>
          <v-list-item-content
            v-if="pilotsLoaded"
            class="align-end"
          >
            {{ getPilotsNames(key) }}
          </v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-content>
            {{ index }}:
          </v-list-item-content>
          <v-list-item-content
            class="align-end"
          >
            {{ key }}
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "Detail",
  data: ()=>({
    filmsLoaded: false,
    pilotsLoaded: false,
  }),
  computed: {
    starship() {
      return this.$store.getters.starship(this.$route.params.id)
    },
  },
  methods: {
    getFilmsNames(arr) {
      let result = []
      arr.forEach(el=>{
        result.push(this.getFilmName(el))
      })
      return result.join(', ')
    },
    getFilmName(id) {
      return this.$store.getters.film(id)?.title
    },
    getPilotsNames(arr) {
      let result = []
      arr.forEach(el=>{
        result.push(this.getPilotName(el))
      })
      return result.join(', ')
    },
    getPilotName(id) {
      return this.$store.getters.human(id)?.name
    },
  },
  created() {
    this.$store.dispatch('fetchStarship', this.$route.params.id)
  },
  watch: {
    starship: {
      handler: function (val) {
        if (!val) {
          return
        }
        if (Array.isArray(val.pilots) && val.pilots.length > 0) {
          let promises = []
          val.pilots.forEach(el=>{
            promises.push(this.$store.dispatch('fetchHuman', el))
          })
          Promise.all(promises)
            .then(()=>{
              this.pilotsLoaded = true
            })
        }
        if (Array.isArray(val.films) && val.films.length > 0) {
          let promises = []
          val.films.forEach(el=>{
            promises.push(this.$store.dispatch('fetchFilm', el))
          })
          Promise.all(promises)
            .then(()=>{
              this.filmsLoaded = true
            })
        }
      },
      immediate: true
    },
  },
}
</script>
