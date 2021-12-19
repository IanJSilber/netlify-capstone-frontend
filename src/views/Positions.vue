<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div class="positions">
        <!-- Topbar -->
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <!-- DataTales Example -->
          <h1 class="h3 mb-2 text-gray-800">Portfolio status: not good</h1>
          <p class="mb-4">Oops looks like all your positions are underwater!</p>
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-m font-weight-bold text-primary text-uppercase mb-1">Add a Position!</div>
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
                          <h5 class="modal-title" id="exampleModalLabel">Create a new position!</h5>
                          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">x</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          Input the symbol and amount below to add a position to your portfolio
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
                                    v-model="newPositionParams.asset"
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
                              <button class="btn btn-primary" data-dismiss="modal" v-on:click="createPosition()">
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
          <br />
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Your Portfolio</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <div v-if="$parent.isLoggedIn()">
                  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Quantity</th>
                        <th>Purchase Price</th>
                        <th>Price</th>
                        <th>Position Value</th>
                        <th>% PnL</th>
                        <th>24hr % Change</th>
                      </tr>
                    </thead>

                    <tr v-for="position in positions" :key="position.id">
                      <td>
                        {{ position.asset }}
                        <br />
                        <button
                          class="btn btn-success btn-icon-split"
                          href="#"
                          data-toggle="modal"
                          data-target="#editModal"
                          v-on:click="showPosition(position)"
                        >
                          Edit position
                        </button>
                      </td>
                      <td>{{ position.amount }}</td>
                      <td>${{ Intl.NumberFormat("en-US").format(position.purchase_price) }}</td>
                      <td>${{ Intl.NumberFormat("en-US").format(position.price) }}</td>
                      <td>${{ Intl.NumberFormat("en-US").format(position.position_value) }}</td>
                      <td>{{ ((position.price - position.purchase_price) / position.purchase_price) * 100 }}%</td>
                      <td>{{ position.percent_change }}%</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
          <i class="fas fa-angle-up"></i>
        </a>
        <!-- <dialog id="position-details">
          <form class="user">
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
        </dialog> -->
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
                        <input
                          type="text"
                          class="form-control form-control-user"
                          placeholder="Amount"
                          v-model="currentPosition.amount"
                        />
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
                      <button class="btn btn-primary" data-dismiss="modal" v-on:click="updatePosition(currentPosition)">
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
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- End of Main Content -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      positions: [],
      errors: [],
      user: {},
      currentPosition: {},
      newPositionParams: { asset: "", amount: "" },
      totalValue: 0,
    };
  },
  created: function () {
    this.indexPositions();
    this.showUsers();
  },
  methods: {
    indexPositions: function () {
      axios
        .get("positions")
        .then((response) => {
          this.positions = response.data;
          for (let i = 0; i < this.positions.length; ++i) {
            this.totalValue += parseInt(this.positions[i].price);
          }
          console.log("Successfully indexed positions!", this.positions);
        })
        .catch((error) => console.log(error.response));
    },
    showUsers: function () {
      axios.get("users").then((response) => {
        this.user = response.data;
        console.log("success", response.data);
      });
    },
    showPosition: function (position) {
      console.log(position);
      this.currentPosition = position;
    },
    updatePosition: function (position) {
      axios.patch("http://localhost:3000/positions/" + position.id, position).then((response) => {
        console.log("success", response.data);
      });
    },
    createPosition: function () {
      axios
        .post("positions", this.newPositionParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyPosition: function (position) {
      axios.delete("positions/" + position.id).then((response) => {
        console.log("Sucess!", response.data);
        var index = this.positions.indexOf(position);
        this.positions.splice(index, 1);
      });
    },
  },
};
</script>
