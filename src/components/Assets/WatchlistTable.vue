<template>
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
                  v-on:click="this.asset=asset"
                >
                  Remove
                </button>
                <button
                  class="btn btn-success btn-icon-split"
                  style="margin-left: 10px; padding: 5px"
                  v-on:click="this.asset=asset"
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
</template>

<script>
export default {
  data: () => ({
    asset: { symbol: "" }
  }),
  props: {
    assets: {
      type: Array,
      required: true
    },
    showAsset: { type: Function },
    destroyAsset: { type: Function }
  },
  mounted() {
    this.showAsset(this.asset);
    this.destroyAsset(this.asset);
  }
}
</script>
