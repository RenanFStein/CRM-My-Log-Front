<template>
  <div class="justify-center p-3 overflow-auto">

    <div class="mt-2 mb-3">
      <h1 class="font-bold ">Fluxo de Caixa</h1>
    </div>
    <div class="grid grid-cols-1 gap-4  overflow-auto">

      <div class="max-h-[48rem] overflow-auto">

        <div>
          <table class="table-auto break-words w-full">
            <thead>
            <tr class="border border-gray-700 border-separate border-spacing-2">
              <th>Frete</th>
              <th>Empresa</th>
              <th>Valor do Frete</th>
              <th>Status</th>
              <th>Editar</th>
            </tr>
            </thead>
            <tbody class="table-group-divider">
            <tr class="border border-gray-700 border-separate border-spacing-2"
                :class="{ 'hover:bg-green-100': frete.status == 'Recebido',
                          'hover:bg-amber-100': frete.status == 'A Receber',
                          'hover:bg-red-100': frete.status == 'Em Atraso'}"
                v-for="frete in $store.state.fretes"
                :key="frete.id">
              <td>{{ frete.id }}</td>
              <td>{{frete.empresa}}</td>
              <td>{{frete.valorFrete}}</td>
              <td>{{frete.status}}</td>
              <td class="text-center flex justify-center hover:cursor-pointer">
                <button type="button" class="bg-lime-600 p-2 rounded hover:bg-lime-700 text-white" data-bs-toggle="modal" :data-bs-target="'#editarFrete'+frete.id">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
                <!-- Modal Editar Financeiro -->
                <div class="modal fade" :id="'editarFrete'+frete.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Lançamento de Frete</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <form @submit.stop.prevent="updateFinanceiro(frete)">
                        <div class="modal-body w-full p-3">
                          <div class="flex justify-content-start w-full">
                            <label class="w-1/4 text-start">Status</label>
                            <select name="tipoBeneficiario" class=" input-group ml-6 w-3/4 h-8 p-1
                                                                        items-center
                                                                        rounded ring-1
                                                                        ring-gray-600
                                                                        focus:ring-green-700
                                                                        focus:ring-1
                                                                        focus:border focus:border-2
                                                                        focus:border-lime-600 appearance-none
                                                                        border  w-full text-gray-700 leading-tight focus:outline-lime-600" v-model="selected" >
                              <option value="">{{frete.status}}</option>
                              <option v-if="frete.status != 'A Receber'" value="A Receber" >A Receber</option>
                              <option v-if="frete.status != 'Recebido'" value="Recebido">Recebido</option>
                              <option v-if="frete.status != 'Em Atraso'" value="Em Atraso" >Em Atraso</option>
                            </select>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="bg-gray-600 p-2 rounded hover:bg-gray-700 text-white" data-bs-dismiss="modal" >Fechar</button>
                          <button type="submit" data-bs-dismiss="modal" class="bg-lime-600 p-2 rounded hover:bg-lime-700 text-white" >Salvar</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </td>
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
      selected: ''
    }
  },
  methods: {

    updateFinanceiro($evt) {
      if(this.selected){
        const payload = {
          id: $evt.id,
          fretes:{
            veiculo: $evt.veiculo,
            empresa: $evt.empresa,
            localCarga: $evt.localCarga,
            localEntrega: $evt.localEntrega,
            valorFrete: $evt.valorFrete,
            status: this.selected,
            data:$evt.data,
          }
        }
        console.log(payload)
        this.$store.dispatch('updateFinanceiro', payload)
      }
    },
  },
}
</script>

<style scoped>

</style>