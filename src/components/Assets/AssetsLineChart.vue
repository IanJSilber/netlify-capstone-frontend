<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    currentAsset: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    currentValue: 0.0,
    totalPnl24Hours: 0.0,
    totalPnl7Days: 0.0,
    totalPnl30Days: 0.0,
    chartData: {
      labels: ["30 Days", "7 Days", "Current"],
      datasets: [
        {
          label: "30 Day chart",
          data: [],
          fill: false,
          borderColor: "#2554FF",
          backgroundColor: "#2554FF",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
            gridLines: {
              display: true,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
      legend: {
        display: true,
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  watch: {
    currentAsset: function (currentAsset) {
      console.log("this is watch", currentAsset);
      console.log("this is price", currentAsset.percent_change_7d);
      this.currentValue = currentAsset.price;
      this.totalPnl7Days = currentAsset.price * (currentAsset.percent_change_7d / 100);
      this.totalPnl3Days = currentAsset.price * (currentAsset.percent_change_30d / 100);
      console.log(this.totalPnl7Days);
      if (this.totalPnl7Days < 0) {
        this.totalPnl7Days = this.currentValue - this.totalPnl7Days;
      } else {
        this.totalPnl7Days = this.currentValue + Math.abs(this.totalPnl7Days);
      }
      if (this.totalPnl30Days < 0) {
        this.totalPnl30Days = this.currentValue - this.totalPnl30Days;
      } else {
        this.totalPnl30Days = this.currentValue + Math.abs(this.totalPnl30Days);
      }
      this.chartData.datasets.data = [];
      this.chartData.datasets[0].data.push(this.totalPnl30Days);
      this.chartData.datasets[0].data.push(this.totalPnl7Days);
      this.chartData.datasets[0].data.push(this.currentValue);
      this.renderChart(this.chartData, this.options);
    },
  },
};
</script>
