<template>
  <div>
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
              <td>{{ coin.percent_change_24h }}%</td>
              <td>{{ coin.percent_change_7d }}%</td>
              <td>{{ coin.percent_change_30d }}%</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coins: {
      type: Array,
      required: true,
    },
  },
};
</script>
