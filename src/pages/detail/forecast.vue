<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>情有独钟</h2>
        <p>花语：风里有种浪漫气息缓缓流动，挑起了爱的情绪，一点一滴流入心中，对你...</p>
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
                  <v-mul-chooser :selections="versionList"></v-mul-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  一年
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
        <p>LOVEHUA201155</p>
        <h3>鲜花花材:</h3>
        <p>50支戴安娜粉玫瑰，适量石竹梅外围搭配</p>
        <h3>鲜花包装:</h3>
        <p>浅紫香芋紫人造双面纸，深浅绿双面纸，玻璃纸，白绿宽罗纹带</p>
      </div>
  </div>
</template>

<script>
import VCounter from '../../components/base/counter'
import VMulChooser from '../../components/base/multiplyChooser'
export default {
  components: {
    VCounter,
    VMulChooser
  },
  data () {
    return {
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
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
