<template>

  <div class="unit unit-home">
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
</style>
