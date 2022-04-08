<template>
  <div class="row no-gutters align-items-center">
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit your position!</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="user">
              <div class="modal-body">
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
                <div class="form-group">
                  <input type="text" class="form-control form-control-user" v-model="currentPosition.amount" />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-danger"
                  type="button"
                  data-dismiss="modal"
                  v-on:click="destroyPosition(currentPosition)"
                >
                  Delete
                </button>
                <button
                  class="btn btn-primary"
                  type="button"
                  data-dismiss="modal"
                  v-on:click="updatePosition(currentPosition)"
                >
                  Update
                </button>
                <button class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    currentPosition: {
      type: Object,
      required: true,
    },
    errors: {
      type: Array
    }
  },
  methods: {
    updatePosition: function () {
      axios
        .patch("https://dry-temple-69566.herokuapp.com/positions/" + this.currentPosition.id, this.currentPosition)
        .then((response) => {
          console.log("success", response.data);
          this.$emit("updatedPositions");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyPosition: function (position) {
      axios.delete("https://dry-temple-69566.herokuapp.com/positions/" + position.id).then((response) => {
        console.log("Sucess!", response.data);
        var index = this.positions.indexOf(position);
        this.positions.splice(index, 1);
        this.$emit("updatedPositions");
      });
    },
  },
};
</script>
