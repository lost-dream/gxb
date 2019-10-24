<template>
  <div class="index-list">
    <div class="container">
      <router-view />
    </div>
    <ul class="tabs">
      <router-link class="index" tag="li" :to="{ name: 'homepage' }">
        <div></div>
        <p>首页</p>
      </router-link>
      <router-link class="loan-market" tag="li" :to="{ name: 'loanMarket' }">
        <div></div>
        <p>贷款超市</p>
      </router-link>
      <router-link class="find" tag="li" :to="{ name: 'find' }">
        <div></div>
        <p>发现</p>
      </router-link>
      <router-link tag="li" class="mine" :to="{ name: 'mine' }">
        <div></div>
        <p>我的</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'indexList'
};
</script>

<style lang="scss" scoped>
.index-list {
  @include cube(100vw, 100vh);
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
    overflow: hidden;
  }
  .tabs {
    @include cube(100%, 1rem);
    box-shadow: 0 -1px 0.04rem 0 rgba(0, 0, 0, 0.05);
    background: #fff;
    display: flex;
    justify-content: space-between;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 0.05rem;
      div {
        @include square(0.5rem);
        margin: 0 auto;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
      p {
        margin-top: 0.02rem;
        color: $color-theme-gray;
      }
      &.router-link-exact-active {
        p {
          color: $color-theme-light;
        }
      }

      $navOptions: (
        index: (
          imageName: index
        ),
        loan-market: (
          imageName: market
        ),
        find: (
          imageName: find
        ),
        mine: (
          imageName: my
        )
      );

      @each $key, $value in $navOptions {
        &.#{$key} {
          div {
            background-image: url('./images/#{map_get($value, imageName)}@3x.png');
          }
        }
        &.router-link-exact-active.#{$key} {
          div {
            background-image: url('./images/#{map_get($value, imageName)}_ac@3x.png');
          }
        }
      }
    }
  }
}
</style>
