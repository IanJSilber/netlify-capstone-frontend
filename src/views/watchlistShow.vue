<template>
  <div id="watchlist-show">
    <h1>{{ currentWatchlist.name }}</h1>
    <div v-for="asset in assets" :key="asset.id">
      <h3>======================</h3>
      <h3>Asset: {{ asset.name }}</h3>
      <h3>Price: {{ asset.price }}</h3>
      <button v-on:click="showAsset(asset)">Edit asset</button>
    </div>
    <dialog id="asset-details">
      <form method="dialog">
        <p>
          Name:
          <input type="text" v-model="currentAsset.name" />
        </p>
        <button v-on:click="updatePosition(currentPosition)">Update</button>
        <button v-on:click="destroyPosition(currentPosition)">Delete</button>
        <button>Close</button>
      </form>
    </dialog>
    <h3>======================</h3>
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
    axios.get("watchlists/" + this.$route.params.id).then((response) => {
      this.currentWatchlist = response.data;
      console.log("success!", response.data);
    });
    axios.get("assets/" + this.$route.params.id).then((response) => {
      this.assets = response.data;
      console.log("success!", response.data);
    });
  },
  methods: {
    showAsset: function (asset) {
      console.log(asset);
      this.currentAsset = asset;
      document.querySelector("#asset-details").showModal();
    },
    updateAsset: function (asset) {
      axios.patch("http://localhost:3000/assets/" + asset.id, asset).then((response) => {
        console.log("success", response.data);
      });
    },
    destroyAsset: function (asset) {
      axios.delete("http://localhost:3000/assets/" + asset.id).then((response) => {
        console.log("Sucess!", response.data);
        var index = this.assets.indexOf(asset);
        this.assets.splice(index, 1);
      });
    },
  },
};
</script>
