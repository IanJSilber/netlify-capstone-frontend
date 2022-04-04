<template>
  <div>
    <h1 class="h3 mb-2 text-gray-800">News</h1>
    <p class="mb-4">Catch up on the latest important news.</p>
    <div v-for="news in news" :key="news.id">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">
            <a target="_blank" v-bind:href="`${news.url}`">{{ news.title }}</a>
          </h6>
        </div>
        <div class="card-body">
          <p>{{ news.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Array,
      required: true,
    },
  },
};
</script>
