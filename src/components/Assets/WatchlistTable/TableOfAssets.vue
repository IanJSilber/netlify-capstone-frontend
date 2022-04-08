<template>
  <tr>
    <td>
      {{ asset.symbol }}
      <button
        class="btn btn-danger btn-icon-split"
        style="margin-left: 10px; padding: 5px"
        v-on:click="onDeleteClick(asset)"
      >
        Delete
      </button>
      <button
        class="btn btn-success btn-icon-split"
        style="margin-left: 10px; padding: 5px"
        v-on:click="onShowClick(asset)"
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
</template>

<script>
export default {
  props: {
    asset: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDeleteClick: function() {
      // console.log(this.asset)
      this.$emit('delete', this.asset);
    },
    onShowClick: function() {
      // console.log(this.asset)
      this.$emit('show', this.asset);
    },
  }
}
</script>
