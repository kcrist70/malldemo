<template>
  <div id="detail">
  <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import {getDetail,Goods} from "network/detail";
  import DetailSwiper from './childComps/DetailSwiper'
  export default {
    name: "Detail",
    data(){
      return {
        iid: null,
        topImages: [],
        goods: null

      }
    },
    created(){
      this.iid = this.$route.params.iid;
      // getDetail(this.iid).then(res => {
      //   const data = res.result;
      //   this.topImages = data.itemInfo.topImages;
      //   this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // });
      switch(this.iid) {
        case "1m8va40":
          this.topImages = [
            "https://s11.mogucdn.com/mlcdn/c45406/180921_4jgf9j358k2g78b74hjjcc01d5cc5_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/180923_4156d8l3hlba7a9e1h73faed0g7i8_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/180923_3jkaha2615c85a1fkd7936h8daehj_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/180923_865235bb574b342189ik53e081e0g_640x960.jpg_640x960.v1cAC.70.webp"
          ];
          break;
        case "1m8sxmy":
          this.topImages = [
            "https://s5.mogucdn.com/mlcdn/c45406/180920_27bg61c97d4e7h57lke2e577hjl68_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/180920_62eaa44d0fh0cikf8b3bii9le2264_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/180920_6adg5148i6ij52bj599c7c788lb2k_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/180920_79a161a44kl63gb4i2938i1e7k05d_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/180920_3g5kgjflkg5c28eahe1374k8ckh1c_640x960.jpg_640x960.v1cAC.70.webp"
          ];
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
          break;
        default:
          this.topImages = [
            "https://s5.mogucdn.com/mlcdn/55cf19/171116_419jj3he8cibljf2h20k34a53g7g0_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/55cf19/171116_4k12214i5a7i8b9h47c664f5558ka_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/55cf19/171116_14ijfjck234fk3jd2h5ahfccdedh1_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/55cf19/171116_3el351ckk6b2l87gfbg89df6cf833_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/55cf19/171116_8ea216kifcl0chk4ikjf2ci81k801_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/55cf19/171116_37c937e919770d1746l7lcfcc9248_640x960.jpg_640x960.v1cAC.70.webp"
          ];
      }
      switch(this.iid) {
        case "1m8va40":
          this.goods = new Goods(
            {
              "title":"初春女装新款时尚套装裙网红同款甜美气质灯笼袖套头V领毛衣宽松显瘦开叉针织半身裙小个子两件套",
              "desc":"新款上市~",
              "price":"￥38.50",
              "oldPrice":"￥69.00",
              "discountDesc":"活动价",
              "highNowPrice":"38.50"
            },
            ["销量 1580","收藏33人","默认快递"],
            [
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"退货补运费"},
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"全国包邮"},
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"7填无理由退货"},
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"72小时发货"}]);
          break;
        case "1m8sxmy":
          this.goods = new Goods(
            {
              "title":"白色卫衣女薄款慵懒风2018新款宽松韩版学生百搭圆领套头春秋长袖卫衣",
              "desc":"新款上市~",
              "price":"￥38.50",
              "oldPrice":"￥69.00",
              "discountDesc":"活动价",
              "highNowPrice":"38.50"
            },
            ["销量 1580","收藏33人","默认快递"],
            [
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"退货补运费"},
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"全国包邮"},
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"7填无理由退货"},
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"72小时发货"}]);
          break;
        case "1m8xkxk":
          this.goods = new Goods(
            {
              "title":"2019秋冬新款百搭打底衫白色衬衫女加绒韩版宽松灯笼长袖上衣",
              "desc":"新款上市~",
              "price":"￥38.50",
              "oldPrice":"￥69.00",
              "discountDesc":"活动价",
              "highNowPrice":"38.50"
            },
            ["销量 1580","收藏33人","默认快递"],
            [
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"退货补运费"},
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"全国包邮"},
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"7填无理由退货"},
              {"icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp","name":"72小时发货"}]);
          break;
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper
    }
  }
</script>

<style scoped>

</style>
