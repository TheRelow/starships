<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link to="/" class="logo">Starships</router-link>
      <v-text-field
        class="searchField"
        v-model="searchField"
        label="Поиск"
        append-icon="mdi-magnify"
        @click:append="search"
        @keyup.enter="search"
      ></v-text-field>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    searchField: '',
  }),
  methods: {
    search() {
      this.$store.commit('setSearch', this.searchField)
      this.$router.push('/starships/?search='+this.searchField)
    },
  },
  created() {
    if (this.$store.getters.search) {
      this.searchField = this.$store.getters.search
    }
  }
};
</script>

<style lang="scss">
.logo {
  color: #fff !important;
  margin-right: 25px;
  text-decoration: none;
}
.searchField .v-text-field__details, .searchField .v-messages {
  min-height: 0 !important;
}
</style>
