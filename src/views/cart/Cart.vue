<template>
    <div>
      <nav-bar class="nav-bar">
        <div slot="center" class="title">购物车({{cartLength}})</div>
      </nav-bar>
      <cart-list></cart-list>
      <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navigationbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  import {mapGetters} from 'vuex'
  export default {
      name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(["cartLength"])
    },

  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
