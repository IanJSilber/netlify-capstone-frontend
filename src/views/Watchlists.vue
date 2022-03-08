<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div class="watchlists">
        <div class="container-fluid">
          <div class="col-auto" href="#" data-toggle="modal" data-target="#createModal">
            <a class="btn btn-success btn-icon-split">
              <span class="icon text-white-50">
                <i class="fas fa-check"></i>
              </span>
              <span class="text">Create Watchlist</span>
            </a>
          </div>
          <div class="col-xl-3 col-md-6 mb-4">
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
                        <button class="btn btn-primary" data-dismiss="modal" v-on:click="createWatchlist()">Add</button>
                      </div>
                    </form>
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
                      <a
                        style="text-align: right"
                        class="btn btn-danger"
                        href="#"
                        v-on:click="destroyWatchlist(watchlist)"
                      >
                        <span class="icon text-white-50"><i class="fas fa-times"></i></span>
                      </a>
                      <router-link
                        v-bind:to="`/watchlists/${watchlist.id}`"
                        class="btn btn-success btn-icon-split"
                        style="margin-left: 10px"
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-check"></i>
                        </span>
                        <span class="text">{{ watchlist.name }}</span>
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
        .get("https://dry-temple-69566.herokuapp.com/watchlists")
        .then((response) => {
          this.watchlists = response.data;
          console.log("Successfully indexed watchlists!", this.watchlists);
        })
        .catch((error) => console.log(error.response));
    },
    createWatchlist: function () {
      axios
        .post("https://dry-temple-69566.herokuapp.com/watchlists", this.newWatchlistParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    showUsers: function () {
      axios
        .get("https://dry-temple-69566.herokuapp.com/users")
        .then((response) => {
          this.user = response.data;
          console.log("success", response.data);
        })
        .catch((error) => console.log(error.response));
    },
    destroyWatchlist: function (watchlist) {
      axios.delete("https://dry-temple-69566.herokuapp.com/watchlists/" + watchlist.id).then((response) => {
        console.log("Sucess!", response.data);
        var index = this.watchlists.indexOf(watchlist);
        this.watchlists.splice(index, 1);
      });
    },
  },
};
</script>
