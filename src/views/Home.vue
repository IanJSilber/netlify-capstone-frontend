<template>
  <div class="home">
    <div v-if="$parent.isLoggedIn()">
      <div v-for="position in positions" :key="position.id">
        <h1>Asset: {{ position.asset }}</h1>
        <h4>Amount: {{ position.amount }}</h4>
        <form method="dialog">
          <h2>Position Info:</h2>
          <p>
            Asset:
            <input type="text" v-model="currentPosition.asset" />
          </p>
          <p>
            Amount:
            <input type="text" v-model="currentPosition.amount" />
          </p>
          <button v-on:click="updatePosition(currentPosition)">Update Position</button>
          <button v-on:click="deletePosition(currentPosition)">Delete Position</button>
        </form>
        <router-link v-bind:to="`/positions/${position.id}`">More Info</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      positions: [],
      currentPosition: {},
    };
  },
  created: function () {
    this.indexPositions();
  },
  methods: {
    indexPositions: function () {
      axios
        .get("http://localhost:3000/positions")
        .then((response) => {
          this.positions = response.data;
          console.log("Successfully indexed positions!", this.positions);
        })
        .catch((error) => console.log(error.response));
    },
  },
  updatePosition: function (position) {
    axios
      .patch("http://localhost:3000/positions/" + position.id, position)
      .then((response) => {
        console.log("Successfully updated position!", response.data);
        this.$router.push("/success");
      })
      .catch((error) => console.log(error.response));
  },
  deletePosition: function (position) {
    axios.delete("http://localhost:3000/positions/" + position.id).then((response) => {
      console.log("DELETED", response.data);
      this.$router.push("/success");
    });
  },
};
</script>
