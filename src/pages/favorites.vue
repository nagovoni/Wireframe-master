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
      <div class="text-center">
         <v-menu open-on-hover>
           <template v-slot:activator="{ props }">
              <v-btn rounded="xl" color="primary" v-bind="props" density="compact" icon="mdi-plus"/>
           </template>
           <v-list>
              <v-list-item v-for="category in categories" :key="category" @click="toggleCategory(category)">
                {{ category }}
              </v-list-item>
           </v-list>
         </v-menu>
      </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import { useJokesStore } from '../store';

export default {
  data() {
    return {
      favoriteJokesStore: useJokesStore(),
      favorites: [],
      search: '',
      selectedCategory: '',
      categories: [],
    };
  },
  computed: {
    filteredJokes() {
      if (this.search) {
        return this.favorites.filter(joke => joke.includes(this.search));
      }
      return this.favorites;
    },
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        const response = await axios.get('https://api.chucknorris.io/jokes/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async load({ done }) {
      try {
        let apiUrl = 'https://api.chucknorris.io/jokes/random';
        if (this.selectedCategory) {
          apiUrl += `?category=${this.selectedCategory}`;
        }
        const res = await axios.get(apiUrl);
        this.jokeStore.addJoke(res.data);
        done('ok');
      } catch (error) {
        console.error('Error fetching joke:', error);
      }
    },
    deleteJoke(id) {
      this.jokeStore.removeJoke(id);
    },
    toggleFavorite(joke) {
      const index = this.jokeStore.jokes.findIndex(el => el.id === joke.id);
      this.jokeStore.jokes[index].isFavorite = !joke.isFavorite;
      this.jokeStore.addOrRemoveFavorite(joke);
      console.log(this.jokeStore.favoriteJokes.length);
    },
    toggleCategory(category) {
      this.selectedCategory = category;
      this.jokeStore.clearJokes();
      this.load({ done: () => {} });
    },
  },
};
</script>

