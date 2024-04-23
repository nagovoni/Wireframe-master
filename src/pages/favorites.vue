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
import { computed, ref, onMounted} from 'vue';
import { useJokesStore } from '../store';
export default {
  setup() {
    const favoriteJokesStore = useJokesStore(); // crio uma instância da useJokesStore, para acessar a Store
    const favorites = ref (favoriteJokesStore.favoriteJokes);
    const search = ref (''); //deixa a variável reativa
    const selectedCategory= ref ('');
    const categories=ref([]);

    const loadCategories = async () => {
      try {
      const response = await axios.get('https://api.chucknorris.io/jokes/categories');
      categories.value = response.data; // Preencha a matriz de categorias com os dados da API
      } catch (error) {
       console.error('Error fetching categories:', error);
      }
    };

    onMounted(async () => {
      // Carregar categorias ao inicializar o componente
      await loadCategories();
    });

    const load = async ({ done }) => {
      try {
        let apiUrl = 'https://api.chucknorris.io/jokes/random';
        if (selectedCategory.value) {
          apiUrl += `?category=${selectedCategory.value}`;
        }
        const res = await axios.get(apiUrl);
        jokeStore.addJoke(res.data);
        done('ok');
      } catch (error) {
        console.error('Error fetching joke:', error);
      }
    };

    const deleteJoke = (id) => {
      jokeStore.removeJoke(id);
    };

    const toggleFavorite = (joke) => {
      const index = jokeStore.jokes.findIndex((el) => el.id === joke.id);
      jokeStore.jokes[index].isFavorite = !joke.isFavorite;
      jokeStore.addOrRemoveFavorite(joke);
      console.log(jokeStore.favoriteJokes.length);
    };
    const filteredJokes = (computed (() => { //??????
      if(search.value){
        return favorites.value.filter(j => j.value.includes(search.value))
      }
      return favorites.value
    }))
    const toggleCategory = (category) => {
      selectedCategory.value = category;
      // Quando a categoria é alterada, recarregue as piadas
      jokeStore.clearJokes(); // Limpa as piadas atuais
      load({ done: () => {} }); // Carrega piadas com base na nova categoria
    };

    return {
      search,
      selectedCategory,
      load,
      deleteJoke,
      toggleFavorite,
      toggleCategory,
      filteredJokes,
    };
  },
};
</script>
