<template>
  <v-app>
    <v-app-bar
        app
        color="#F0"
        height="70"
    >
      <v-container class="py-1 px-0 fill-height">
        <router-link to="/">
          <v-img
              v-if="$vuetify.breakpoint.mdAndUp"
              src="./assets/films.png"
              max-width="180"
              contain
          />
          <v-icon
              v-else
              large
              color="#3A4750"
          >
            mdi-movie-roll
          </v-icon>
        </router-link>
        <v-spacer></v-spacer>

        <v-responsive max-width="500">
          <v-text-field
              v-model.trim="searchTerm"
              hide-details
              outlined
              dense
              placeholder="Search"
              @keydown.enter="search()"
          >

            <v-tooltip right open-delay="700" slot="append-outer">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" href="search">
                  mdi-magnify
                </v-icon>
              </template>
              <span>Search movies</span>
            </v-tooltip>

          </v-text-field>
        </v-responsive>
        <v-spacer></v-spacer>

        <router-link :to="{name: 'Favorites'}">
          <v-btn
              v-if="$vuetify.breakpoint.mdAndUp"
              large
              color="#3A4750"
              text
              exact
          >
            <v-icon>
              mdi-heart
            </v-icon>
            <span>favorites</span>
          </v-btn>
          <v-icon large v-else>
              mdi-heart
          </v-icon>
        </router-link>

      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",

  data() {
    return {
      searchTerm: ""
    };
  },

  methods: {
    search() {
      this.searchTerm = this.searchTerm.trim();

      if (this.searchTerm.length > 0) {
        this.$router.push({name: "Search", params: {term: this.searchTerm}});
      }
    }
  }
};
</script>
<style>
a:link {
  text-decoration: none;
}
</style>
