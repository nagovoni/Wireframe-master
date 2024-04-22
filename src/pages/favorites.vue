<template>
  <v-container>
       <v-row>
         <v-col>
          <input v-model= "search" type="text" name="search" id="search" placeholder="Search for term">
         </v-col>
       </v-row>
       <v-row>
        <v-col>
          <v-card class="mx-auto" max-width="500" hover>
            <v-card-text>
              <v-container>
                <v-col v-for="(joke, index) in filteredJokes" :key="index">
                  <v-card>
                    <v-card-text>
                     {{ joke.value }}
                    </v-card-text>
                  </v-card>
                </v-col>
             </v-container>
           </v-card-text>
         </v-card>
        </v-col>
      </v-row>


  </v-container>
</template>

<script>
import { computed, ref } from 'vue';
import { useJokesStore } from '../store';
export default {
  setup() {
    const favoriteJokesStore = useJokesStore(); // crio uma instância da useJokesStore, para acessar a Store
    const favorites = ref (favoriteJokesStore.favoriteJokes);
    const search = ref (''); //deixa a variável reativa

    const filteredJokes = (computed (() => { //??????
      if(search.value){
        return favorites.value.filter(j => j.value.includes(search.value))
      }
      return favorites.value
    }))

    return {
      search,
      filteredJokes,
    };
  }
 }
</script>
