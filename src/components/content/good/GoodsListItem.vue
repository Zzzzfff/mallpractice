<template>
  <div class="goods-item">
    <img v-lazy="showImage" alt="" @load="imageLoad" @click="imageClick">
    <div class="goods-info">
      <p >{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        // 1.解决详情页goods图片加载，首页收到事件监听问题。方式一：根据路由切换图片加载监听
        // if (this.$route.indexOf('/home')) {
        //   this.$bus.$emit('homeItemImageLoad')
        // } else if (this.$route.indexOf('/detail')) {
        //   this.$bus.$emit('detailItemImageLoad')
        // }

        // 2.解决详情页goods图片加载，首页收到事件监听问题。方式二：离开页面时关闭bus事件监听
        this.$bus.$emit('imageLoad')
      },
      imageClick() {
        this.$router.push('/detail/' + (this.goodsItem.iid || this.goodsItem.item_id))
      }
    }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border:3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative; 
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
  }

</style>