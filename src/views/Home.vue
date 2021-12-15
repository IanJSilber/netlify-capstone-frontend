<template>
  <div class="Home">
    <div v-for="news in news" :key="news.id">
      <a target="_blank" v-bind:href="`${news.url}`">{{ news.title }}</a>
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      news: [],
    };
  },
  created: function () {
    axios.get("news").then((response) => {
      console.log("success", response.data);
      this.news = response.data.articles;
    });
  },
};
</script>
