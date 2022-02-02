<template>
  <v-container class="py-3 ">
    <v-card
        elevation="10">
      <v-img
          :src="getImagePath(movie)"
      >
      </v-img>
    </v-card>
  </v-container>
</template>

<script>
import MovieDbService from "../movieDbService.js";

export default {
  name: "Movie",

  data() {
    return {
      service: new MovieDbService(),
      imagesSourceUrl: "",
      movie: {}
    };
  },

  mounted() {
    this.imagesSourceUrl = this.service.imagesSourceFullUrl;

    this.service.getMovieDetails(this.$route.params.movieid).then(result => {
      this.movie = result.data;
    }).catch(err => {
      console.log(err);
    });
  },

  methods: {
    getImagePath(movie) {
      return (this.imagesSourceUrl + movie.poster_path);
    }
  }
}
</script>
