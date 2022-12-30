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
            return axios.get('http://localhost:3000/veiculos')
                .then((response) => {
                    commit('storeVeiculos', response.data)
                })
        },
        getFretes({commit}){
            return axios.get('http://localhost:3000/fretes')
                .then((response) => {
                    commit('storeFretes', response.data)
                })
        },


        addFrete({commit}, data){
            return axios.post('http://localhost:3000/fretes', data)
                .then((response) => {
                    console.log(response.data)
                    commit('storeFrete', response.data)
                })
        },
        addVeiculo({commit}, data){
            return axios.post('http://localhost:3000/Veiculos', data)
                .then((response) => {
                    console.log(response.data)
                    commit('storeVeiculo', response.data)
                })
        },

        updateFinanceiro({commit}, {id, fretes}){
            console.log(fretes)
            const url = 'http://localhost:3000/fretes/'+id;
            return axios.put(url, fretes)
                .then((response) =>{
                    commit("storeFrete", response.data)
                    console.log("Atualizado")
                })

        },
    }
})