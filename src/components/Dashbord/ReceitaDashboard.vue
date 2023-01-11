<template>
  <div v-if="loadedReceita" class="max-h-[20rem] h-96 rounded">
    <Line :data="dashReceita" :options="optionsdashReceita" />
  </div>
</template>

<script>
import {Line} from 'vue-chartjs'
ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement,  LineElement, Title, Tooltip, Legend, ArcElement, Tooltip)
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

export default {
  name: "ReceitaDashboard",
  components: {Line},
  data() {
    return {
      loadedReceita: false,
      dashReceita : '',
      optionsdashReceita : {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Receitas',
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
    this.loadedReceita = false;
    try {
      this.dashReceita = {
            datasets: [
              {
                label: 'Receitas',
                data: this.filterReceita()["Recebido"],
                backgroundColor: ['rgba(101,163,13,0.4)'],
                borderColor:  'rgb(101,163,13)',
                borderWidth: 1,
                tension: 0.3

              },
        ]
      }
      this.loadedReceita = true;
    }
    catch (e) {
    console.error(e);
    }
  },
  methods: {
    filterData() {
      const dados = this.$store.state.fretes
          .map((item) => item.data).filter((item) => item !== "")
          .sort();
      const dado =  new Set(dados);
      return [...dado]
    },
    filterReceita() {
      const dados = this.$store.state.fretes
          .sort((a, b) => Date.parse(a.data) - Date.parse(b.data))
          .reduce((acc, atual) => {
        if(acc[atual.statusFrete][atual.data.replace(/(\d*)-(\d*)-(\d*).*/, '$2-$1')]){
          acc[atual.statusFrete][atual.data.replace(/(\d*)-(\d*)-(\d*).*/, '$2-$1')]+=atual.valorFrete
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