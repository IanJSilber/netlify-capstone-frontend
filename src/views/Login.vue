<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <!-- Topbar -->

      <!-- End of Topbar -->

      <!-- Begin Page Content -->
      <div class="Login">
        <div class="container">
          <!-- Outer Row -->
          <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
              <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                  <!-- Nested Row within Card Body -->
                  <div class="row">
                    <img
                      class="col-lg-6 d-none d-lg-block"
                      src="https://cdn.pixabay.com/photo/2021/04/30/16/46/bitcoin-icon-6219383_960_720.png"
                    />
                    <div class="col-lg-6">
                      <div class="p-5">
                        <div class="text-center">
                          <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form class="user" v-on:submit.prevent="submit()">
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              v-model="newSessionParams.email"
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="password"
                              class="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              v-model="newSessionParams.password"
                            />
                          </div>
                          <input class="btn btn-primary btn-user btn-block" type="submit" value="login" />
                        </form>
                        <hr />
                        <!-- <div class="text-center">
                          <a class="small" href="forgot-password.html">Forgot Password?</a>
                        </div> -->
                        <div class="text-center">
                          <router-link class="small" to="/signup">Create an Account!</router-link>
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
      <!-- /.container-fluid -->
    </div>
    <!-- End of Main Content -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      errors: [],
      newSessionParams: {},
    };
  },
  methods: {
    submit: function () {
      axios
        .post("sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$parent.flashMessage = "You Successfully logged in!";
          this.$router.push("/positions");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
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
