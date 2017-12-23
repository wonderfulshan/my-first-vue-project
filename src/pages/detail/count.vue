<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>情意绵绵</h2>
        <p>花语：断不了的前尘旧梦，驱不散的情意绵绵</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                  <v-chooser :selections="buyTypes"></v-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  适用地区：
              </div>
              <div class="sales-board-line-right">
                  <v-selection :selections="districts"></v-selection>
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
                  500 元
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
        <p>LOVEHUA201278</p>
        <h3>鲜花花材:</h3>
        <p>33支粉色玫瑰，适量相思梅点缀搭配</p>
        <h3>鲜花包装:</h3>
        <p>透明塑胶内衬，褐色蝴蝶结包扎，咖啡色高档礼盒包装</p>
      </div>
  </div>
</template>

<script>
import VSelection from '../../components/base/selection'
import VChooser from '../../components/base/chooser'
export default {
  components: {
    VChooser,
    VSelection
  },
  data () {
    return {
      buyTypes: [
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
        }
      ],
      districts: [
        {
          label: '北京',
          value: 0
        },
        {
          label: '上海',
          value: 1
        },
        {
          label: '广州',
          value: 2
        },
        {
          label: '天津',
          value: 3
        },
        {
          label: '武汉',
          value: 4
        },
        {
          label: '重庆',
          value: 5
        },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
