<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Login</router-link>
      |
      <router-link to="/signup">Signup</router-link>
      |
      <router-link to="/positions">Positions</router-link>
      |
      <router-link to="/watchlists">Watchlists</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      flashMessage: "",
    };
  },
  created: function () {
    this.isLoggedIn;
  },
  methods: {
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
    },
  },
};
</script>
