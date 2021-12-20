<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div id="watchlist-show">
        <div class="container-fluid">
          <h1 class="h3 mb-2 text-gray-800">Hows it looking?</h1>
          <p class="mb-4">Any buying opportunities out there?</p>
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">{{ currentWatchlist.name }}</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <div v-if="$parent.isLoggedIn()">
                  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>1hr % Change</th>
                        <th>24hr % Change</th>
                        <th>7d % Change</th>
                        <th>30d % Change</th>
                      </tr>
                    </thead>

                    <tr v-for="asset in assets" :key="asset.id">
                      <td>
                        {{ asset.symbol }}
                        <button class="btn btn-danger btn-icon-split" v-on:click="destroyAsset(asset)">Remove</button>
                      </td>
                      <td>${{ Intl.NumberFormat("en-US").format(asset.price) }}</td>
                      <td>{{ asset.percent_change_1h }}%</td>
                      <td>{{ asset.percent_change_24h }}%</td>
                      <td>{{ asset.percent_change_7d }}%</td>
                      <td>{{ asset.percent_change_30d }}%</td>
                    </tr>
                  </table>
                </div>
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
      currentWatchlist: {},
      currentAsset: {},
      assets: [],
    };
  },
  created: function () {
    this.indexAssets();
    this.showWatchlist();
  },
  methods: {
    indexAssets: function () {
      axios.get("assets/" + this.$route.params.id).then((response) => {
        this.assets = response.data;
        console.log("success -assets!", response.data);
      });
    },
    showWatchlist: function () {
      axios.get("watchlists/" + this.$route.params.id).then((response) => {
        this.currentWatchlist = response.data;
        console.log("success -watchlist!", response.data);
      });
    },
    showAsset: function (asset) {
      console.log(asset);
      this.currentAsset = asset;
      document.querySelector("#asset-details").showModal();
    },
    destroyAsset: function (asset) {
      axios.delete("assets/" + asset.id).then((response) => {
        console.log("Sucess!", response.data);
        var index = this.assets.indexOf(asset);
        this.assets.splice(index, 1);
      });
    },
  },
};
</script>
