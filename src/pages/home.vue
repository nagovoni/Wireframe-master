
<template>
  <v-container>
    <v-infinite-scroll height="600px" mode="manual" @load="load">
      <v-card-text class="text-h5 py-2" v-if="jokeStore?.jokes?.length > 0" >
         <v-container>
               <v-col class="mx-auto my-3" elevation="16" max-width="344" xs="12" sm="10" offset-sm1
                v-for="joke in jokeStore.jokes" :key="joke.id">
                 <v-card>
                  <v-img
                   color="surface-variant"
                   height="250"
                   src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*UpbyOhG9ydJ4aI_yiRRVGw.png"
                   cover
                  >
                  </v-img>

                   <v-card-text>
                    {{ joke.value }}
                   </v-card-text>
                   <v-card-actions>
                     <v-btn
                       :icon="joke.isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
                       @click="toggleFavorite(joke)"
                       class="favorite-button">
                      </v-btn>
                   </v-card-actions>
                 </v-card>
               </v-col>
           </v-container>
      </v-card-text>
      <v-card-text v-else>
         <v-alert>No jokes here!</v-alert>
      </v-card-text>
    </v-infinite-scroll>
  </v-container>
</template>

<script>
 import axios from 'axios';
 import { useJokesStore } from '../store'



 export default {
  data() {
    return {
      jokes: [],
      isFavorite: false,
      jokeStore: useJokesStore(),
    };
  },

  methods: {

   async load({ done }) {
     try{
      const res = await axios.get('https://api.chucknorris.io/jokes/random');
      this.jokeStore.addJoke(res.data);
      done('ok');
     } catch (error) {
      console.error('Error fetching joke:', error);
     }
   },
   deleteJoke(id) {
    this.jokeStore.removeJoke(id);
   },

   toggleFavorite(joke){
      const index = this.jokeStore.jokes.findIndex(el => el.id === joke.id)
      this.jokeStore.jokes[index].isFavorite = !joke.isFavorite;
      this.jokeStore.addOrRemoveFavorite(joke)
      console.log(this.jokeStore.favoriteJokes.length)
    }
   },
  };
</script>
<style>
.back {
  background-image: url('https://assets.dragoart.com/images/10610_501/how-to-draw-chuck-norris-chuck-norris_5e4c97d5e44d82.08617054_46254_3_4.jpg'); /* Replace with your image URL */
  background-size: cover; /* Optional: Set background size (cover, contain, etc.) */
  background-position: center; /* Optional: Set background position (center, top left, etc.) */
}
</style>
