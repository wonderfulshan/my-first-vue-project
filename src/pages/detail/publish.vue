<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>永恒爱恋</h2>
        <p>花语：我们的爱在春雨中萌芽，在夏日下成长，在秋风里成熟，在冬雪的辉映下...</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                  <v-counter @on-change="onParamChange('buyNum',$event)"></v-counter>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  颜色：
              </div>
              <div class="sales-board-line-right">
                  <v-selection @on-change="onParamChange('color',$event)" :selections="tradeList"></v-selection>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                  <v-mul-chooser @on-change="onParamChange('buyTypes',$event)" :selections="versionList"></v-mul-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  <v-chooser :selections="periodList"
                  @on-change="onParamChange('period',$event)"></v-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  {{price}} 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click="showPayDialog">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <h3>鲜花货号:</h3>
        <p>LOVEHUA201011</p>
        <h3>鲜花花材:</h3>
        <p>33支蓝玫瑰，适量满天星/相思梅搭配</p>
        <h3>鲜花包装:</h3>
        <p>蓝色卷边纸包装，紫色纱网、蓝色丝带束扎</p>
      </div>
      <my-dialog :is-show="isShowPayDialog" @on-close="hidePayDialog">
        <table class="buy-dialog-table">
          <tr>
            <th>购买数量</th>
            <th>颜色</th>
            <th>产品类型</th>
            <th>有效时间</th>
            <th>总价</th>
          </tr>
          <tr>
            <td>{{ buyNum }}</td>
            <td>{{ color.label }}</td>
            <td>
              <span v-for="item in buyTypes" :key="item.id">{{ item.label }}</span>
            </td>
            <td>{{ period.label }}</td>
            <td>{{ price }}</td>
          </tr>
        </table>
        <h3 class="buy-dialog-title">请选择银行</h3>
        <bank-chooser @on-change="onChangeBanks"></bank-chooser>
        <div class="button buy-dialog-btn" @click="confirmBuy">
          确认购买
        </div>
      </my-dialog>
      <my-dialog :is-show="isShowErrDialog" @on-close="hideErrDialog">购买失败</my-dialog>
      <check-order :is-show-check-dialog="isShowCheckOrder"  :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order>
  </div>
</template>

<script>
import VSelection from '../../components/base/selection'
import VCounter from '../../components/base/counter'
import VMulChooser from '../../components/base/multiplyChooser'
import VChooser from '../../components/base/chooser'
import _ from 'lodash'
import axios from 'axios'
import Dialog from '../../components/base/dialog'
import BankChooser from '../../components/bankChooser'
import CheckOrder from '../../components/checkOrder'
export default {
  components: {
    VSelection,
    VCounter,
    VMulChooser,
    VChooser,
    MyDialog:Dialog,
    BankChooser,
    CheckOrder
  },
  methods: {
    onParamChange (attr, val) {
      this[attr] = val
      this.getPrice()
    },
    onChangeBanks(bankObj){
      this.bankId = bankObj.id
    },
     getPrice () {
      let buyTypesArray = _.map(this.buyTypes, (item) => {
        return item.value
      })
      let reqParams = {
        buyNumber: this.buyNum,
        color: this.color.value,
        period: this.period.value,
        buyType: buyTypesArray.join(',')
      }
      axios.post('getPrice', reqParams)
      .then((res) => {
        this.price = res.data.number
      }, (err) => {
        console.log(err)
      })
    },
    showPayDialog () {
      this.isShowPayDialog = true
    },
    hidePayDialog() {
      this.isShowPayDialog = false
    },
    hideErrDialog () {
      this.isShowErrDialog = false
    },
    hideCheckOrder () {
      this.isShowCheckOrder = false
    },
    confirmBuy () {
      let buyTypesArray = _.map(this.buyTypes, (item) => {
        return item.value
      })
      let reqParams = {
        buyNumber: this.buyNum,
        color: this.color.value,
        period: this.period.value,
        buyType: buyTypesArray.join(','),
        bankId: this.bankId
      }
      axios.post('createOrder', reqParams)
      .then((res) => {
        this.orderId = res.data.orderId
        this.isShowCheckOrder = true
        this.isShowPayDialog = false
      }, (err) => {
        this.isShowBuyDialog = false
        this.isShowErrDialog = true
      })
    }
  },
  mounted () {
    this.buyNum = 1
    this.color = this.tradeList[0]
    this.buyTypes = [this.versionList[0]]
    this.period = this.periodList[0]
    this.getPrice()
  },
  data () {
    return {
      buyNum: 1,
      buyTypes: [],
      color:{},
      period:{},
      price:0,
      isShowPayDialog: false,
      bankId: null,
      orderId: null,
      isShowCheckOrder: false,
      isShowErrDialog: false,
      tradeList: [
        {
          label: '红色',
          value: 0
        },
        {
          label: '紫色',
          value: 1
        },
        {
          label: '白色',
          value: 2
        },
        {
          label: '粉色',
          value: 3
        },
        {
          label: '绿色',
          value: 4
        }
      ],
      versionList: [
        {
          label: '爱情鲜花',
          value: 0
        },
        {
          label: '生日鲜花',
          value: 1
        },
        {
          label: '开业花篮',
          value: 2
        },
        {
          label: '爆款推荐',
          value: 3
        }
      ],
      periodList: [
        {
          label: '一年',
          value: 0
        },
        {
          label: '二年',
          value: 1
        },
        {
          label: '三年',
          value: 2
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>
