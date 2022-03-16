<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div class="home">
        <div class="container-fluid">
          <!--  -->
          <!-- Header -->
          <h1 class="h1 mb-2 text-gray-800">Dashboard</h1>
          <h1 class="h6 mb-2 text-gray-800">Whats going on in the world of crypto</h1>
          <!-- End Header -->
          <!--  -->
          <hr />
          <!--  -->
          <!-- Top 3 by volatility -->
          <h1 class="h3 mb-2 text-gray-800">Top 3 Movers</h1>
          <div class="row">
            <div class="col-xl-4 col-lg-5">
              <div class="card shadow mb-4">
                <div class="card-header py-3" style="background-color: #ffd700">
                  <h6 class="m-0 font-weight-bold" style="color: white">1st Mover</h6>
                </div>
                <div class="card-body">
                  <h3>{{ this.sortedCoins[0].name }}</h3>
                  <h3>{{ this.sortedCoins[0].percent_change_24h }}%</h3>
                  <hr />
                  <p>rank: {{ this.sortedCoins[0].rank }}</p>
                  <p>price: ${{ Intl.NumberFormat("en-US").format(this.sortedCoins[0].price) }}</p>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-5">
              <div class="card shadow mb-4">
                <div class="card-header py-3" style="background-color: #c0c0c0">
                  <h6 class="m-0 font-weight-bold" style="color: white">2nd Mover</h6>
                </div>
                <div class="card-body">
                  <h3>{{ this.sortedCoins[1].name }}</h3>
                  <h3>{{ this.sortedCoins[1].percent_change_24h }}%</h3>
                  <hr />
                  <p>rank: {{ this.sortedCoins[1].rank }}</p>
                  <p>price: ${{ Intl.NumberFormat("en-US").format(this.sortedCoins[1].price) }}</p>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-5">
              <div class="card shadow mb-4">
                <div class="card-header py-3" style="background-color: #cd7f32">
                  <h6 class="m-0 font-weight-bold" style="color: white">3rd Mover</h6>
                </div>
                <div class="card-body">
                  <h3>{{ this.sortedCoins[2].name }}</h3>
                  <h3>{{ this.sortedCoins[2].percent_change_24h }}%</h3>
                  <hr />
                  <p>rank: {{ this.sortedCoins[2].rank }}</p>
                  <p>price: ${{ Intl.NumberFormat("en-US").format(this.sortedCoins[2].price) }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- End of top 3 volatility  -->
          <!--  -->
          <!-- Top 15 cryptos chart -->
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
                    <td>%{{ coin.percent_change_24h }}</td>
                    <td>%{{ coin.percent_change_7d }}</td>
                    <td>%{{ coin.percent_change_30d }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- end of top 15 chart -->
          <!--  -->
          <!-- Top 5 news stories related to crypto -->
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
          <!-- end of news -->
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    news: [],
    coins: [],
    sortedCoins: [],
    coinOne: { percent_change_24h: 0 },
    coinTwo: { percent_change_24h: 0 },
    coinThree: { percent_change_24h: 0 },
  }),
  created: function () {
    this.indexNews();
    this.indexTopCoins();
    // this.sortCoins();
  },
  methods: {
    indexNews() {
      axios.get("https://dry-temple-69566.herokuapp.com/news").then((response) => {
        this.news = response.data["articles"];
        console.log("success news loaded");
      });
    },
    indexTopCoins() {
      axios.get("https://dry-temple-69566.herokuapp.com/top-coins").then((response) => {
        console.log("success coins loaded", response.data);
        this.coins = response.data;
        // must copy the original array using spread operator to prevent it from being mutated
        this.sortedCoins = [...this.coins].sort((a, b) => {
          return Math.abs(b.percent_change_24h) - Math.abs(a.percent_change_24h);
        });
        this.coinOne = this.sortedCoins[0];
        this.coinTwo = this.sortedCoins[1];
        this.coinThree = this.sortedCoins[2];
      });
    },
  },
};
</script>
