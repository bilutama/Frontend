<template>
  <v-card
      elevation="10"
      :href="'/movie/'+movie.id"
  >
    <v-app-bar
        color="#F0"
    >
      <v-toolbar-title>{{ movie.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip top open-delay="700">
        <template v-slot:activator="{on}">
          <v-btn
              v-on="on"
              title="Add to favorites"
              @click.stop.prevent="$emit('toggleFavorite', movie)"
              fab
              x-small
              class="ma-1"
          >
            <v-icon :color="isFavorite ? 'pink' : 'grey lighten-2'">
              mdi-heart
            </v-icon>
          </v-btn>
        </template>
        <span v-if="isFavorite">Remove from favorites</span>
        <span v-else>Add to favorites</span>
      </v-tooltip>
    </v-app-bar>

    <v-responsive :aspect-ratio="posterRatio">
      <v-img
          v-if="movie.poster_path !== null"
          :src="posterPath"
          :aspect-ratio="posterRatio"
      ></v-img>
      <v-card-title
          v-else
          class="text--secondary justify-center"
      >
        [No poster in database]
      </v-card-title>
    </v-responsive>

    <v-card-text class="overflow-x-hidden" >
      {{ movieGenres }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MovieCard",

  props: {
    movie: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      required: true
    },
    posterPath: {
      type: String,
      required: true
    },
    movieGenres: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      visiblePages: 7,
      posterRatio: 0.65
    };
  }
};
</script>