<template>
  <v-container class="py-3 ">
    <v-row>
      <v-col cols="4">
        <v-card
            elevation="10">
          <v-img
              :src="imagesSourceUrl"
          >
          </v-img>
        </v-card>
      </v-col>
      <v-col>
        <span class="black--text font-weight-bold ma-1">{{ fullTitle }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";

export default {
  name: "Movie",

  data() {
    return {
      service: new MovieDbService(),
      fullTitle: "",
      imagesSourceUrl: "",
      movie: {}
    };
  },

  mounted() {
    this.service.getMovieDetails(this.$route.params.movieid).then(result => {
      this.movie = result.data;
    }).catch(err => {
      console.log(err);
    });
  },

  methods: {},

  computed: {
  },

  watch: {
    movie: {
      immediate: false,

      handler() {
        this.imagesSourceUrl = this.service.imagesSourceFullUrl + this.movie['poster_path'];
        this.fullTitle = this.movie['title'] + " (" + this.movie['release_date'].substring(0, 4) + ")";
      }
    }
  }
}
</script>
