<template>
  <div class="home">
    <div v-if="$parent.isLoggedIn()">
      <div v-for="position in positions" :key="position.id">
        <h1>Asset: {{ position.asset }}</h1>
        <h4>Amount: {{ position.amount }}</h4>
        <h4>Price: {{ position.price }}</h4>
        <h4>Position value: {{ position.position_value }}</h4>
        <button v-on:click="showPosition(position)">Edit position</button>
      </div>
      <dialog id="position-details">
        <form method="dialog">
          <p>
            Name:
            <input type="text" v-model="currentPosition.asset" />
          </p>
          <p>
            Asset:
            <input type="text" v-model="currentPosition.amount" />
          </p>
          <button v-on:click="updatePosition(currentPosition)">Update</button>
          <button v-on:click="destroyPosition(currentPosition)">Delete</button>
          <button>Close</button>
        </form>
      </dialog>
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
      totalValue: 0,
    };
  },
  created: function () {
    this.indexPositions();
  },
  methods: {
    indexPositions: function () {
      axios
        .get("positions")
        .then((response) => {
          this.positions = response.data;
          console.log("Successfully indexed positions!", this.positions);
        })
        .catch((error) => console.log(error.response));
    },
    showPosition: function (position) {
      console.log(position);
      this.currentPosition = position;
      document.querySelector("#position-details").showModal();
    },
    updatePosition: function (position) {
      axios.patch("http://localhost:3000/positions/" + position.id, position).then((response) => {
        console.log("success", response.data);
        this.accountValue;
      });
    },
    destroyPosition: function (position) {
      axios.delete("http://localhost:3000/positions/" + position.id).then((response) => {
        console.log("Sucess!", response.data);
        var index = this.positions.indexOf(position);
        this.positions.splice(index, 1);
      });
    },
    accountValue: function () {
      let sum = 0;
      for (let i = 0; i < this.positions.length; i++) {
        sum += this.positions[i].position_value;
      }
      this.totalValue = sum;
    },
  },
};
</script>
