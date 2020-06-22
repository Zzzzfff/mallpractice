<template>
  <div class="goods-list">
    <goods-list-item v-for="item in cgoods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"

export default {
    name: "GoodsList",
    props: {
        cgoods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        GoodsListItem,
    },
}
</script>

<style>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);

    padding: 2px;
  }
</style>