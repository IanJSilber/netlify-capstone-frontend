<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div class="positions">
        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <!-- Sidebar Toggle (Topbar) -->
          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Search -->
          <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <!-- Nav Item - Search Dropdown (Visible Only XS) -->
            <li class="nav-item dropdown no-arrow d-sm-none">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="searchDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-search fa-fw"></i>
              </a>
              <!-- Dropdown - Messages -->
              <div
                class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form class="form-inline mr-auto w-100 navbar-search">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-primary" type="button">
                        <i class="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ user.name }}</span>
                <img class="img-profile rounded-circle" src="img/undraw_profile.svg" />
              </a>
              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#signoutModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
              <div
                class="modal fade"
                id="signoutModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                      <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                      </button>
                    </div>
                    <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div class="modal-footer">
                      <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                      <button class="btn btn-primary" data-dismiss="modal" v-on:click="logout()">Logout</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <!-- End of Topbar -->
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <!-- DataTales Example -->
          <h1 class="h3 mb-2 text-gray-800">Tables</h1>
          <p class="mb-4">
            DataTables is a third party plugin that is used to generate the demo table below. For more information about
            DataTables, please visit the
            <a target="_blank" href="https://datatables.net">official DataTables documentation</a>
            .
          </p>
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
                        <th>Price</th>
                        <th>Position Value</th>
                        <th>Percent Change %</th>
                      </tr>
                    </thead>

                    <tr v-for="position in positions" :key="position.id">
                      <td>
                        {{ position.asset }}
                        <br />
                        <button class="btn btn-success btn-icon-split" v-on:click="showPosition(position)">
                          Edit position
                        </button>
                      </td>
                      <td>{{ position.amount }}</td>
                      <td>${{ position.price }}</td>
                      <td>${{ position.position_value }}</td>
                      <td>%{{ position.percent_change }}</td>
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
        <dialog id="position-details">
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
        </dialog>
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- End of Main Content -->

    <!-- Footer -->
    <footer class="sticky-footer bg-white">
      <div class="container my-auto">
        <div class="copyright text-center my-auto">
          <span>Copyright &copy; CryptoGRAPHer 2021</span>
        </div>
      </div>
    </footer>
    <!-- End of Footer -->
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
      newPositionParams: { asset: "", amount: 0 },
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
      document.querySelector("#position-details").showModal();
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
      axios.delete("http://localhost:3000/positions/" + position.id).then((response) => {
        console.log("Sucess!", response.data);
        var index = this.positions.indexOf(position);
        this.positions.splice(index, 1);
      });
    },
    logout: function () {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
  },
};
</script>
