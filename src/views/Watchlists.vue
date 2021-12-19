<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div class="watchlists">
        <div class="container-fluid">
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-m font-weight-bold text-primary text-uppercase mb-1">Add a Watchlist!</div>
                  </div>
                  <div class="col-auto" href="#" data-toggle="modal" data-target="#createModal">
                    <i role="button" class="fas fa-plus-circle fa-2x"></i>
                  </div>
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
                          <h5 class="modal-title" id="exampleModalLabel">Create a new Watchlist!</h5>
                          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">x</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          Enter a name for your new Watchlist
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
                                    placeholder="Enter name here"
                                    v-model="newWatchlistParams.name"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                              <button class="btn btn-primary" data-dismiss="modal" v-on:click="createWatchlist()">
                                Add
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="$parent.isLoggedIn()">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Your Watchlists -</h6>
              </div>
              <div class="card-body">
                <div v-for="watchlist in watchlists" :key="watchlist.id">
                  <div class="card shadow mb-4">
                    <div class="card-header py-3">
                      <router-link v-bind:to="`/watchlists/${watchlist.id}`" style="font-size: 32px">
                        {{ watchlist.name }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      watchlists: [],
      user: {},
      errors: [],
      newWatchlistParams: {},
    };
  },
  created: function () {
    this.indexWatchlists();
    this.showUsers();
  },
  methods: {
    indexWatchlists: function () {
      axios
        .get("watchlists")
        .then((response) => {
          this.watchlists = response.data;
          console.log("Successfully indexed watchlists!", this.watchlists);
        })
        .catch((error) => console.log(error.response));
    },
    createWatchlist: function () {
      axios
        .post("watchlists", this.newWatchlistParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    showUsers: function () {
      axios
        .get("users")
        .then((response) => {
          this.user = response.data;
          console.log("success", response.data);
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>
