<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <!-- Main Content -->
    <div id="content">
      <div v-if="$parent.isLoggedIn()">
        <div class="positions">
          <!-- Topbar -->
          <!-- Begin Page Content -->
          <div class="container-fluid">
            <!-- status header found ../components/Positions/StatusHeader.vue -->
            <statusHeader :totalPnl="totalPnl" :lamboPnL="lamboPnL" />
            <!-- Beginning of Line Chart from '../components/Positions/LineChart.vue' -->
            <div class="row">
              <div class="col-xl-12 col-md-6 mb-4">
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <div
                      class="text-m font-weight-bold text-primary text-uppercase mb-1"
                    >
                      <h4 class="m-0 font-weight-bold text-primary">
                        Your Portfolio
                      </h4>
                      <h6 class="m-0 font-weight-bold text-primary">
                        ${{ Intl.NumberFormat("en-US").format(totalValue) }} or
                        {{ totalLamboValue }} Lambos
                        <!-- display lambo value :) -->
                      </h6>
                    </div>
                  </div>
                  <div class="card-body">
                    <h3>Portfolio perfomance over the past 30 days</h3>

                    <lineChart :positions="positions" />

                    <h4 v-if="this.totalPnl < 0">Yikes, looks rough</h4>
                    <h4 v-if="this.totalPnl >= 0">Nice!</h4>
                  </div>
                </div>
              </div>
            </div>
            <!-- End of Line Chart -->
            <!--  -->
            <div class="row">
              <!-- Positions table from ../components/Positions/PositionsTable.vue-->
              <positionsTable
                :positions="positions"
                @show="showPosition(position)"
              />
              <!-- Beginning of Diversification Doughnut Chart from '../components/DoughnutChart.vue' -->
              <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">
                  <!-- Card Header - Dropdown -->
                  <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">
                      Diversification
                    </h6>
                  </div>
                  <!-- Card Body -->
                  <div class="card-body">
                    <h3>Diversification</h3>

                    <doughnutChart
                      :positions="positions"
                      :totalValue="totalValue"
                    />

                    <hr />
                    Please tell me you're at least well diversified. you are
                    right? right?
                  </div>
                </div>
              </div>
              <!-- End of Doughnut Chart -->
            </div>
          </div>
          <!--  -->
          <!-- Create Position Modal from ../components/Positions/CreateModal.vue-->
          <createModal :errors="errors" @create="createPosition" />
          <!-- edit modal from ../components/Positions/EditModal.vue -->
          <editModal
            :errors="errors"
            :currentPosition="currentPosition"
            @delete="destroyPosition"
            @update="updatePosition"
          />
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "@/components/Positions/LineChart";
import DoughnutChart from "@/components/Positions/DoughnutChart";
import StatusHeader from "@/components/Positions/StatusHeader";
import EditModal from "@/components/Positions/EditModal";
import CreateModal from "@/components/Positions/CreateModal";
import PositionsTable from "@/components/Positions/PositionsTable.vue";

export default {
  data: () => ({
    positions: [],
    errors: [],
    user: {},
    totalValue: 0,
    totalPnl: 0,
    lambo: 517770,
    totalLamboValue: 0,
    lamboPnL: 0,
    totalPnl30Days: 0.0
  }),
  components: {
    createModal: CreateModal,
    editModal: EditModal,
    statusHeader: StatusHeader,
    lineChart: LineChart,
    doughnutChart: DoughnutChart,
    positionsTable: PositionsTable
  },
  mounted: function () {
    axios
      .get("https://dry-temple-69566.herokuapp.com/positions")
      .then((response) => {
        this.positions = response.data;
        for (let i = 0; i < this.positions.length; ++i) {
          // get the totalValue, totalPnl, and totalPnl30Days by going through each position returned from index positions
          this.totalValue += this.positions[i].position_value;
          this.totalPnl += this.positions[i].pnl_dollars;
          this.totalPnl30Days += this.positions[i].pnl_30_days;
        }
        this.totalLamboValue = parseFloat(this.totalValue / this.lambo).toFixed(
          2
        ); // lambo math
        this.lamboPnL = parseFloat(this.totalPnl / this.lambo).toFixed(5); // lambo pnl math
        console.log("Successfully indexed positions!", this.positions);
      })
      .catch((error) => console.log(error.response));
  },
  methods: {
    reloadPage: function () {
      window.location.reload();
    },
    showPosition: function (position) {
      console.log(position);
      this.currentPosition = position;
    },
    createPosition: function (newPositionParams) {
      axios
        .post(
          "https://dry-temple-69566.herokuapp.com/positions",
          newPositionParams
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
      this.reloadPage();
    },
    updatePosition: function (currentPosition) {
      axios
        .patch(
          "https://dry-temple-69566.herokuapp.com/positions/" +
            currentPosition.id,
          currentPosition
        )
        .then((response) => {
          console.log("success", response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyPosition: function (currentPosition) {
      axios
        .delete(
          "https://dry-temple-69566.herokuapp.com/positions/" +
            currentPosition.id
        )
        .then((response) => {
          console.log("Sucess!", response.data);
          var index = this.positions.indexOf(currentPosition);
          this.positions.splice(index, 1);
          this.$emit("updatedPositions");
        });
    }
  }
};
</script>
