<template>
  <div class="justify-center m-3 overflow-auto">

    <div class="grid grid-cols-1 flex justify-items-start  p-2">
      <!-- Button trigger modal -->
      <button type="button" class="bg-lime-600 p-2 rounded hover:bg-lime-700 text-white" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Lançar Frete
      </button>
      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Lançamento de Frete</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form   @submit.stop.prevent="addFrete()">
            <div class="modal-body w-full p-3">
              <div class="flex justify-content-start pb-2">
                <div class="flex justify-content-start pb-2 w-full">
                  <label class="w-1/4 text-start">Valor do Frete</label>
                  <input type="number" class="input-group ml-6  w-3/4 h-8
                  rounded ring-1
                  ring-gray-600
                  focus:ring-green-700
                  focus:ring-1
                  focus:border focus:border-2
                  focus:border-lime-600 appearance-none
                  border rounded w-full text-gray-700 leading-tight focus:outline-lime-600"
                         v-model="fretes.valorFrete">
                </div>

              </div>

              <div class="flex justify-content-start pb-2 w-full">

                  <label class="w-1/4 text-start">Veiculo</label>
                <select name="tipoBeneficiario" v-model="fretes.veiculoId" class=" input-group ml-6 w-3/4 h-8 p-1
                                                                        items-center
                                                                        rounded ring-1
                                                                        ring-gray-600
                                                                        focus:ring-green-700
                                                                        focus:ring-1
                                                                        focus:border focus:border-2
                                                                        focus:border-lime-600 appearance-none
                                                                        border  w-full text-gray-700 leading-tight focus:outline-lime-600" >
                  <option v-for="veiculos in $store.state.veiculos"  :key="veiculos.id" :value="veiculos.id">
                    {{veiculos.modelo}}
                  </option>
                </select>



              </div>
              <div class="flex justify-content-start pb-2 w-full">

                <label class="w-1/4 text-start">Empresa</label>
                <input type="text" class="input-group ml-6  w-3/4 h-8
                  rounded ring-1
                  ring-gray-600
                  focus:ring-green-700
                  focus:ring-1
                  focus:border focus:border-2
                  focus:border-lime-600 appearance-none
                  border rounded w-full text-gray-700 leading-tight focus:outline-lime-600" v-model="fretes.empresa">

              </div>

              <div class="flex justify-content-start pb-2 w-full">

                <label class="w-1/4 text-start">Carregamento</label>
                <input type="text" class="input-group ml-6  w-3/4 h-8
                  rounded ring-1
                  ring-gray-600
                  focus:ring-green-700
                  focus:ring-1
                  focus:border focus:border-2
                  focus:border-lime-600 appearance-none
                  border rounded w-full text-gray-700 leading-tight focus:outline-lime-600" v-model="fretes.carregamento">

              </div>
              <div class="flex justify-content-start pb-2 w-full">

                <label class="w-1/4 text-start">Entrega</label>
                <input type="text" class="input-group ml-6  w-3/4 h-8
                  rounded ring-1
                  ring-gray-600
                  focus:ring-green-700
                  focus:ring-1
                  focus:border focus:border-2
                  focus:border-lime-600 appearance-none
                  border rounded w-full text-gray-700 leading-tight focus:outline-lime-600" v-model="fretes.entrega">

              </div>
              <div class="flex justify-content-start w-full">
                <label class="w-1/4 text-start">Status</label>
                <select name="tipoBeneficiario" v-model="fretes.statusFrete" class=" input-group ml-6 w-3/4 h-8 p-1
                                                                        items-center
                                                                        rounded ring-1
                                                                        ring-gray-600
                                                                        focus:ring-green-700
                                                                        focus:ring-1
                                                                        focus:border focus:border-2
                                                                        focus:border-lime-600 appearance-none
                                                                        border  w-full text-gray-700 leading-tight focus:outline-lime-600">
                  <option value="A_Receber" >A Receber</option>
                  <option value="Recebido">Recebido</option>
                  <option value="Em_Atraso" >Em Atraso</option>
                </select>
              </div>
              <div class="flex justify-content-start pb-2 w-full mt-2">

                <label class="w-1/4 text-start">Data</label>
                <input type="date" class="input-group ml-6  w-3/4 h-8
                  rounded ring-1
                  ring-gray-600
                  focus:ring-green-700
                  focus:ring-1
                  focus:border focus:border-2
                  focus:border-lime-600 appearance-none
                  border rounded w-full text-gray-700 leading-tight focus:outline-lime-600"
                       v-model="fretes.data">

              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="bg-gray-600 p-2 rounded hover:bg-gray-700 text-white" data-bs-dismiss="modal" @click="limpaFrete">Fechar</button>
              <button type="submit" data-bs-dismiss="modal" class="bg-lime-600 p-2 rounded hover:bg-lime-700 text-white" >Salvar</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 mt-4 overflow-auto">

      <div class="max-h-[48rem] overflow-auto">
        <div>
          <table class="table-auto break-words w-full">
            <thead >
            <tr class="border border-gray-700 border-separate border-spacing-2 ">
              <th >Frete</th>
              <th>Veiculo</th>
              <th>Empresa</th>

              <th>Local Carregamento</th>
              <th>Local Entrega</th>
              <th>Valor do Frete</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody class="table-group-divider">
            <tr class="border border-gray-700 border-separate border-spacing-2 hover:bg-lime-50 "
                v-for="frete in $store.state.fretes"
                :key="frete.id">

              <td>{{ frete.id }} </td>
              <td>{{ frete.veiculoId }}</td>
              <td>{{ frete.empresa }}</td>

              <td>{{ frete.carregamento }} </td>
              <td>{{ frete.entrega }} </td>
              <td>{{ formatPrice(frete.valorFrete) }} </td>
              <td>{{ frete.data.replace(/(\d*)-(\d*)-(\d*).*/, '$2-$3-$1') }}</td>
              <td>{{ frete.statusFrete.replace("_", " ") }}</td>
            </tr>

            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {formatNumber} from "chart.js/helpers";

export default {
  data() {
    return {
      fretes:{
        veiculoId: "",
        empresa: "",
        carregamento: "",
        entrega: "",
        valorFrete: "",
        statusFrete: "",
        data:""
        },
    }
  },

  methods: {

    addFrete() {
      if (this.fretes){
        this.$store.dispatch('addFrete', this.fretes)
            .finally(() => {
              this.fretes = {
                id:"",
                veiculoId: "",
                empresa: "",
                carregamento: "",
                entrega: "",
                valorFrete: "",
                statusFrete: "",
                data:""
              }
            })
        console.log('Frete Adicionado com Sucesso.')
      }
      else{
        console.log('Erro ao Adicionar Frete.')
      }
    },
    limpaFrete(){
      this.fretes = {
          id:"",
        veiculoId: "",
          empresa: "",
          carregamento: "",
          entrega: "",
          valorFrete: "",
          statusFrete: "",
          data:""
      }
    },
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return ("R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
    },
  },

}
</script>

<style scoped>

</style>