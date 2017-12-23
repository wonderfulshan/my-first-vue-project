<template>
<div class="index-wrap">
  <div class="index-left">
    <div class="index-left-block">
      <h2>全部种类</h2>
     <!--循环列表-->
      <template v-for="product in productList">
      <h3  v-bind:key="product.id">{{ product.title }}</h3>
      <ul v-bind:key="product.id">
        <li v-for="item in product.list" v-bind:key="item.id">
          <a :href="item.url">{{ item.name }}</a>
          <span v-if="item.hot" class="hot-tag">HOT</span>
        </li>
      </ul>
      <div v-if="!product.last" class="hr" v-bind:key="product.id"></div>
      </template>
    </div>
    <div class="index-left-block lastest-news">
      <h2>最新消息</h2>
      <ul>
        <li v-for="item in newsList" v-bind:key="item.id">
          <a :href="item.url">{{ item.title }} {{ item.string }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="index-right">
    <!--幻灯片组件-->
    <slide-show :slides="slides" :inv="slideSpeed"></slide-show>
    <div class="index-board-list">
      <div class="index-board-item" v-for="(item,index) in boardList" v-bind:key="item.id" :class="[{'line-last' : index % 2 !== 0 },'index-board-' + item.id]">
        <div class="index-board-item-inner">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <div class="index-board-button">
            <router-link class="button" :to="{path: 'detail/' + item.toKey}">立即购买</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import slideShow from '../components/slideShow'
import axios from 'axios'
export default{
  components: {
    slideShow
  },
  //axios 实现Ajax请求
  mounted () {
  axios.get('getNewsList')
  .then((res) => {
    console.log(res)
    this.newsList = res.data.list
  })
  .catch((error) => {
    console.log(error)
  })
  },
  data () {
    return {
      slideSpeed:2000,
      newsList:[],
      slides: [
        {
          src:require('../assets/slideShow/pic1.png'),
          title:'甜心',
          href:'detail/count'
        },
        {
          src:require('../assets/slideShow/pic2.png'),
          title:'永恒爱恋',
          href:'detail/forecast'
        },
        {
          src:require('../assets/slideShow/pic3.png'),
          title:'遇见爱',
          href:'detail/analysis'
        },
        {
          src:require('../assets/slideShow/pic4.png'),
          title:'平安夜',
          href:'detail/publish'
        }
      ],
      boardList: [
        {
          title: '情意绵绵',
          description: '33支粉色玫瑰，适量相思梅点缀搭配',
          id: 'car',
          toKey: 'analysis',
          saleout: false
        },
        {
          title: '如初',
          description: '19支雪山白玫瑰，适量紫色勿忘我外围搭配',
          id: 'earth',
          toKey: 'count',
          saleout: false
        },
        {
          title: '情有独钟',
          description: '50支戴安娜粉玫瑰，适量石竹梅外围搭配',
          id: 'loud',
          toKey: 'forecast',
          saleout: true
        },
        {
          title: '永恒爱恋',
          description: '33支蓝玫瑰，适量满天星/相思梅搭配',
          id: 'hill',
          toKey: 'publish',
          saleout: false
        }
      ],
      productList: {
        use: {
          title: '按用途分类',
          list: [
            {
              id:1,
              name: '爱情鲜花',
              url: 'http://starcraft.com'
            },
            {
              id:2,
              name: '友情鲜花',
              hot: true,
              url: 'http://warcraft.com'
            },
            {
              id:3,
              name: '生日鲜花',
              url: 'http://overwatch.com'
            },
            {
              id:4,
              name: '问候长辈',
              url: 'http://hearstone.com'
            }
          ]
        },
        flower: {
          title: '按花材分类',
          last: true,
          list: [
            {
              id:5,
              name: '玫瑰花',
              url: 'http://cxhua.kmhksmc.cn/'
            },
            {
              id:6,
              name: '康乃馨',
              url: 'https://www.hua.com/'
            },
            {
              id:7,
              name: '百合花',
              url: 'http://hua.doogu.cn/wap/'
            },
            {
              id:8,
              name: '扶郎花',
              hot: true,
              url: 'http://www.aihuaju.com/'
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: pink;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.jpg) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.jpg) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.jpg) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.jpg) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

