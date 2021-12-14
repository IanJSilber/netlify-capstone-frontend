import Vue from "vue";
import VueRouter from "vue-router";
import Positions from "../views/Positions.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Watchlists from "../views/Watchlists.vue";
import watchlistShow from "../views/watchlistShow.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/positions", name: "Positions", component: Positions },
  { path: "/", name: "Login", component: Login },
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
