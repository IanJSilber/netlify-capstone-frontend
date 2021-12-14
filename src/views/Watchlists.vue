<template>
  <div class="watchlists">
    <div v-if="$parent.isLoggedIn()">
      <div v-for="watchlist in watchlists" :key="watchlist.id">
        <h1>Watchlists:</h1>
        <router-link v-bind:to="`/watchlists/${watchlist.id}`" style="font-size: 32px">
          {{ watchlist.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      watchlists: [],
    };
  },
  created: function () {
    this.indexWatchlists();
  },
  methods: {
    indexWatchlists: function () {
      axios
        .get("watchlists")
        .then((response) => {
          this.watchlists = response.data;
          console.log("Successfully indexed watchlists!", this.watchlists);
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>
