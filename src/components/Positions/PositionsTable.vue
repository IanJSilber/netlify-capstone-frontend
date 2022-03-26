<template>
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
      <!-- outline of actual table -->
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
              <!-- Assigning values for various cells -->
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
</template>
