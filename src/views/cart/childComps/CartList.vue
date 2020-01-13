<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>

    </scroll>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  export default {
    name: "CartList",
    computed: {
      ...mapGetters(["cartList"])
    },
    components: {
      Scroll,
      CartListItem
    },
    activate() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 93px;
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
