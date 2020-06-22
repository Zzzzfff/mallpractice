<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="detailinfo">
    <div class="desc">{{detailInfo.desc}}</div>
    <div v-for="(Mainitem,Mainindex) in detailInfo.detailImage" :key="Mainindex" class="image">
      <div class="image_desc">{{Mainitem.key}}</div>
      <div v-for="(item,index) in Mainitem.list" :key="index" class="imagelist">
        <img :src="item" alt class="imglist" @load="imageLoad" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      counter: 0,
      imagesLength: 0
    };
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      // 1.所有图片加载完成后发射一次事件
      // if (++this.counter === this.imagesLength) {
      //     this.$emit('goodsItemLoad')
      // }

      // 2.此处也可以用debounce防抖，增加用户体验，但是会损失性能
      this.$emit("goodsItemLoad");
    }
  },
  // 监控detailInfo，实时改变imagesLength
  watch: {
    detailInfo() {
      // 获取图片个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped>
.detailinfo {
  padding: 0 5px;
  border-bottom: 10px solid #d2d2d2;
}
.desc {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;

  font-size: 16px;
}

/* .desc::before{
  content: '——————';
  position: absolute;
  top: -15px;
  color: palevioletred;

}
.desc::after{
  content: '——————';
  position: absolute;
  right: 0;
  top: 25px;
  
   color: palevioletred;
} */
.image_desc {
  height: 44px;
  line-height: 44px;
  font-size: 16px;
}
.imglist {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>