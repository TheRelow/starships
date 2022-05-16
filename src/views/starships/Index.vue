<template>
  <v-data-table
    :headers="headers"
    :items="starships"
    :options.sync="options"
    :server-items-length="totalStarships"
    :loading="loading"
    :footer-props="{'items-per-page-options':[10]}"
    :items-per-page="10"
    class="elevation-1"
    @click:row="handleClick"
  ></v-data-table>
</template>

<script>
import generateObjectWithRequiredKeys from "@/workers/generateObjectWithRequiredKeys";
import encodeQueryData from "@/workers/encodeQueryData";

export default {
  name: "Index",
  data: ()=>({
    headers: [
      {
        text: 'name',
        value: 'name'
      },
      {
        text: 'price',
        value: 'cost_in_credits'
      },
      {
        text: 'length',
        value: 'length'
      },
      {
        text: 'crew',
        value: 'crew'
      },
    ],
    loading: true,
    totalStarships: 0,
    options: {},
    starships: []
  }),
  computed: {
    search() {
      return this.$store.getters.search
    }
  },
  methods: {
    handleClick(starship) {
      let split = starship.url.split('/')
      let id = split[split.length - 2]
      this.$router.push(`/starships/${id}/`)
    },
    getDataFromApi() {
      let newLink = false
      let objectWithRequiredKeys = generateObjectWithRequiredKeys(Object.assign(this.options, {search: this.search}), ['search', 'page'])
      if (Object.keys(objectWithRequiredKeys).length !== 0) {
        newLink = '/starships/?' + encodeQueryData(objectWithRequiredKeys)
      }
      if (this.$route.fullPath === newLink) {
        newLink = false
      }
      if (newLink && typeof newLink === 'string') {
        this.$router.push(newLink)
      }
      this.loading = true
      this.$store.dispatch('fetchStarships', Object.assign(this.options, {search: this.search}))
        .then((data)=>{
          this.totalStarships = data.data.count
          this.starships = data.data.results
          this.loading = false
        })
    },
  },
  created() {
    if (this.$route.query.page) {
      this.options.page = +this.$route.query.page
    }
    if (this.$route.query.search) {
      this.$store.commit('setSearch', this.$route.query.search)
    }
    this.getDataFromApi()
  },
  watch: {
    options: {
      handler () {
        this.getDataFromApi()
      },
      deep: true,
    },
    search: {
      handler () {
        this.options.page = 1
        this.getDataFromApi()
      },
    },
  },
}
</script>
