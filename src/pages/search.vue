<template>
  <div class="text-center pa-4" >
    <v-divider/>
     <h1>Search</h1>
       <v-card v-for="(j, index) in store.filteredJokes"
       :key="index"
       color="teal-darken-4"
       style="margin: 10px 0"
       >
       <v-list-item>{{ j.value }}
        <v-list-item-avatar>
          <img :src="chuck" style="width: 110px; height: 80px;">
          </v-list-item-avatar>
      </v-list-item>
       </v-card>
  </div>

</template>

<script setup>
import { useJokesStore } from '@/store'


// access the `store` variable anywhere in the component ✨
const store = useJokesStore()
</script>
