import { createStore } from "vuex";
import axios from "axios";



export default createStore({
    state:{
        sideBar:
            {
                "id": 1,
                "user": "Renan F. Stein",
                "email": "renan@teste.com",
                "passowrd": "12345",
                "statusBar": true
            },
        fretes:[],
        veiculos:[]
    },
    mutations:{

        storeVeiculos(state, payload){
            state.veiculos = payload
                .sort(function (a, b){
                    return b.id - a.id;
                });
        },
        storeVeiculo(state, payload){

            const index = state.veiculos.findIndex(frete => frete.id === payload.id)
            if (index >= 0){
                state.veiculos.splice(index, 1, payload)
            }
            else{
                state.veiculos.unshift(payload)
            }

        },


        storeFretes(state, payload){
            state.fretes = payload
                .sort(function (a, b){
                return b.id - a.id;
            });
        },

        storeFrete(state, payload){
            const index = state.fretes.findIndex(frete => frete.id === payload.id)
            if (index >= 0){
                state.fretes.splice(index, 1, payload)
            }
            else{
                state.fretes.unshift(payload)
            }
        },
    },
    actions:{
        getVeiculos({commit}){
            return axios.get('https://localhost:7025/Veiculo')
                .then((response) => {
                    commit('storeVeiculos', response.data)
                })
        },
        getFretes({commit}){
            return axios.get('https://localhost:7025/Frete')
                .then((response) => {
                    commit('storeFretes', response.data)
                })
        },

        addFrete({commit}, data){
            return axios.post('https://localhost:7025/Frete', data)
                .then((response) => {
                    commit('storeFrete', response.data)
                })
        },
        addVeiculo({commit}, data){

            try {
                return axios.post('https://localhost:7025/Veiculo', data)
                    .then((response) => {
                        commit('storeVeiculo', response.data)
                    })
            }
            catch (error){
                console.error(error);
            }

        },

        updateFinanceiro({commit}, {id, fretes}){
            return axios.put('https://localhost:7025/Frete/'+id, fretes)
                .then((response) =>{
                    commit("storeFrete", response.data)
                })

        },
    }
})