<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      totalValue: 0.0,
      totalPnl24Hours: 0.0,
      totalPnl7Days: 0.0,
      totalPnl30Days: 0.0,
      chartData: {
        labels: ["30 Days", "7 Days", "Current"],
        datasets: [
          {
            label: "30 Day chart",
            data: [1, 2, 3, 4],
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
    };
  },
  mounted: async function () {
    await this.renderChart(this.chartData, this.options);
  },
};
</script>
