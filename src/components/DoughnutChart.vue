<script defer>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    positions: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    totalValue: 0.0,
    chartData: {
      labels: [],
      datasets: [
        {
          borderWidth: 1,
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(200, 75, 90, 1)",
            "rgba(43, 102, 248, 1)",
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(200, 75, 90, 0.2)",
            "rgba(43, 102, 248, 0.2)",
          ],
          data: [],
        },
      ],
    },
    options: {
      legend: {
        display: true,
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted: function () {
    for (let i = 0; i < this.positions.length; ++i) {
      this.chartData.labels.push(this.positions[i].symbol);
      this.totalValue += this.positions[i].position_value;
    }
    for (let i = 0; i < this.positions.length; ++i) {
      this.chartData.datasets[0].data.push(
        parseFloat((this.positions[i].position_value / this.totalValue) * 100).toFixed(2)
      );
    }
    this.renderChart(this.chartData, this.options);
  },
};
</script>
