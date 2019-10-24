<template>
  <div class="homepage">
    <header>
      <h1>果信宝</h1>
      <div @click="JumpTo('login')">登录/注册</div>
    </header>
    <BScroll
      class="scroll-wrapper"
      :listenScroll="listenScroll"
      @scroll="scroll"
    >
      <section>
        <div class="swiper-container" id="banner">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in banners"
              :key="index"
            >
              <a :href="item.dest_url">
                <img :src="item.img_url" alt="" />
              </a>
            </div>
          </div>
          <div class="swiper-pagination banner-dot"></div>
        </div>
        <ul class="tab-nav">
          <li @click="JumpTo('creditCard')">
            <img src="./images/credit_card.png" alt="" />
            <span>信用卡</span>
          </li>
          <li @click="JumpTo('creditReport')">
            <img src="./images/credit_report.png" alt="" />
            <span>信评报告</span>
          </li>
        </ul>
        <div class="notice-wrapper">
          <div class="title"></div>
          <div class="swiper-container" id="notice">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(notice, index) in notices"
                :key="index"
                v-html="notice.message"
              ></div>
            </div>
          </div>
        </div>
        <div class="recommend-container">
          <header>
            <p>贷款推荐</p>
          </header>
          <ul class="recommend-wrapper">
            <li v-for="(recommend, index) in recommends" :key="index">
              <img :src="recommend.img_url" alt="" />
              <section>
                <h3>{{ recommend.loan_name }}</h3>
                <p v-if="recommend.amount.maximum <= 100000">
                  最高可贷<span>{{ recommend.amount.maximum }}元</span>
                </p>
                <p v-else>
                  最高可贷<span>{{ recommend.amount.maximum / 10000 }}万</span>
                </p>
              </section>
            </li>
          </ul>
        </div>
      </section>
    </BScroll>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import Swiper from 'swiper';
import BScroll from '@/components/BScroll';
import mixins from '@/assets/js/vue_mixins';
import {
  getAccessToken,
  getBanner,
  getNotice,
  getRecommend
} from '@/api/homepage';

export default {
  name: 'homepage',
  components: {
    BScroll
  },
  mixins: [mixins],
  data() {
    return {
      listenScroll: true,
      banners: [],
      notices: [],
      recommends: []
    };
  },
  methods: {
    initBanner() {
      new Swiper('#banner', {
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      });
    },
    initNotice() {
      new Swiper('#notice', {
        loop: true,
        direction: 'vertical',
        autoplay: true
      });
    },
    scroll(pos) {
      console.log(pos.y);
    }
  },
  mounted() {
    const $this = this;
    (async function initHomePage() {
      // 生成access_token
      await getAccessToken().then(res => {
        const { access_token } = res.data;
        console.log(`access_token === ${access_token}`);
        Cookie.set('ac_token', access_token);
      });
      // 获取首页banner
      await getBanner().then(res => {
        $this.banners = res.data.items;
      });
      // 初始化banner
      await $this.initBanner();
      // 获取公告数据
      await getNotice().then(res => {
        let { items } = res.data;
        items.map(value1 => {
          value1.highlight.map(value2 => {
            value1.message = value1.message.replace(
              new RegExp(value2, 'g'),
              `<span>${value2}</span>`
            );
          });
        });
        $this.notices = items;
      });
      // 初始化公告
      await $this.initNotice();
      // 获取贷款推荐数据
      await getRecommend({ recommend: 1 }).then(res => {
        $this.recommends = res.data.items;
      });
    })();
  }
};
</script>

<style lang="scss" scoped>
.homepage {
  height: 100%;
  .scroll-wrapper {
    height: 100%;
    overflow: hidden;
  }
  > header {
    @include cube(100%, 0.88rem);
    text-align: center;
    line-height: 0.88rem;
    color: $color-main;
    position: absolute;
    z-index: 9999;
    top: 0;
    h1 {
      font-size: 0.32rem;
      color: #ffb41f;
    }
    div {
      position: absolute;
      right: 0.6rem;
      top: 0;
      font-size: 0.24rem;
      color: #fff;
    }
  }
  #banner {
    @include cube(100%, 5rem);
    img {
      @include cube();
    }
    /deep/.banner-dot {
      bottom: 1.1rem;
      span {
        @include square(6px);
        background: #fff;
      }
    }
  }
  .tab-nav {
    position: relative;
    z-index: 9;
    @include cube(7.04rem, 1.34rem);
    border-radius: 0.06rem;
    margin: -0.9rem auto 0.3rem;
    box-shadow: 0 0.05rem 0.05rem #eee;
    background: #fff;
    display: flex;
    justify-content: space-between;
    li {
      flex: 1;
      @include cube();
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.26rem;
      color: #333333;
      img {
        @include square(0.6rem);
        margin-right: 0.3rem;
      }
    }
  }
  .notice-wrapper {
    position: relative;
    box-sizing: border-box;
    @include cube(100%, 0.76rem);
    @include border-bottom-1px(#eee);
    padding: 0 0.3rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    .title {
      @include cube(1.4rem);
      background: url('./images/pan_live.png') 0 / contain no-repeat;
    }
    #notice {
      flex: 1;
      margin-left: 0.2rem;
      /deep/.swiper-slide {
        line-height: 0.76rem;
        font-size: 0.26rem;
        color: #999999;
        @include no-wrap;
        span {
          color: $color-theme;
        }
      }
    }
  }
  .recommend-container {
    background: #fff;
    header {
      box-sizing: border-box;
      @include cube(100%, 0.74rem);
      padding: 0.2rem 0.3rem;
      p {
        border-left: 2px solid #ff640e;
        padding-left: 0.2rem;
        font-size: 0.3rem;
      }
    }
    .recommend-wrapper {
      display: flex;
      flex-wrap: wrap;
      li {
        box-sizing: border-box;
        @include cube(50%, 1.32rem);
        padding-left: 0.5rem;
        @include border-right-1px(#eee);
        @include border-bottom-1px(#eee);
        display: flex;
        align-items: center;
        img {
          @include square(0.66rem);
          border-radius: 0.06rem;
          margin-right: 0.3rem;
        }
        h3 {
          font-size: 0.3rem;
          line-height: 1.5;
        }
        p {
          font-size: 0.22rem;
          color: #999;
          span {
            color: $color-theme;
          }
        }
      }
    }
  }
}
</style>
