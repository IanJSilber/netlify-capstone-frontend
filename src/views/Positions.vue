<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div class="positions">
        <!-- Topbar -->
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <!-- DataTales Example -->
          <div v-if="this.totalPnL < 0">
            <h1 class="h3 mb-2 text-gray-800">Portfolio status: not good</h1>
            <p>You're down -${{ Intl.NumberFormat("en-US").format(totalPnL * -1) }} or {{ lamboPnL }} Lambos</p>
            <p>Oops looks like all your positions are underwater!</p>
          </div>
          <div v-else>
            <h1 class="h3 mb-2 text-gray-800">Portfolio status: Looking good</h1>
            <p>
              You're up ${{ Intl.NumberFormat("en-US").format(totalPnL) }} or {{ lamboPnL }} Lamborghini Aventadors.
              Exciting stuff.
            </p>
          </div>
          <br />
          <div class="row">
            <div class="col-xl-12 col-md-6 mb-4">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <div class="text-m font-weight-bold text-primary text-uppercase mb-1">
                    <h4 class="m-0 font-weight-bold text-primary">Your Portfolio</h4>
                    <h6 class="m-0 font-weight-bold text-primary">
                      ${{ Intl.NumberFormat("en-US").format(totalValue) }} or {{ totalLamboValue }} Lambos
                    </h6>
                  </div>
                </div>
                <div class="card-body">
                  <h3>Portfolio perfomance over the past 30 days</h3>
                  <line-chart></line-chart>

                  <hr />
                  <div v-if="this.totalPnl30Days > this.totalValue">Yikes, looks rough</div>
                  <div v-if="this.totalPnl30Days < this.totalValue">Nice!</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-8 col-lg-7">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <div class="col-auto" href="#" data-toggle="modal" data-target="#createModal">
                    <a class="btn btn-success btn-icon-split">
                      <span class="icon text-white-50">
                        <i class="fas fa-check"></i>
                      </span>
                      <span class="text">Add a new Position</span>
                    </a>
                  </div>
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
                            <th>Current Value</th>
                            <th>$ PnL</th>
                            <th>PnL %</th>
                            <th>24hr % Change</th>
                          </tr>
                        </thead>

                        <tr v-for="position in positions" :key="position.id">
                          <td>
                            {{ position.symbol }}
                            <br />
                            <a
                              class="btn btn-success btn-icon-split"
                              href="#"
                              data-toggle="modal"
                              data-target="#editModal"
                              v-on:click="showPosition(position)"
                            >
                              <span class="icon text-white-50">
                                <i class="fas fa-check"></i>
                              </span>
                              <span class="text">Edit</span>
                            </a>
                          </td>
                          <td>{{ position.amount }}</td>
                          <td>${{ Intl.NumberFormat("en-US").format(position.purchase_price) }}</td>
                          <td>${{ Intl.NumberFormat("en-US").format(position.price) }}</td>
                          <td>${{ Intl.NumberFormat("en-US").format(position.position_value) }}</td>
                          <td>${{ Intl.NumberFormat("en-US").format(position.pnl_dollars) }}</td>
                          <td>{{ position.pnl_percent }}%</td>
                          <td>{{ position.percent_change_24h }}%</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-5">
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Diversification</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  <h3>Diversification</h3>
                  <doughnut-chart></doughnut-chart>
                  <hr />
                  Please tell me you're at least well diversified. you are right? right?
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
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
                    <button class="btn btn-primary" data-dismiss="modal" v-on:click="createPosition(), reloadPage()">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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
                        v-on:click="destroyPosition(currentPosition), reloadPage()"
                      >
                        Delete
                      </button>
                      <button
                        class="btn btn-primary"
                        data-dismiss="modal"
                        v-on:click="updatePosition(currentPosition), reloadPage()"
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
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- End of Main Content -->
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "@/components/LineChart";
import DoughnutChart from "@/components/DoughnutChart";

export default {
  components: {
    LineChart,
    DoughnutChart,
  },
  data: function () {
    return {
      positions: [],
      errors: [],
      user: {},
      currentPosition: {},
      newPositionParams: { symbol: "", amount: 0.0 },
      totalValue: 0,
      totalPnL: 0,
      lambo: 517770,
      totalLamboValue: 0,
      lamboPnL: 0,
      totalPnl30Days: 0.0,
    };
  },
  created: function () {
    this.indexPositions();
    this.showUsers();
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    indexPositions: function () {
      axios
        .get("positions")
        .then((response) => {
          this.positions = response.data;
          for (let i = 0; i < this.positions.length; ++i) {
            this.totalValue += this.positions[i].position_value;
            this.totalPnL += this.positions[i].pnl_dollars;
            this.totalPnl30Days += this.positions[i].pnl_30_days;
          }
          this.totalPnl30Days += this.totalValue;
          this.totalLamboValue = parseFloat(this.totalValue / this.lambo).toFixed(2);
          this.lamboPnL = parseFloat(this.totalPnL / this.lambo).toFixed(5);
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
