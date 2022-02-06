<template>
  <v-app>
    <v-app-bar
        app
        color="#F0F0F0"

        flat
    >
      <v-container class="py-0 fill-height">
        <div class="d-flex align-content-center">
          <router-link to="/">
            <v-img
                src="./assets/films_logo.png"
                max-width="180"
                contain
                href="/"
            />
          </router-link>
        </div>

        <v-spacer></v-spacer>

        <v-btn
            v-for="item in menuItems"
            :key="item.name"
            :to="item.path"
            large
            color="#3A4750"
            text
            exact
        >
          <v-icon class="pa-2"> {{ item.icon }}</v-icon>
          <span class="d-none d-md-inline-flex d-lg-inline-flex">{{ item.name }}</span>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            to="/about"
            text
        >
          <span class="mr-2">LR</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view/>
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
          name: "Popular",
          path: "/popular",
          icon: "mdi-movie"
        },
        {
          name: "Search",
          path: "/search",
          icon: "mdi-magnify"
        },
        {
          name: "Favorites",
          path: "/favorites",
          icon: "mdi-heart"
        },
      ],


    };
  },
}
</script>
