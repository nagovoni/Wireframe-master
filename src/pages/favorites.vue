<template>
  <div class="text-center pa-4" >
    <v-divider/>
     <h1>Favorites</h1>
       <v-card v-for="(j, index) in favoritedJokes"
       :key="index"
       color="teal-darken-4"
       style="margin: 10px 0"
       >
       <v-list-item>
       {{ j.value }}
      </v-list-item>
       </v-card>
  </div>
  <v-main class="bg-grey-lighten-2">
      <v-container>
        <v-row>
          <router-view />
          </v-row>
      </v-container>
    </v-main>

</template>

<script>

import { useJokesStore } from '@/store';

export default {

  setup() {
    const jokesStore = useJokesStore(); // Access the store
  },
}

</script>
