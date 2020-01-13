<template>
  <div id="detail">
      <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <goods-list :goods="recommend" ref="recommend"></goods-list>
      </scroll>
      <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
      <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
      <!--<toast :message="message" :show="show" ></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import {debounce} from "common/utils";
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // import Toast from 'components/common/toast/Toast'


  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {BACKTOP_DISTANCE} from 'common/const'

  import {mapActions} from 'vuex'
  export default {
    name: "Detail",
    mixins: [itemListenerMixin,backTopMixin],
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // show: false,
        // message: ''
      }
    },
    created: function () {
      this.iid = this.$route.query.iid || this.$route.params.iid;
      // this.iid = this.$route.params.iid;
      // getDetail(this.iid).then(res => {
      //   const data = res.result;
      //   this.topImages = data.itemInfo.topImages;
      //   this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //   this.shop = new Shop(data.shopInfo);
      //   this.detailInfo = data.detailInfo;
      //   this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
      //   if (data.rate.cRate !== 0) {
      //     this.commentInfo = data.rate.list[0]
      //   }
      // });
      this.changeIid(this.iid)
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailCommentInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      GoodsList,
      DetailBottomBar,
      // Toast
    },
    methods: {
      ...mapActions(["addCart"]),
      imageLoad() {
        this.getThemeTopY();
        this.newrefresh()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500);

      },
      contentScroll(position) {
        const positionY = -position.y;
        this.isShowBackTop = positionY > BACKTOP_DISTANCE;
        let length = this.themeTopYs.length;
        for (let i = 0;i < length - 1; i++) {
          if ( this.currentIndex !== i && (i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart: function () {
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.newPrice = this.goods.newPrice;
        product.iid = this.iid;
        // this.$store.dispatch("addCart",product).then(res => {
        //     console.log(res);
        //   });
        this.addCart(product).then(res => {
          // this.show = true;
          // this.message = res;
          // setTimeout(()=> {
          //   this.show=false;
          //   this.message=''
          // },1500)
          console.log(this.$toast);
          this.$toast.show(res)
        })
      },
      changeIid(iid) {
        switch (iid) {
          case "1m8va40":
            this.topImages = [
              "https://s11.mogucdn.com/mlcdn/c45406/171023_04flc0ek080de66bae4i5f8jl944h_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s11.mogucdn.com/mlcdn/c45406/171023_6ki1920i0f2d4911487j945f3b45c_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/171023_85b6a72id95309f97b5f0d6aleeh9_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/171023_6k18eg94d60a47fgc7ai19i3dd6c6_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s11.mogucdn.com/mlcdn/c45406/171023_75e468226i98hdjhifbk6cfk08c2g_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/171023_34ld7hi810g0lji141224bdfdcgfg_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/170906_21g859hd58gg28bb0jfhe2cde6h6h_640x960.jpg_640x960.v1cAC.70.webp"
            ];
            this.goods = new Goods(
              {
                "title": "秋季新款薄款针织衫百搭宽松显瘦针织V领毛衣打底衫女韩版上衣",
                "desc": "新款上市~",
                "price": 38.50,
                "oldPrice": 69.00,
                "discountDesc": "活动价",
                "highNowPrice": 38.50
              },
              ["销量 1580", "收藏33人", "默认快递"],
              [
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "退货补运费"
                },
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "全国包邮"
                },
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "7填无理由退货"
                },
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "72小时发货"
                }]);
            this.shop = new Shop({
              "shopLogo": "https://s11.mogucdn.com/mlcdn/c45406/180918_88id3kd9377h2f05c8e167la60gi9_200x200.jpg_120x120.webp",
              "name": "intercrew官方旗舰店",
              "cFans": 17145,
              "cSells": 57876,
              "score": [
                {"isBetter": false, "name": "描述相符", "score": 4.64},
                {"isBetter": true, "name": "价格合理", "score": 5},
                {"isBetter": false, "name": "质量满意", "score": 4.62}
              ],
              "cGoods": 99
            });
            this.detailInfo = {
              "desc":"intercrew衬衫女2019春秋新款长袖韩版时尚百搭纯色立领长袖衬衫女  ICR3YS51W~",
              "detailImage":
                [{
                  "key":"穿着效果",
                  "list":[
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_0bga1fi946f6gcbk0c6jje6i0h7h8_750x510.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_1625cj819lb58iid7cbfl3c115djj_750x801.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_64h3b8kljb4a2d36jl4eb8ec5ech7_750x983.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_2a54e9d296e3d051l54i9e00l2gid_750x528.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_422151c4l1fai3jd1gf144k307fed_749x749.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_7hcgc9e52ea3785i7faeeb730h3l4_749x750.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_122jfj4838bdcdkk97h03j1l72d06_749x750.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_3aak0b8h6j9faa648gc19cdeka90k_749x753.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_5lkhl33fb5222l51lieifi05a9c16_749x756.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_6b96alh5d6be2d96d0a9c9k868icc_749x751.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_1964e06hhj09fjeb436jkgl07bbk5_749x748.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_45j4hcj08cd1c18hlj3c3jbjcaeh5_749x765.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_5968h3j9dk378lgi0b0l58j35gd54_749x766.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_89326g131f53f1a11c5203kkg5la1_749x766.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_11fkhaid1cc69k60jf7kgke59l7e5_749x766.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_11fkhaid1cc69k60jf7kgke59l7e5_749x766.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_1d3egk82a570ce1b25l4l2j9j6b3d_749x748.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_4f2a3k273390ejj4j49id6i7c7f00_749x749.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_4i9d4b353ffkhdl897ag00182lc0a_749x750.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_50655f457ce1l62e19b3lefdf7gj5_749x670.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_52d5hkiaba491d8l0ai70c49fkch7_749x747.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_6hh789e409k4db428f5i948he0fg5_749x755.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_4fc74ehbd43g1b7jdieejjak6b8gf_749x750.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_77028adjgd077ei2i6j3g21j8j5lh_749x752.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_1hkbdgj223cac54akg9c62g6a2kh9_749x750.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/171023_04f9e9hc9a8gfhehi2la3j731851k_749x749.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/171023_17hfa0i129j3ibif81663dibl4h00_749x747.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c024f5/190417_2d51ljj2a42lddkg49ibag494g3ca_1125x540.png_468x468.webp"
                  ]
                }]
            };
            this.paramInfo = new GoodsParam(
              {"image":"",
                "set": [
                  {"key":"图案","value": "纯色"},
                  {"key":"厚薄","value": "普通"},
                  {"key":"颜色","value": "砖红色,蓝色,墨绿,卡其色"},
                  {"key":"尺码","value": "均码"},
                  {"key":"衣长","value": "常规款（51-65cm）"},
                  {"key":"版型","value": "宽松"},
                  {"key":"季节","value": "春秋"},
                  {"key":"材质","value": "针织"},
                  {"key":"领型","value": "V领"},
                  {"key":"元素","value": "镂空,蝴蝶结"},
                  {"key":"袖长","value": "长袖"},
                  {"key":"风格","value": "简约"}
                ]},
              {"tables":[[
                  ["尺码","M","L","XL","XXL"],
                  ["衣长","61.5","63","64.5","66"],
                  ["胸围","98","104","110","116"],
                  ["袖长","63","66","68.5","70.5"],
                ]]}
            );
            this.commentInfo = {
              "user":{
                "avatar":"https://s5.mogucdn.com/mlcdn/5abf39/180828_72iekbj54d71e6j2ga23eli07f294_132x132.jpg_48x48.webp",
                "uname":"暖色花雨Myra"
              },
              "content":"非常满意，没有色差，做工满意，态度很好，物流也快，值得购买",
              "created":1535694719,
              "style":"颜色：白（5866）尺码：M",
              "images":[
                "https://s5.mogucdn.com/mlcdn/c45406/190816_74gcj217ejh8aha658gf9b32e0b47_540x1080.jpg_240x240.v1cAC.40.webp",
                "https://s11.mogucdn.com/mlcdn/c45406/181223_6b2f7ie9799lf9fg951c2d1c66d82_1079x1440.jpg_240x240.v1cAC.40.webp"
              ]
            };
            break;
          case "1m8sxmy":
            this.topImages = [
              "https://s5.mogucdn.com/mlcdn/c45406/180920_27bg61c97d4e7h57lke2e577hjl68_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s11.mogucdn.com/mlcdn/c45406/180920_62eaa44d0fh0cikf8b3bii9le2264_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/180920_6adg5148i6ij52bj599c7c788lb2k_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s11.mogucdn.com/mlcdn/c45406/180920_79a161a44kl63gb4i2938i1e7k05d_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/180920_3g5kgjflkg5c28eahe1374k8ckh1c_640x960.jpg_640x960.v1cAC.70.webp"
            ];
            this.goods = new Goods(
              {
                "title": "白色卫衣女薄款慵懒风2018新款宽松韩版学生百搭圆领套头春秋长袖卫衣",
                "desc": "新款上市~",
                "price": 38.50,
                "oldPrice": 69.00,
                "discountDesc": "活动价",
                "highNowPrice": 38.50
              },
              ["销量 1580", "收藏33人", "默认快递"],
              [
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "退货补运费"
                },
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "全国包邮"
                },
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "7填无理由退货"
                },
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "72小时发货"
                }]);
            this.shop = new Shop({
              "shopLogo": "https://s5.mogucdn.com/mlcdn/c45406/181201_07i6d2j0fccdi3jf31bghhkk91d05_200x200.jpg_120x120.webp",
              "name": "女王达人馆 ",
              "cFans": 17145,
              "cSells": 57876,
              "score": [
                {"isBetter": false, "name": "描述相符", "score": 4.64},
                {"isBetter": true, "name": "价格合理", "score": 5},
                {"isBetter": false, "name": "质量满意", "score": 4.62}
              ],
              "cGoods": 99
            });
            this.detailInfo = {
              "desc":"时尚翻领衬衫裙高腰拉链PU皮短裙两件套条纹连衣裙",
              "detailImage":
                [{
                  "key":"穿着效果",
                  "list":[
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_1e62a637a5gkc9gli62k88i1hihj5_790x961.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_2ce082l295d9h7f73hdc8ie4b99de_790x706.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_16ej9gfcfj48ilbaeke88e6kjgj5i_790x872.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_3l942f0ckd1icgfgig8ffjb91jah3_790x617.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_3i9e1hejb676d2bid54fa27b7j5b3_790x885.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_3e8ahg88249i8li49gjb7cjjfg202_790x682.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_665i5feddg980iaj9i91bg95236ek_790x759.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_0lklflg25e8665i2ij2ihi24e0lhb_790x405.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_4hjl21hbi35f0ih19lla6lh7bhffg_790x711.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_2he76h9fa1ee8hdae829a6bg8cf3i_790x690.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_0likfh3jaa7471g7k5580dej56gi4_790x681.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_6007i94b35lgh7c9ahdh901j47li8_790x655.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_7a31bj5dh39efki63lj8ahila6e29_790x650.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_73e5ffg6kjg2el1ci21j40bi0gb9e_790x939.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_3h2alddd9fh0gc9a5lkaah8blb2ac_790x474.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_0g20h4fbl8la49kh7cf7ddb7a0ecg_790x378.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_69a61g5cdhc743k862fka4deh5a34_790x409.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c024f5/190417_2d51ljj2a42lddkg49ibag494g3ca_1125x540.png_468x468.webp",
                  ]
                }]
            };
            this.paramInfo = new GoodsParam(
              {"image":"",
                "set": [
                  {"key":"图案","value": "纯色"},
                  {"key":"厚薄","value": "普通"},
                  {"key":"颜色","value": "砖红色,蓝色,墨绿,卡其色"},
                  {"key":"尺码","value": "均码"},
                  {"key":"衣长","value": "常规款（51-65cm）"},
                  {"key":"版型","value": "宽松"},
                  {"key":"季节","value": "春秋"},
                  {"key":"材质","value": "针织"},
                  {"key":"领型","value": "V领"},
                  {"key":"元素","value": "镂空,蝴蝶结"},
                  {"key":"袖长","value": "长袖"},
                  {"key":"风格","value": "简约"}
                ]},
              {"tables":[[
                  ["尺码","M","L","XL","XXL"],
                  ["衣长","61.5","63","64.5","66"],
                  ["胸围","98","104","110","116"],
                  ["袖长","63","66","68.5","70.5"],
                ]]}
            );
            this.commentInfo = {
              "user":{
                "avatar":"https://s5.mogucdn.com/mlcdn/5abf39/180828_72iekbj54d71e6j2ga23eli07f294_132x132.jpg_48x48.webp",
                "uname":"暖色花雨Myra"
              },
              "content":"非常满意，没有色差，做工满意，态度很好，物流也快，值得购买",
              "created":"1535694719",
              "style":"颜色：白（5866）尺码：M",
              "images":[
                "https://s5.mogucdn.com/mlcdn/c45406/190816_74gcj217ejh8aha658gf9b32e0b47_540x1080.jpg_240x240.v1cAC.40.webp",
                "https://s11.mogucdn.com/mlcdn/c45406/181223_6b2f7ie9799lf9fg951c2d1c66d82_1079x1440.jpg_240x240.v1cAC.40.webp"
              ]
            };
            break;
          case "1m8xkxk":
            this.topImages = [
              "https://s11.mogucdn.com/mlcdn/55cf19/180813_87f04jll31hl8ij9f3d0b59349c95_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s11.mogucdn.com/mlcdn/55cf19/180813_1dd8blhi5j6f3h34lhk4ckbe48dbh_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s5.mogucdn.com/mlcdn/55cf19/180813_2f881lbk9g90i3k2243l5e7f351li_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s11.mogucdn.com/mlcdn/55cf19/180813_713794acdcbk5j51baa5j2a2aaekb_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s11.mogucdn.com/mlcdn/55cf19/180813_3hhdlic77gk0kged4ajbck517ie98_640x960.jpg_640x960.v1cAC.70.webp",
              "https://s11.mogucdn.com/mlcdn/55cf19/180813_8dkkl5jie8c63e4j788hli0k85j6c_640x960.jpg_640x960.v1cAC.70.webp"
            ];
            this.goods = new Goods(
              {
                "title": "2019秋冬新款百搭打底衫白色衬衫女加绒韩版宽松灯笼长袖上衣",
                "desc": "新款上市~",
                "price": 38.50,
                "oldPrice": 69.00,
                "discountDesc": "活动价",
                "highNowPrice": 38.50
              },
              ["销量 1580", "收藏33人", "默认快递"],
              [
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "退货补运费"
                },
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "全国包邮"
                },
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "7填无理由退货"
                },
                {
                  "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp",
                  "name": "72小时发货"
                }]);
            this.shop = new Shop({
              "shopLogo": "https://s5.mogucdn.com/b7/pic/150429/1jscjq_iezwcyrumu4weytegazdambqgyyde_320x320.jpg_120x120.webp",
              "name": "仲陌美",
              "cFans": 17145,
              "cSells": 57876,
              "score": [
                {"isBetter": false, "name": "描述相符", "score": 4.64},
                {"isBetter": true, "name": "价格合理", "score": 5},
                {"isBetter": false, "name": "质量满意", "score": 4.62}
              ],
              "cGoods": 99
            });
            this.detailInfo = {
              "desc":"新款上市~",
              "detailImage":
                [{
                  "key":"穿着效果",
                  "list":[
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_1e62a637a5gkc9gli62k88i1hihj5_790x961.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_2ce082l295d9h7f73hdc8ie4b99de_790x706.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_16ej9gfcfj48ilbaeke88e6kjgj5i_790x872.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_3l942f0ckd1icgfgig8ffjb91jah3_790x617.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_3i9e1hejb676d2bid54fa27b7j5b3_790x885.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_3e8ahg88249i8li49gjb7cjjfg202_790x682.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_665i5feddg980iaj9i91bg95236ek_790x759.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_0lklflg25e8665i2ij2ihi24e0lhb_790x405.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_4hjl21hbi35f0ih19lla6lh7bhffg_790x711.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_2he76h9fa1ee8hdae829a6bg8cf3i_790x690.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_0likfh3jaa7471g7k5580dej56gi4_790x681.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_6007i94b35lgh7c9ahdh901j47li8_790x655.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_7a31bj5dh39efki63lj8ahila6e29_790x650.jpg_468x468.webp",
                    "https://s5.mogucdn.com/mlcdn/c45406/180923_73e5ffg6kjg2el1ci21j40bi0gb9e_790x939.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_3h2alddd9fh0gc9a5lkaah8blb2ac_790x474.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_0g20h4fbl8la49kh7cf7ddb7a0ecg_790x378.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c45406/180923_69a61g5cdhc743k862fka4deh5a34_790x409.jpg_468x468.webp",
                    "https://s11.mogucdn.com/mlcdn/c024f5/190417_2d51ljj2a42lddkg49ibag494g3ca_1125x540.png_468x468.webp",
                  ]
                }]
            };
            this.paramInfo = new GoodsParam(
              {"image":"",
                "set": [
                  {"key":"图案","value": "纯色"},
                  {"key":"厚薄","value": "普通"},
                  {"key":"颜色","value": "砖红色,蓝色,墨绿,卡其色"},
                  {"key":"尺码","value": "均码"},
                  {"key":"衣长","value": "常规款（51-65cm）"},
                  {"key":"版型","value": "宽松"},
                  {"key":"季节","value": "春秋"},
                  {"key":"材质","value": "针织"},
                  {"key":"领型","value": "V领"},
                  {"key":"元素","value": "镂空,蝴蝶结"},
                  {"key":"袖长","value": "长袖"},
                  {"key":"风格","value": "简约"}
                ]},
              {"tables":[[
                  ["尺码","M","L","XL","XXL"],
                  ["衣长","61.5","63","64.5","66"],
                  ["胸围","98","104","110","116"],
                  ["袖长","63","66","68.5","70.5"],
                ]]}
            );
            this.commentInfo = {
              "user":{
                "avatar":"https://s5.mogucdn.com/mlcdn/5abf39/180828_72iekbj54d71e6j2ga23eli07f294_132x132.jpg_48x48.webp",
                "uname":"暖色花雨Myra"
              },
              "content":"非常满意，没有色差，做工满意，态度很好，物流也快，值得购买",
              "created":"1535694719",
              "style":"颜色：白（5866）尺码：M",
              "images":[
                "https://s5.mogucdn.com/mlcdn/c45406/190816_74gcj217ejh8aha658gf9b32e0b47_540x1080.jpg_240x240.v1cAC.40.webp",
                "https://s11.mogucdn.com/mlcdn/c45406/181223_6b2f7ie9799lf9fg951c2d1c66d82_1079x1440.jpg_240x240.v1cAC.40.webp"
              ]
            };
            break;
        }
        this.recommend = [
          {"image":"https://s11.mogucdn.com/mlcdn/c45406/191212_6fdi3g078fcl2d7jlfkgl92lbd5lg_5251x6999.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8va40"},
          {"image":"https://s5.mogucdn.com/mlcdn/c45406/191004_18j12k800af5h76l1b328a65hcaba_4501x5999.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8sxmy"},
          {"image":"https://s5.mogucdn.com/mlcdn/c45406/191212_25il8j636gkf2f77bk60ah7b839jf_5251x6999.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8xkxk"},
          {"image":"https://s5.mogucdn.com/mlcdn/c45406/180916_66bfbj9g0e2aki6l086glb059k8h5_640x853.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8va40"},
          {"image":"https://s5.mogucdn.com/mlcdn/c45406/180422_30d3791k9g16gb1bhcgaca98h3703_640x960.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8sxmy"},
          {"image":"https://s11.mogucdn.com/mlcdn/c45406/191209_4ahj5g0ke8ci7cl7bbiahii8k2ja9_5251x6999.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8xkxk"},
          {"image":"https://s11.mogucdn.com/mlcdn/c45406/190322_5da1f24keei45l2kk53jj8jfdifkl_640x853.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8va40"},
          {"image":"https://s5.mogucdn.com/mlcdn/c45406/190521_0gk84gbk6hfec99j7i2gj70a5clbc_640x960.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8sxmy"},
          {"image":"https://s11.mogucdn.com/mlcdn/c45406/190820_022kh84gk1ci70i91j3h62i4if431_640x960.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8xkxk"},
          {"image":"https://s11.mogucdn.com/mlcdn/c45406/191212_6fdi3g078fcl2d7jlfkgl92lbd5lg_5251x6999.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8va40"},
          {"image":"https://s5.mogucdn.com/mlcdn/c45406/170730_8chfi2heeb44hife2d99fkfa3bk56_640x960.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8sxmy"},
          {"image":"https://s11.mogucdn.com/mlcdn/c45406/191126_46glcfl7i4d2fcj0c148k279lde06_3332x4999.jpg_320x999.webp",
            "title":"秋装2019年新款梗桔初恋小黑裙长裙秋冬气质御姐风新品裙子女",
            "price":"¥79",
            "cfav":10,"iid":"1m8xkxk"},
        ];
        this.getThemeTopY = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE);
        },1000)

      }
    },
    mounted() {

    },
    // watch: {
    //   $route(to, from) {
    //     this.reload();
    //   }
    // },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
      if (to.fullPath !== from.fullPath){
        next();
        this.changeIid(to.params.iid);
        this.$refs.scroll.scrollTo(0,0,0)
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .content {
    position: absolute;
    top: 51px;
    bottom: 58px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
