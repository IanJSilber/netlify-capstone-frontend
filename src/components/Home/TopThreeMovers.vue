<template>
<div>
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
</div>
</template>

<script>
export default {
  props: {
    sortedCoins: {
      type: Array,
      required: true,
    },
  },
};
</script>
