<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div class="home">
        <div class="container-fluid">
          <!-- Header -->
          <h1 class="h1 mb-2 text-gray-800">Dashboard</h1>
          <h1 class="h6 mb-2 text-gray-800">Whats going on in the world of crypto</h1>
          <hr />
          <!--  -->
          <!-- Top 3 by volatility @/components/Home/TopThreeMovers.vue-->
          <topThreeMovers :sortedCoins="sortedCoins" />
          <!-- Top 15 cryptos chart @/components/Home/TopFifteenMc.vue-->
          <topFifteenMc :coins="coins" />
          <!-- Top 5 crypto news stories @/components/Home/News.vue-->
          <news :news="news" />
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TopThreeMovers from "@/components/Home/TopThreeMovers.vue"
import TopFifteenMc from "@/components/Home/TopFifteenMc.vue"
import News from "@/components/Home/News.vue"


export default {
  data: () => ({
    news: [],
    coins: [],
    sortedCoins: [],
    coinOne: { percent_change_24h: 0 },
    coinTwo: { percent_change_24h: 0 },
    coinThree: { percent_change_24h: 0 },
  }),
  components: {
    topThreeMovers: TopThreeMovers,
    topFifteenMc: TopFifteenMc,
    news: News,
  },
  created: function () {
    this.indexNews();
    this.indexTopCoins();
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
