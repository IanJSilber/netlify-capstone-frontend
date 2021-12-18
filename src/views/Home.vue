<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <div id="content">
      <div class="Home">
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

            <!-- <div class="topbar-divider d-none d-sm-block"></div> -->
          </ul>
        </nav>
        <div class="container-fluid">
          <h1 class="h3 mb-2 text-gray-800">Top 15 cryptocurrencies</h1>
          <p class="mb-4">Top ranked cryptocurrencies by market capitalization.</p>
          <div class="card shadow mb-4">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Position Symbol</th>
                      <th>Price</th>
                      <th>24hr % change</th>
                      <th>7D % change</th>
                      <th>30D % change</th>
                    </tr>
                  </thead>

                  <tr v-for="coin in coins" :key="coin.id">
                    <td>{{ coin.rank }}</td>
                    <td>{{ coin.name }}</td>
                    <td>{{ coin.symbol }}</td>
                    <td>${{ coin.price }}</td>
                    <td>%{{ coin.percent_change_24hr }}</td>
                    <td>%{{ coin.percent_change_7d }}</td>
                    <td>%{{ coin.percent_change_30d }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <h1 class="h3 mb-2 text-gray-800">News</h1>
          <p class="mb-4">Catch up on the latest important news.</p>
          <div v-for="news in news" :key="news.id">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">
                  <a target="_blank" v-bind:href="`${news.url}`">{{ news.title }}</a>
                </h6>
              </div>
              <div class="card-body">
                <p>{{ news.description }}</p>
              </div>
            </div>
          </div>
        </div>
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
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      news: [],
      coins: [],
    };
  },
  created: function () {
    axios.get("news").then((response) => {
      console.log("success", response.data);
      this.news = response.data.articles;
    });
    axios.get("top-coins").then((response) => {
      console.log("success", response.data);
      this.coins = response.data;
    });
  },
};
</script>
