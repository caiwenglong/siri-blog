<template>

  <div class="unit unit-home">
    <div>
      <div class="tip-menu">
        <p>HI，欢迎来到SIRI博客网，博客网站使用说明：</p>
        <ol>
          <li>右击主页菜单添加一级菜单，右击创建的一级菜单来添加子菜单</li>
          <li>菜单的图标可以在图标集合中单击复制图标名称到添加菜单的图标类名中即可</li>
        </ol>
      </div>
    </div>
    <div class="home-lottie">
      <q-skeleton v-if="!isLottieF" type="text" height="150px" />
      <lottie-web-cimo class="lottie-lg" :animation-data="defaultOptions.animationData" @isLottieFinish="handleLottieFinish" />
    </div>
  </div>

</template>

<script>
import LottieWebCimo from '@/components/LottieWebCimo/lottie-web-cimo'
import * as animationData from '@/assets/lottie/lf20_gzl797gs.json'
export default {
  name: 'Home',
  components: {
    LottieWebCimo
  },
  data() {
    return {
      defaultOptions: {
        animationData: animationData.default,
        loop: true
      },
      isLottieF: false
    }
  },

  methods: {
    handleLottieFinish(e) {
      this.isLottieF = e
    }
  }
}
</script>
<style lang="scss" scoped>
  .tip-menu {
    margin: 20px;
    color: lightslategray;
  }
</style>
