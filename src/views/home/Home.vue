<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl :titles="['流行','新款','精品']" class="tab-control" @tabClick="tabclick" ref="tabcontrol1"
                v-show="isTabFixed"></TabControl>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <RecommendView :recommends="recommend"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','精品']" @tabClick="tabclick" ref="tabcontrol2"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </scroll>
    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navigationbar/NavBar.vue';
  import Scroll from 'components/common/scroll/Scroll'

  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList'

  import {getHomeMultidata, getHomeData} from "network/home";
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {BACKTOP_DISTANCE} from 'common/const'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        banners: [],
        dKeyword: [],
        keywords: [],
        recommend: [],
        goods: {
          'pop': {
            'page': 0,
            list: [{
              "show": {"img": "https://s2.mogucdn.com/mlcdn/c45406/180922_61611jf30ak2la355lldi2le5kb8i_640x960.jpg_300x400.v1cAC.40.webp"},
              "title": "连帽卫衣女学院风不规则长袖上衣女百搭字母印花加绒套头卫衣外套", "price": "65.00 ", "cfav": 10, 'iid': '1m8va40'
            },
              {
                "show": {"img": "https://s2.mogucdn.com/mlcdn/c45406/180922_61611jf30ak2la355lldi2le5kb8i_640x960.jpg_300x400.v1cAC.40.webp"},
                "title": "连帽卫衣女学院风不规则长袖上衣女百搭字母印花加绒套头卫衣外套", "price": "65.00 ", "cfav": 10, 'iid': '1m8va40'
              }]
          },
          'new': {
            'page': 0,
            list: [{
              "show": {"img": "https://s2.mogucdn.com/mlcdn/c45406/180802_0c286006j2icg3fkj5831jj6fl2k5_640x854.jpg_300x400.v1cAC.40.webp"},
              "title": "连帽卫衣女学院风不规则长袖上衣女百搭字母印花加绒套头卫衣外套", "price": "65.00 ", "cfav": 10, 'iid': '1m8sxmy'
            }, {
              "show": {"img": "https://s2.mogucdn.com/mlcdn/c45406/180802_0c286006j2icg3fkj5831jj6fl2k5_640x854.jpg_300x400.v1cAC.40.webp"},
              "title": "连帽卫衣女学院风不规则长袖上衣女百搭字母印花加绒套头卫衣外套", "price": "65.00 ", "cfav": 10, 'iid': '1m8sxmy'
            }]
          },
          'sell': {
            'page': 0,
            list: [{
              "show": {"img": "https://s2.mogucdn.com/mlcdn/c45406/180921_4jgf9j358k2g78b74hjjcc01d5cc5_640x960.jpg_300x400.v1cAC.40.webp"},
              "title": "连帽卫衣女学院风不规则长袖上衣女百搭字母印花加绒套头卫衣外套",
              "price": "65.00 ",
              "cfav": 10,
              'iid': '1m8xkxk'
            }, {
              "show": {"img": "https://s2.mogucdn.com/mlcdn/c45406/180921_4jgf9j358k2g78b74hjjcc01d5cc5_640x960.jpg_300x400.v1cAC.40.webp"},
              "title": "连帽卫衣女学院风不规则长袖上衣女百搭字母印花加绒套头卫衣外套",
              "price": "65.00 ",
              "cfav": 10,
              'iid': '1m8xkxk'
            }]
          }
        },
        currentType: 'pop',
        tabOffsetTop: null,
        isTabFixed: false,
        saveY: 0,

      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          // this.dKeyword = res.data.dKeyword;
          // this.keywords = res.data.keywords;
          this.recommend = res.data.recommend.list;
        })
      },
      getHomeGoods: function (type) {
        const page = this.goods[type].page + 1;
        getHomeData(type, page).then(res => {
          // this.goods[type].list.push(...res.data.list)
          // this.goods[type].page = page
          this.goods[type].list.push(...this.goods[type].list)
          this.goods[type].page = page
        })
      },
      tabclick: function (index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabcontrol2.currentIndex = index;
        this.$refs.tabcontrol1.currentIndex = index
      },
      contentScroll: function (position) {
        this.isShowBackTop = -position.y > BACKTOP_DISTANCE;
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore: function () {
        this.getHomeGoods(this.currentType);
        setTimeout(() => {
          this.$refs.scroll.finishPullUp()
        }, 1000)
      },
      swiperImageLoad: function () {
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      }
    },
    mounted() {
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      this.$bus.$off('itemImgLoad',this.itemImgListener)
      // console.log(this.saveY);
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  /*.content {*/
  /*height: calc(100% - 48px);*/
  /*overflow: hidden;*/
  /*}*/
</style>
