<template>
  <div>
    <div v-if="this.totalPnl < 0">
      <!-- check if totalPnl is positive or negative, if negative display whats beneath -->
      <h1 class="h3 mb-2 text-gray-800">Portfolio status: not good</h1>
      <p>
        You're down -${{ Intl.NumberFormat("en-US").format(totalPnl * -1) }} or
        {{ lamboPnL }} Lambos
      </p>
      <p>Oops looks like all your positions are underwater!</p>
    </div>
    <div v-else>
      <!-- if positive, display the following -->
      <h1 class="h3 mb-2 text-gray-800">Portfolio status: Looking good</h1>
      <p>
        You're up ${{ Intl.NumberFormat("en-US").format(totalPnl) }} or
        {{ lamboPnL }} Lamborghini Aventadors. Exciting stuff.
      </p>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  props: {
    totalPnl: {
      type: Number,
      required: true
    },
    lamboPnl: {
      type: Number,
      required: true
    }
  }
};
</script>
