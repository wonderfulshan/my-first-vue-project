import Vue from 'vue'
import axios from 'axios'
//存放数据
const state = {
    orderList: [],//orderList
    params: {}//参数
}
//用于页面调用数据
const getters = {
    getOrderList:function (state) {
        return state.orderList
    }
}
//可进行异步操作，通过API获得orderList
const actions = {
    fetchOrderList({ commit, state }) {
       axios.post('/getOrderList', state.params)
       .then((res) => {
           commit('updateOrderList', state.params)
           state.orderList = res.data.list
           state.total = res.data.total
       }, (err) => {

       })
    }//commit 用来调用mutations;state获取params
}
//同步
const mutations = {
    updateOrderList (state, payLoad) {
        state.orderList = payLoad//复写成传进来的orderList
    },
    updateParams (state, {key, val}) {
        state.params[key] = val
        console.log(state.params)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}