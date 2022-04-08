<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div v-if="$parent.isLoggedIn()">
        <div id="watchlist-show">
          <div class="container-fluid">
            <router-link to="/">home</router-link>
            <h1 class="h3 mb-2 text-gray-800">Hows it looking?</h1>
            <p class="mb-4">Any buying opportunities out there?</p>

            <div class="row">
              <div class="col-xl-12 col-md-6 mb-4">
                <div class="card shadow mb-4">
                  <div v-if="!currentAsset">
                    <div class="card-header py-3">
                      <h3>Pick an asset to chart!</h3>
                    </div>
                    <div class="card-body">
                      <h1 class="h3 mb-2 text-gray-800" style="text-align: center">Nothing to see here...</h1>
                    </div>
                  </div>
                  <div v-if="currentAsset">
                    <div class="card-header py-3">
                      <h3>{{ currentAsset.symbol }} Performance over 30 days</h3>
                    </div>
                    <div class="card-body">
                      <assetsLineChart :currentAsset="this.currentAsset" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <div class="text-m font-weight-bold text-primary text-uppercase mb-1">
                  <h4 class="m-0 font-weight-bold text-primary">{{ $parent.currentUserName }}'s Watchlist</h4>
                </div>
              </div>
            </div>
            <!-- watchlistTable at @/components/Assets/WatchlistTable.vue -->
            <watchlistTable
              :assets="assets"
              @delete="destroyAsset"
              @show="showAsset"
            />
            <!-- createmodal at @/components/Assets/CreateModal.vue -->
            <createModal />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AssetsLineChart from "../components/Assets/AssetsLineChart.vue";
import CreateModal from "../components/Assets/CreateModal.vue";
import WatchlistTable from "../components/Assets/WatchlistTable/WatchlistTable.vue";



export default {
  data: () => ({
    newAssetParams: { symbol: "" },
    currentAsset: {},
    assets: [],
    errors: [],
  }),
  components: {
    assetsLineChart: AssetsLineChart,
    createModal: CreateModal,
    watchlistTable: WatchlistTable
  },
  created: function () {
    this.indexAssets();
  },
  methods: {
    reloadPage: function () {
      window.location.reload();
    },
    indexAssets: function () {
      axios
        .get("https://dry-temple-69566.herokuapp.com/assets")
        .then((response) => {
          this.assets = response.data;
          console.log("success -assets!", response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    showAsset: function(asset) {
      console.log(asset);
      this.currentAsset = asset;
    },
    destroyAsset: function(asset) {
      axios.delete("https://dry-temple-69566.herokuapp.com/assets/" + asset.id).then((response) => {
        console.log("Sucess!", response.data);
        var index = this.assets.indexOf(asset);
        this.assets.splice(index, 1);
      });
    },
  },
};
</script>
