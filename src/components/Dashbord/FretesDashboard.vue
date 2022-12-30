<template >
  <div v-if="loadedFrete">
    <Bar  :data="dashboardFrete" :options="dashFretesOptions"/>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  components: {Bar},
  name: "FretesDashboard",
  data() {
    return {
      loadedFrete: false,
      dashboardFrete: '',
      dashFretesOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Fretes',
          }
        },
        scales: {
          x: {
            grid: {
              color: null,
              borderColor: null,
              tickColor: null
            }
          }
        }
      },
    }
  },
  async mounted() {
    this.loadedFrete = false;
    try {
      this.dashboardFrete = {
        labels: this.filterData(),
        datasets: [
          {
            label: ['Fretes Realizados'],
            borderRadius: 5,
            backgroundColor: ['rgba(101,163,13,0.4)'],
            borderColor: 'rgb(101,163,13)',
            borderWidth: 1,
            data: this.filterFretes()
          },
        ]
      }
      this.loadedFrete = true;
    } catch (e) {
      console.error(e);
    }

  },

  methods: {
    filterData() {
        const dados = this.$store.state.fretes.map((item) => item.data).filter((item) => item !== "")
        const dado =  new Set(dados.sort());
        return [...dado]
    },
    filterFretes() {
      const dados = this.$store.state.fretes.map((item) => item.data).filter((item) => item !== "" )
      const countMap = Object.create(null);
      for (const element of dados) {
        if (!countMap[element]) {
          countMap[element] = 1;
        } else {
          countMap[element] += 1;
        }
      }

      return countMap
    }
  },


}
</script>

<style scoped>

</style>