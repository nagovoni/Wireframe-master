<template>
  <v-container>
    <v-card class="mx-auto" max-width="500" hover>
      <v-card-text>
        <v-card>
          <v-card-text>
         <v-text-field v-model="searchTerm" label="Search term" clearable @keyup.enter="filter"></v-text-field>
             <v-btn color="primary" @click="filter">Search</v-btn>
           </v-card-text>
           <div class="text-center">
            <v-progress-circular :model-value="value" :rotate="360" :size="100" :width="15" color="black"
              v-if="loading" :indeterminate="true"></v-progress-circular>
           </div>
        </v-card>
         <v-container>
               <v-col v-for="(joke, index) in favorites" :key="index">
                 <v-card>
                   <v-card-text>
                    {{ joke.value }}
                   </v-card-text>
                 </v-card>
               </v-col>
           </v-container>
      </v-card-text>
    </v-card>
 </v-container>

 <v-container>
    <v-row v-if="filtered.length > 0">
      <v-col v-for="joke in filtered" :key="joke.id" cols="12">
        <v-card>
          <v-card-text>{{ joke.value }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <p>No jokes found.</p>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import { computed} from 'vue';
import { useJokesStore } from '../store';

export default {
  setup() {
    const favoriteJokesStore = useJokesStore();
    const filteredJokesStore = useJokesStore();

    const favorites = computed(() => favoriteJokesStore.favoriteJokes);
    const filtered = computed(() => filteredJokesStore.filteredJokes);

    const addOrRemoveFavorite = (joke) => {
      favoriteJokesStore.addOrRemoveFavorite(joke);
    };

    const filterJokes = (term) => {
      filteredJokesStore.filterJokes(term);
    };

    return {
      favorites,
      addOrRemoveFavorite,
      filtered,
      filterJokes
    };
  }
}

</script>
