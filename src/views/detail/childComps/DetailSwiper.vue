<template>
  <swiper class="detail-swiper" v-if="topImages.length">
    <swiper-item class="item"  v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detail-swiper {
    width: 80%;
    margin: 0 auto;
  }
  .item {
    width: 100%;
  }
</style>
