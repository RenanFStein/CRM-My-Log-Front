<template>
  <div >

    <div  class="lg:grid lg:grid-cols-3 lg:grid-flow-col lg:gap-4 mt-1 p-8 rounded    sm:flex sm:flex-wrap sm:justify-center"  >

      <div class="max-h-[24rem] h-96 rounded flex justify-center text-center flex-wrap md:mr-4">
      <VeiculosDashBoard/>
      </div>

      <div class="max-h-[24rem] h-96 rounded flex justify-center text-center flex-wrap md:ml-4">
      <FinanceiroDashboard/>
      </div>

      <div  class="max-h-[24rem] h-96 rounded flex justify-center text-center flex-wrap md:ml-4">
        <FretesDashboard/>
      </div>
    </div>

    <div class="grid grid-cols-1 grid-flow-col mt-1 p-8 rounded">
      <ReceitaDashboard/>
    </div>

  </div>
</template>

<script>
import ReceitaDashboard from "@/components/Dashbord/ReceitaDashboard.vue";

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
import FretesDashboard from "@/components/Dashbord/FretesDashboard.vue";
import VeiculosDashBoard from "@/components/Dashbord/VeiculosDashBoard.vue";
import FinanceiroDashboard from "@/components/Dashbord/FinanceiroDashboard.vue";

export default {
  components: {ReceitaDashboard, FinanceiroDashboard, VeiculosDashBoard, FretesDashboard},

}
</script>

<style scoped>

</style>