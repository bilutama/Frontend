<template>
  <v-app>
    <v-app-bar
        app
        color="#F0"
    >
      <v-container class="py-0 fill-height">
        <router-link to="/">
          <v-img
              src="./assets/films.png"
              max-width="180"
              contain
          />
        </router-link>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
              v-model.trim="searchTerm"
              dense
              flat
              hide-details
              outlined
              clearable
              placeholder="Search"
          ></v-text-field>
        </v-responsive>
        <v-btn
            width="15"
            text
            @click.prevent="search()">
          <v-icon
              large
              class="px-2"
          >
            mdi-magnify
          </v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            v-for="item in menuItems"
            :key="item.name"
            @click.prevent="navigate(item)"
            large
            color="#3A4750"
            text
            exact
        >
          <v-icon class="pa-2">
            {{ item.icon }}
          </v-icon>
          <span class="d-none d-md-inline-flex d-lg-inline-flex">
            {{ item.name }}
          </span>
        </v-btn>
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
      menuItems: [
        {
          name: "Favorites",
          path: "/favorites",
          icon: "mdi-heart"
        }
      ],
      searchTerm: "",
    };
  },

  methods: {
    navigate(item) {
      this.$router.push({name: item.name, params: item.params}, () => {
      });
    },

    search() {
      this.searchTerm = this.searchTerm.trim();

      if (this.searchTerm.length > 0) {
        this.$router.push({name: 'Search', params: {term: this.searchTerm}}, () => {
        });
      }
    }
  }
}
</script>
