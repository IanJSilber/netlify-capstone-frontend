import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Positions from "../views/Positions.vue";
import Watchlists from "../views/Watchlists.vue";
import watchlistShow from "../views/watchlistShow.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/positions", name: "Positions", component: Positions },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/watchlists", name: "Watchlists", component: Watchlists },
  { path: "/watchlists/:id", name: "WatchlistShow", component: watchlistShow },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
