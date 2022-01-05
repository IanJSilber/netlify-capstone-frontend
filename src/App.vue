<template>
  <div id="app">
    <div id="wrapper">
      <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center">
          <div class="sidebar-brand-text mx-3">
            <img src="./assets/logo.png" style="width: 35px; height: 35px" />
            CryptoGRAPHer
          </div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
          <router-link class="nav-link" to="/">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i class="fas fa-fw fa-cog"></i>
            <span>Login & Signup</span>
          </a>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Login Screens:</h6>
              <router-link class="collapse-item" to="/login">Login</router-link>
              <router-link class="collapse-item" to="/signup">Signup</router-link>
            </div>
          </div>
        </li>

        <!-- Nav Item - Utilities Collapse Menu -->

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Heading -->
        <div class="sidebar-heading">Portfolio</div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
          <router-link class="nav-link" to="/positions">
            <i class="fas fa-fw fa-folder"></i>
            <span>Positions</span>
          </router-link>
          <router-link class="nav-link" to="/watchlists">
            <i class="fas fa-fw fa-chart-area"></i>
            <span>Watchlists</span>
          </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block" />
      </ul>
      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
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
              <div v-if="isNavbarLoggedIn()" v-on="indexUser()">
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
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small"></span>
                    <span class="mr-2 d-none d-lg-inline text-gray-600" style="font-size: md">
                      {{ this.currentUserName }}
                    </span>
                    <i class="fas fa-user-circle fa-3x"></i>
                  </a>
                  <!-- Dropdown - User Information -->
                  <div
                    class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
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
                        <div class="modal-body">
                          Select "Logout" below if you are ready to end your current session.
                        </div>
                        <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                          <button
                            class="btn btn-primary"
                            type="button"
                            data-dismiss="modal"
                            v-on:click="logout(), reloadPage()"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
              <div v-if="!isNavbarLoggedIn()">
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
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small"></span>
                    <i class="fas fa-plus-circle fa-3x" style="color: #1cc88a"></i>
                  </a>
                  <!-- Dropdown - User Information -->
                  <div
                    class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <router-link class="dropdown-item" to="/login">
                      <i class="fas fa-sign-in-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Login
                    </router-link>
                    <router-link class="dropdown-item" to="/signup">
                      <i class="fas fa-user-plus fa-sm fa-fw mr-2 text-gray-400"></i>
                      Signup
                    </router-link>
                  </div>
                </li>
              </div>
            </ul>
          </nav>
          <div id="content">
            <router-view />

            <!-- Page Wrapper -->
          </div>
        </div>
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; CryptoGRAPHer 2021</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      flashMessage: "",
      currentUserName: {},
    };
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    indexUser() {
      axios.get("https://dry-temple-69566.herokuapp.com/users").then((response) => {
        console.log("success name", response.data);
        this.currentUserName = response.data.name;
      });
    },
    isNavbarLoggedIn: function () {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    isLoggedIn: function () {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        this.$router.push("/login");
        return false;
      }
    },
    logout: function () {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      if (this.$route !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>
