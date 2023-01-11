<template>
    <div class="justify-center m-3 overflow-auto">

      <div class="grid grid-cols-1 flex justify-items-start p-2 ">
        <!-- Button trigger modal -->
        <button type="button" class="bg-lime-600 p-2 rounded hover:bg-lime-700 text-white" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Cadastrar Veiculo
        </button>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Lançamento de Veiculo</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form  @submit.stop.prevent="addVeiculo">
              <div class="modal-body w-full p-3">
                <div class="flex justify-content-start pb-2">
                  <label class="p-1">Veiculo</label>
                  <input type="text" class="input-group
                  rounded ring-1
                  ring-gray-600
                  focus:ring-green-700
                  focus:ring-1
                  focus:border focus:border-2
                  focus:border-lime-600 appearance-none
                  border rounded w-full text-gray-700 leading-tight focus:outline-lime-600" v-model="veiculos.modelo">

                </div>

                <div class="flex justify-content-start pb-2">
                  <div class="flex inline w-1/2">
                    <label class="p-1">Ano</label>
                    <input type="date" class="input-group ml-6
                  rounded ring-1
                  ring-gray-600
                  focus:ring-green-700
                  focus:ring-1
                  focus:border focus:border-2
                  focus:border-lime-600 appearance-none
                  border rounded w-full text-gray-700 leading-tight focus:outline-lime-600" v-model="veiculos.anoFabricacao">
                  </div>
                  <div class="flex inline w-1/2">
                    <label class="p-1 ml-1">Aquisição</label>
                    <input type="date" class="input-group
                  rounded ring-1
                  ring-gray-600
                  focus:ring-green-700
                  focus:ring-1
                  focus:border focus:border-2
                  focus:border-lime-600 appearance-none
                  border rounded w-full text-gray-700 leading-tight focus:outline-lime-600" v-model="veiculos.anoAquisicao">
                  </div>




                </div>
                <div class="flex justify-content-start pb-2">
                  <label class="p-1">Valor</label>
                  <input type="number" class="input-group ml-3
                  rounded ring-1
                  ring-gray-600
                  focus:ring-green-700
                  focus:ring-1
                  focus:border focus:border-2
                  focus:border-lime-600 appearance-none
                  border rounded w-full text-gray-700 leading-tight focus:outline-lime-600" v-model="veiculos.valorAquisicao">

                </div>
                <div class="flex justify-content-start pb-2">
                  <label class="p-1">Cor</label>
                  <input type="text" class="input-group ml-6 w-1/2
                  rounded ring-1
                  ring-gray-600
                  focus:ring-green-700
                  focus:ring-1
                  focus:border focus:border-2
                  focus:border-lime-600 appearance-none
                  border  w-full text-gray-700 leading-tight focus:outline-lime-600" v-model="veiculos.cor">

                  <label class="p-1 ml-5">Status</label>
                  <input type="checkbox" v-model="veiculos.statusVeiculo" >
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="bg-gray-600 p-2 rounded hover:bg-gray-700 text-white" data-bs-dismiss="modal"  @click="limpaVeiculo">Fechar</button>
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
              <table class="table-auto break-words w-full rounded">
                <thead class="rounded">
                <tr class="border border-gray-700 border-separate border-spacing-2 rounded">
                  <th>ID</th>
                  <th>Veículo</th>
                  <th>Cor</th>
                  <th>Ano</th>
                  <th>Ano Aquisição</th>
                  <th>Valor de Aquisição</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody class="table-group-divider rounded">
                 <tr class="border border-gray-700 border-separate border-spacing-2 hover:bg-lime-50 "
                     v-for="veiculos in $store.state.veiculos"
                     :key="veiculos.id">

                   <td>{{veiculos.id}}</td>
                   <td>{{veiculos.modelo}}Veiculos teste 01 </td>
                   <td>{{veiculos.cor}} </td>
                   <td>{{veiculos.anoFabricacao.replace(/(\d*)-(\d*)-(\d*).*/, '$2-$1')}} </td>
                   <td>{{veiculos.anoAquisicao.replace(/(\d*)-(\d*)-(\d*).*/, '$2-$1')}} </td>
                   <td>{{formatPrice(veiculos.valorAquisicao)}} </td>
                   <td v-if="veiculos.statusVeiculo === true">Ativo</td>
                   <td v-if="veiculos.statusVeiculo === false">Inativo</td>
                </tr>
                </tbody>
              </table>
            </div>


          </div>

      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          veiculos: {
            modelo: "",
            cor: "",
            anoFabricacao: "",
            anoAquisicao: "",
            valorAquisicao: "",
            statusVeiculo: "",
          }
        }
      },
      methods: {
        addVeiculo() {
          if (this.veiculos){
            if (this.veiculos.statusVeiculo){
              this.veiculos.statusVeiculo = true
            }
            else{
              this.veiculos.statusVeiculo = false
            }
            this.$store.dispatch('addVeiculo', this.veiculos)
                .finally(() => {
                  this.veiculos= {
                    modelo: "",
                    cor: "",
                    anoFabricacao: "",
                    anoAquisicao: "",
                    valorAquisicao: "",
                    statusVeiculo: "",
                  }
                })
          }
          else{
            console.log('Erro ao Adicionar Veiculo.')
          }
        },
        limpaVeiculo(){
          this.veiculos= {
            modelo: "",
            cor: "",
            anoFabricacao: "",
            anoAquisicao: "",
            valorAquisicao: "",
            statusVeiculo: "",
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