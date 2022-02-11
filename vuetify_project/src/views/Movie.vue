<template>
  <v-container class="py-3 ">
    <v-row>
      <v-col cols="4">
        <v-card
            elevation="10">
          <v-img v-if="movie['poster_path'] !== null"
              :src="imagesSourceUrl"
          >
          </v-img>
          <v-card-title class="justify-center" v-else>
            [No poster in database]
          </v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-row class="black--text text-h4 font-weight-bold ma-1">{{ titleWithYear }}</v-row>
        <v-row>{{ genres }}</v-row>
        <v-row>{{ movie['overview'] }}</v-row>
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
      imagesSourceUrl: "",
      movie: {},
      recommended: [],
      recommendedToShow: 3,
      similar: [],
      similarToShow: 3,
      titleWithYear: "",
      genres: ""
    };
  },

  mounted() {
    const movieId = this.$route.params.movieid;

    this.service.getMovieDetails(movieId).then(result => {
      this.movie = result.data;
    }).catch(err => {
      console.log(err);
    });

    this.service.getMovieRecommendations(movieId).then(result => {
      this.recommended = result.data['results'];
    }).catch(err => {
      console.log(err);
    });

    this.service.getSimilarMovies(movieId).then(result => {
      this.similar = result.data['results'];
    }).catch(err => {
      console.log(err);
    });
  },

  watch: {
    movie: {
      immediate: false,

      handler() {
        this.imagesSourceUrl = this.service.imagesSourceFullUrl + this.movie['poster_path'];
        this.titleWithYear = this.movie['title'] + " (" + this.movie['release_date'].substring(0, 4) + ")";
        this.genres = this.movie['genres'].map(item => item['name']).join(', ')
      }
    }
  }
}
</script>
