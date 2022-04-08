<template>
  <div
    class="modal fade"
    id="createModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create a new position!</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <div class="modal-body">
          Input the symbol and amount below to add a position to your portfolio (leave purchase price blank for current
          price)
          <hr />
          <form class="user">
            <div class="modal-body">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div class="form-group row">
                <div class="col-12">
                  <input
                    type="text"
                    class="form-control form-control-user"
                    placeholder="Symbol"
                    v-model="newPositionParams.symbol"
                  />
                </div>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-user"
                  placeholder="Amount"
                  v-model="newPositionParams.amount"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <button
                class="btn btn-primary" data-dismiss="modal"
                v-on:click="onCreateClick(newPositionParams)"
              >Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
    }
  },
  data: () => ({
    newPositionParams: { symbol: "", amount: 0.0 },
  }),
  methods: {
    onCreateClick: function(newPositionParams) {
      console.log(newPositionParams)
      this.$emit("create", newPositionParams)
    }
  },
};
</script>
