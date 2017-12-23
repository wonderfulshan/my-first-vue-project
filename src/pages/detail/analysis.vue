<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>如初</h2>
        <p>花语：还记得第一次我们约会吗？那晚的星光格外美，我的心也快要沸腾。</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                <v-counter :max="100" :min="20"></v-counter>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                <v-selection :selections="productTypes"></v-selection> 
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  半年
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  500元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <h3>鲜花货号:</h3>
        <p>LOVEHUA201163</p>
        <h3>鲜花花材:</h3>
        <p>19支雪山白玫瑰，适量紫色勿忘我外围搭配</p>
        <h3>鲜花包装:</h3>
        <p>内层双色人造纸（浅紫色、香芋紫），外层深灰色opp纸,米白色缎带...</p>
      </div>
  </div>
</template>

<script>
import VSelection from '../../components/base/selection'
import VCounter from '../../components/base/counter'
export default {
  components: {
    VSelection,
    VCounter
  },
  data () {
    return {
      productTypes: [{
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
      }]
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