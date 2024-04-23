
<template>
  <v-container>
    <v-infinite-scroll height="600px" mode="manual" @load="load">
      <v-card-text class="text-h5 py-2" v-if="jokeStore?.jokes?.length > 0" >
         <v-container>
               <v-col class="mx-auto my-3" elevation="16" max-width="344" xs="12" sm="6" md="4" lg="3" xl="2"
                v-for="joke in jokeStore.jokes" :key="joke.id">
                 <v-card>
                   <v-card-text>
                    {{ joke.value }}
                   </v-card-text>
                   <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn icon small color="red" @click="deleteJoke(joke.id)">
                      <v-icon>mdi-delete</v-icon>
                     </v-btn>
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
  <div class="text-center">
    <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          rounded="xl"
          color="primary"
          v-bind="props"
          density="compact"
          icon="mdi-plus"
        >
        </v-btn>
      </template>

      <v-list>
          <v-list-item v-for="category in categories" :key="category" @click="toggleCategory(category)">
            {{ category }}
          </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import axios from 'axios';
import { useJokesStore } from '../store'


export default {
  data() {
    return {
      isFavorite: false,
      jokeStore: useJokesStore(),
      selectedCategory: '',
      categories: [],
    };
  },
  async created() {
    // Carregar categorias ao inicializar o componente
    await this.loadCategories();
  },

  methods: {

  async loadCategories() {
  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/categories');
    this.categories = response.data; // Preencha a matriz de categorias com os dados da API
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

toggleFavorite(joke){
  const index = this.jokeStore.jokes.findIndex(el => el.id === joke.id)
  this.jokeStore.jokes[index].isFavorite = !joke.isFavorite;
  this.jokeStore.addOrRemoveFavorite(joke)
  console.log(this.jokeStore.favoriteJokes.length)
},
toggleCategory(category) {
  this.selectedCategory = category;
  // Quando a categoria é alterada, recarregue as piadas
  this.jokeStore.clearJokes(); // Limpa as piadas atuais
  this.load({ done: () => {} }); // Carrega piadas com base na nova categoria
},
},
};
</script>
