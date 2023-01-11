<template>
  <div v-if="loaded">
    <Pie :data="dashboardVeiculos" :options="dashboardVeiculosOptions"  />
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
  LinearScale,
  PointElement,
  LineElement, ArcElement
} from 'chart.js'
import { Pie} from 'vue-chartjs'
ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement,  LineElement, Title, Tooltip, Legend, ArcElement, Tooltip)

export default {
  components: { Pie},
  name: "VeiculosDashBoard",
  data() {
    return {
      loaded: false,
      dashboardVeiculos:'',
      dashboardVeiculosOptions : {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Veiculos',
          },
        }
      },
    }
  },
  async mounted() {
    this.loaded = false;
    try {
      this.dashboardVeiculos = {
        labels: ["Ativos", "Inativos"],
        datasets: [
          {
            backgroundColor: ['rgba(121,218,248,0.4)', 'rgba(248,121,121,0.4)'],
            borderColor: ['rgba(121,218,248)', 'rgba(248,121,121)'],
            borderWidth: 1,
            data: this.filterVeiculos(),
          },
        ]
      }
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }

  },

  methods: {
    filterVeiculos() {
      const dados = this.$store.state.veiculos.map((item) => item.statusVeiculo).filter((item) => item !== "")
      const countMap = Object.create(null);
      for (const element of dados) {
        if (!countMap[element]) {
          countMap[element] = 1;
        } else {
          countMap[element] += 1;
        }
      }
      return Object.values(countMap).reverse()
    }
  },

}
</script>

<style scoped>

</style>