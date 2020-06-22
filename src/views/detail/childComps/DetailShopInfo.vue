<template>
  <div class="shopinfo">
    <div class="pict">
      <img :src="shopinfo.logo" alt class="image" />
      <div>{{shopinfo.name}}</div>
    </div>
    <div class="desc">
      <div>
        <div class="title">{{shopinfo.sells}}</div>
        <div class="word">总销量</div>
      </div>
      <div>
        <div class="title">{{shopinfo.goodsCount}}</div>
        <div class="word">全部宝贝</div>
      </div>
      <div class="score">
        <div v-for="(item,index) in shopinfo.score" :key="index" class="score_item">
          <div class="name">{{item.name}}</div>
          <div v-if="item.isBetter===true" class="scores1">{{item.score}}</div>
          <div v-else class="scores2">{{item.score}}</div>
          <div v-if="item.isBetter===true" class="high">高</div>
          <div v-else class="low">低</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopinfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style scoped>
.pict {
  display: flex;
  align-items: center;

  height: 90px;
}
.image {
  width: 60px;
  height: 60px;
  margin: 0 10px;
}
.desc {
  display: flex;
  justify-content: space-around;
}
.high {
  background-color: red;
  color: white;
}
.low {
  background-color: green;
  color: white;
}
.title {
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 550;
  font-size: 20px;
}
.word {
  text-align: center;
  font-weight: 600;
  font-size: 16px;
}
.score_item {
  display: flex;
  margin-bottom: 10px;
}
.scores1 {
  margin: 0 10px;
  width: 31.17px;
  color: red;
}
.scores2 {
  margin: 0 10px;
  width: 31.17px;
  color: green;
}
</style>
