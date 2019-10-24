<!-- better-scroll 滚动组件 -->

<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    // 是否监听滚动位置
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 是否开启上拉加载
    pullup: {
      type: Boolean,
      default: false
    },
    // 是否开启下拉刷新
    pulldown: {
      type: Boolean,
      default: false
    },
    // 是否开启松开刷新
    touchend: {
      type: Boolean,
      default: false
    },
    // 滚动前是否触发事件，如：滚动前让输入框失去焦点，避免滚动搜索结果时移动端键盘遮挡
    beforeScroll: {
      type: Boolean,
      default: false
    },
    // 延迟刷新
    refreshDelay: {
      type: Number,
      default: 20
    },
    stopPropagation: {
      type: Boolean,
      default: false
    },
    preventDefaultException: {
      type: Object,
      default: function() {
        return { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|SPAN|LABEL|DIV)$/ };
      }
    },
    /* eslint-disable */
    eventPassthrough: 'horizontal'
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }

      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        stopPropagation: this.stopPropagation,
        preventDefaultException: this.preventDefaultException
      });
      if (this.eventPassthrough) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          stopPropagation: this.stopPropagation,
          preventDefaultException: this.preventDefaultException,
          eventPassthrough: this.eventPassthrough
        });
      }
      // 派发监听滚动位置事件
      if (this.listenScroll) {
        let me = this;
        this.scroll.on('scroll', pos => {
          // 向父组件传值
          me.$emit('scroll', pos);
        });
      }
      // 派发监听手指松开事件
      if (this.touchend) {
        let me = this;
        this.scroll.on('touchEnd', pos => {
          // 向父组件传值
          me.$emit('pulldownTouchend', pos);
        });
      }
      // 派发上拉加载事件
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            // 滑动到底部了
            this.$emit('scrollToEnd');
          }
        });
      }
      // 派发下拉刷新事件
      if (this.pulldown) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y >= 0) {
            // 滑动到顶部了
            this.$emit('scrollToTop');
          }
        });
      }

      // 滚动前是否触发事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll');
        });
      }
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    destroy() {
      this.scroll && this.scroll.destroy();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  }
};
</script>

<style lang="scss" scoped></style>
