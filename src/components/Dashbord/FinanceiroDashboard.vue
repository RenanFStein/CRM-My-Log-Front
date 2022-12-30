<template>
  <div v-if="loadedFinanceiro">
    <Bar :data="dashFinanceiro" :options="optionsDashFinanceiro" />
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
  name: "FinanceiroDashboard",
  data() {
    return {
        loadedFinanceiro: false,
        dashFinanceiro:'',
        optionsDashFinanceiro : {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Financeiro',
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
    this.loadedFinanceiro = false;
    try {
      this.dashFinanceiro =  {
        labels: this.filterData(),
        datasets: [
          {
            label: ['A Receber'],
            borderRadius: 5,
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor:  'rgb(75, 192, 192)',
            borderWidth: 1,
            data:this.filterFinanceiro()["A Receber"]
          },
          {
            label: ['Em Atraso'],
            borderRadius: 5,
            backgroundColor: ['rgba(255, 99, 132, 0.4)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
            data:this.filterFinanceiro()["Em Atraso"]
          }
        ]
      }
      this.loadedFinanceiro = true;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    filterData() {
      const dados = this.$store.state.fretes.map((item) => item.data).filter((item) => item !== "").sort()
      const dado =  new Set(dados);
      return [...dado]
    },
    filterFinanceiro() {
      const dados = this.$store.state.fretes.reduce((acc, atual) => {
        if(acc[atual.status][atual.data]){
          acc[atual.status][atual.data]+=atual.valorFrete
        }
        else{
          acc[atual.status][atual.data]=atual.valorFrete
        }
        return acc
      }, {
        "Recebido": {},
        "Em Atraso": {},
        "A Receber": {}

      } )
      return dados
    },
  },

}

</script>

<style scoped>

</style>