<template>
  <v-container>
    <v-row>
      <v-col
          v-for="n in 24"
          :key="n"
          cols="4"
      >
        <v-card height="210"></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
}
</script>
