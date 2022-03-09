<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div id="watchlist-show">
        <div class="container-fluid">
          <router-link to="/watchlists">back</router-link>
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
                    <watchlist-line-chart></watchlist-line-chart>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <div class="text-m font-weight-bold text-primary text-uppercase mb-1">
                <h4 class="m-0 font-weight-bold text-primary">{{ currentWatchlist.name }}</h4>
              </div>
            </div>
          </div>
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">
                <div class="col-auto" href="#" data-toggle="modal" data-target="#createModal">
                  <a class="btn btn-success btn-icon-split">
                    <span class="icon text-white-50">
                      <i class="fas fa-check"></i>
                    </span>
                    <span class="text">Add a new Asset</span>
                  </a>
                </div>
              </h6>
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
                        <button
                          class="btn btn-danger btn-icon-split"
                          style="margin-left: 10px; padding: 5px"
                          v-on:click="destroyAsset(asset)"
                        >
                          Remove
                        </button>
                        <button
                          class="btn btn-success btn-icon-split"
                          style="margin-left: 10px; padding: 5px"
                          v-on:click="showAsset(asset)"
                        >
                          Chart
                        </button>
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
          <div
            class="modal fade"
            id="createModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add something to watch!</h5>
                  <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">x</span>
                  </button>
                </div>
                <div class="modal-body">
                  Input the symbol below to start tracking
                  <hr />
                  <form class="user">
                    <div class="modal-body">
                      <ul>
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                      </ul>
                      <div class="form-group row">
                        <div class="col-12">
                          <input
                            type="text"
                            class="form-control form-control-user"
                            placeholder="Symbol"
                            v-model="newAssetParams.symbol"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                      <button class="btn btn-primary" data-dismiss="modal" v-on:click="createAsset()">Add</button>
                    </div>
                  </form>
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
import WatchlistLineChart from "@/components/WatchlistLineChart";

export default {
  components: {
    WatchlistLineChart,
  },
  data: function () {
    return {
      newAssetParams: { watchlist_id: this.$route.params.id, symbol: "" },
      currentWatchlist: {},
      currentAsset: false,
      assets: [],
      errors: [],
    };
  },
  created: function () {
    this.indexAssets();
    this.showWatchlist();
  },
  methods: {
    reloadPage: function () {
      window.location.reload();
    },
    indexAssets: function () {
      axios
        .get("https://dry-temple-69566.herokuapp.com/assets/" + this.$route.params.id)
        .then((response) => {
          this.assets = response.data;
          console.log("success -assets!", response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    showWatchlist: function () {
      axios
        .get("https://dry-temple-69566.herokuapp.com/watchlists/" + this.$route.params.id)
        .then((response) => {
          this.currentWatchlist = response.data;
          console.log("success -watchlist!", response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    showAsset: function (asset) {
      console.log(asset);
      this.currentAsset = asset;
    },
    createAsset: function () {
      axios
        .post("https://dry-temple-69566.herokuapp.com/assets/", this.newAssetParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
      this.reloadPage();
    },
    destroyAsset: function (asset) {
      axios.delete("https://dry-temple-69566.herokuapp.com/assets/" + asset.id).then((response) => {
        console.log("Sucess!", response.data);
        var index = this.assets.indexOf(asset);
        this.assets.splice(index, 1);
      });
    },
  },
};
</script>
