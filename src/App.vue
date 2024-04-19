<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Chuck Norris Jokes</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="(menu, index) in routes" :key="index" :to="menu.route" :title="menu.name">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <v-container>
        <v-row>
          <router-view />
          </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      routes: [
        { route: '/', name: 'Home', icon: "mdi-home" },
        { route: '/favorites', name: 'Favorites', icon: "mdi-star" },
        { route: '/home/search', name: 'Search'}
      ],
    };
  },
};
</script>
