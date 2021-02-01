<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  props: {
    labels: {
      required: true,
      type: Array
    },
    data: {
      required: true,
      type: Array
    },
    colors: {
      required: true,
      type: Array,
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: this.colors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    if (this.text.length > 0) {
      this.addPlugin({
        id: 'text-center',
        beforeDraw: (chart) => {
          var width = chart.chart.width;
          var height = chart.chart.height;
          var ctx = chart.chart.ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          var text = this.text;
          var textX = Math.round((width - ctx.measureText(text).width) / 2);
          var textY = (height / 2) + 20;

          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      });
    }
    this.renderChart(this.chartData, this.options)
  }
}
</script>