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
        datasets: [
          {
            label: ['A Receber'],
            borderRadius: 5,
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor:  'rgb(75, 192, 192)',
            borderWidth: 1,
            data:this.filterFinanceiro()["A_Receber"]
          },
          {
            label: ['Em Atraso'],
            borderRadius: 5,
            backgroundColor: ['rgba(255, 99, 132, 0.4)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
            data:this.filterFinanceiro()["Em_Atraso"]
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
      const dados = this.$store.state.fretes
          .sort((a, b) => Date.parse(a.data) - Date.parse(b.data))
          .reduce((acc, atual) => {
            if(acc[atual.statusFrete][atual.data.replace(/(\d*)-(\d*)-(\d*).*/, '$2-$1')]){
              acc[atual.statusFrete][atual.data.replace(/(\d*)-(\d*)-(\d*).*/,'$2-$1')]+=atual.valorFrete
            }
            else{
              acc[atual.statusFrete][atual.data.replace(/(\d*)-(\d*)-(\d*).*/, '$2-$1')]=atual.valorFrete
            }
            return acc
          }, {
            "A_Receber": {},
            "Recebido": {},
            "Em_Atraso": {}
          } )
      return dados
    },
  },

}

</script>

<style scoped>

</style>