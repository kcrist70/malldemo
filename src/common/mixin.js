import {debounce} from "common/utils";
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newrefresh: null
    }
  },
  mounted() {
    this.newrefresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      this.newrefresh ()
    };
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
};

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
    backclick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
  }
};
