<template>
  <div>
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
            <h5 class="modal-title" id="exampleModalLabel">Add something to watch!</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <div class="modal-body">
            Input the symbol below to start tracking
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
                      v-model="newAssetParams.symbol"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <button
                  class="btn btn-primary" data-dismiss="modal"
                  v-on:click="onCreateClick(newAssetParams)"
                >Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    newAssetParams: { symbol: ""},
  }),
  methods: {
    onCreateClick: function(newAssetParams) {
      this.$emit("create", newAssetParams)
    }
  }
}
</script>
