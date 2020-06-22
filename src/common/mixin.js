import {debounce} from "./utils"
import BackTop from "content/backTop/BackTop"

export const itemListenerMixin = {
    data() {
        return {
            imageListener: null,
        }
    },
    mounted() {
        this.imageListener = () => {
            debounce(this.$refs.scroll.refresh, 500)
          }
        // 1.图片加载完成的事件监听
        this.$bus.$on('imageLoad', this.imageListener)
        // console.log('我是mixins');   
    }
}


export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
    }
}