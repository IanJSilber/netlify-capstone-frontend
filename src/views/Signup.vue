<template>
  <div class="signup">
    <div class="card">
      <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label>Name:</label>
          <input type="text" v-model="newUserParams.name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" v-model="newUserParams.email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="newUserParams.password" maxlength="20" />
          <small v-if="newUserParams.password.length == 20" class="text-danger">Max length is 20</small>
          <small v-else-if="newUserParams.password.length < 6" class="text-danger">
            Password must be at least 6 characters
          </small>
        </div>
        <div>
          <label>Password confirmation:</label>
          <input type="password" v-model="newUserParams.password_confirmation" />
          <small v-if="newUserParams.password !== newUserParams.password_confirmation" class="text-danger">
            Password doesn't match
          </small>
        </div>
        <input type="submit" value="Submit" />
        <br />
        <router-link to="/login">Already have an account?</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: { password: "", password_confirmation: "" },
      errors: [],
      newSessionParams: {},
    };
  },
  methods: {
    submit: function () {
      axios
        .post("http://localhost:3000/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
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
