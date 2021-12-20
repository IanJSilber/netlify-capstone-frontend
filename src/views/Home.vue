<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div class="home">
        <div class="container-fluid">
          <h1 class="h3 mb-2 text-gray-800">Top 15 cryptocurrencies</h1>
          <p class="mb-4">Top ranked cryptocurrencies by market capitalization.</p>
          <div class="card shadow mb-4">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Position Symbol</th>
                      <th>Price</th>
                      <th>24hr % change</th>
                      <th>7D % change</th>
                      <th>30D % change</th>
                    </tr>
                  </thead>

                  <tr v-for="coin in coins" :key="coin.id">
                    <td>{{ coin.rank }}</td>
                    <td>{{ coin.name }}</td>
                    <td>{{ coin.symbol }}</td>
                    <td>${{ Intl.NumberFormat("en-US").format(coin.price) }}</td>
                    <td>%{{ coin.percent_change_24hr }}</td>
                    <td>%{{ coin.percent_change_7d }}</td>
                    <td>%{{ coin.percent_change_30d }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      news: [],
      coins: [],
    };
  },
  created: function () {
    axios.get("news").then((response) => {
      console.log("success", response.data);
      this.news = response.data.articles;
    });
    axios.get("top-coins").then((response) => {
      console.log("success", response.data);
      this.coins = response.data;
    });
  },
};
</script>
