<template>
<div class="order-wrap">
   <h3>您的产品</h3>
  <div class="order-list-choose">
    <div class="order-list-option">
      选择产品：
      <v-selection :selections="products"
      @on-change="productChange"></v-selection>
    </div>

    <div class="order-list-option">
      开始日期：
      <v-date-picker @change="changeStartDate"></v-date-picker>
    </div>

    <div class="order-list-option">
      结束日期：
      <v-date-picker @change="changeEndDate"></v-date-picker>
    </div>

    <div class="order-list-option">
      关键词：
      <input type="text" v-model.lazy="query" class="order-query">
    </div>
  </div>
  <div class="order-list-table">
    <table>
        <tr>
          <th v-for="head in tableHeads" :key="head.value"
          @click="changeOrder(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in tableData" :key="item.id">
          <td v-for="head in tableHeads" :key="head.id">{{ item[head.key] }}</td>
        </tr>
      </table>
  </div>
</div>
</template>

<script>
import VSelection from '../components/base/selection'
import VDatePicker from '../components/base/datepicker'
import axios from 'axios'
import _ from 'lodash'
export default {
  components: {
    VSelection,
    VDatePicker
  },
  data () {
    return {
      query: '',
      productId: 0,
      startDate: '',
      endDate: '',
      products: [
        {
          label: '情意绵绵',
          value: 0
        },
        {
          label: '如初',
          value: 1
        },
        {
          label: '情有独钟',
          value: 2
        },
        {
          label: '永恒爱恋',
          value: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ],
      currentOrder: 'desc',
    }
  },
  //动态绑定tableData
  computed: {
    tableData () {
      return this.$store.getters.getOrderList
    }
  },
  methods: {
    //vuex
    productChange (obj) {
      this.$store.commit('updateParams', {
        key: 'productId',
        val: obj.value
      })
      this.$store.dispatch('fetchOrderList')
      //this.productId = obj.value
      //this.getTableDate()
    },
    changeStartDate (date) {
      this.$store.commit('updateParams', {
        key: 'startDate',
        val: date
      })
      //this.startDate = date
     // this.getTableDate()
    },
    changeEndDate (date) {
      this.endDate = date
      this.getTableDate()
    },
    getTableDate () {
      let reqParam = {
        query: this.query,
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate
      }
    axios.post('getOrderList',reqParam)
    .then((res) => {
      console.log(res)
      this.tableData = res.data.list
    })
    .catch((error) => {
      console.log(error)
    })
    },
    changeOrder(headItem) {
    this.tableHeads.map((item) => {
      item.active = false
      return item
    })
    headItem.active = true
    if (this.currentOrder === 'asc') {
      this.currentOrder = 'desc'
    }
    else if (this.currentOrder === 'desc') {
      this.currentOrder = 'asc'
    }
    this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
  }
  },
  mounted () {
    //this.getTableDate()
    this.$store.dispatch('fetchOrderList')
    console.log(this.$store)
  },
  watch: {
    query () {
      this.getTableDate()
    }
  }
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>

