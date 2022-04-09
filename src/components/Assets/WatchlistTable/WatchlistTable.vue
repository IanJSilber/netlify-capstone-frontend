<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">
        <div
          class="col-auto"
          href="#"
          data-toggle="modal"
          data-target="#createModal"
        >
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
        <table
          class="table table-bordered"
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>24hr % Change</th>
              <th>7d % Change</th>
              <th>30d % Change</th>
            </tr>
          </thead>

          <tableOfAssets
            v-for="asset in assets"
            :key="asset.id"
            :asset="asset"
            @delete="deleteAsset"
            @show="showAsset"
          />
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TableOfAssets from "./TableOfAssets.vue";
export default {
  props: {
    assets: {
      type: Array,
      required: true
    }
  },
  components: {
    tableOfAssets: TableOfAssets
  },
  methods: {
    deleteAsset: function (asset) {
      this.$emit("delete", asset);
    },
    showAsset: function (asset) {
      this.$emit("show", asset);
    }
  }
};
</script>
