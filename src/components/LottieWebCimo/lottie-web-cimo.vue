<template>
  <div ref="lottieBox" />
</template>

<script>
import lottie from 'lottie-web'
// throttle 返回一个新的函数，新函数节流限制一定时间内一个函数可调用的最大次数。 如“每X毫秒最多执行一次该功能”。
import { throttle } from 'quasar'

export default {
  name: 'LottieWebCimo',
  // eslint-disable-next-line vue/require-prop-types
  props: ['animationData', 'path', 'loop', 'animationSpeed'],
  data() {
    return {
      lottie: {}
    }
  },
  watch: {
    animationSpeed: function(n, o) {
      this.onSpeedChange()
    }
  },
  created() {
    this.initLottie = throttle(this.initLottie, 1000)
  },
  mounted() {
    this.initLottie()
  },
  methods: {

    stop: function() {
      this.lottie.stop()
    },

    play: function() {
      this.lottie.play()
    },

    pause: function() {
      this.lottie.pause()
    },

    onSpeedChange: function() {
      this.lottie.setSpeed(this.animationSpeed)
    },

    isLottieFinish: function() {
      this.$emit('isLottieFinish', true)
    },

    initLottie: function() {
      this.lottie = lottie.loadAnimation({
        container: this.$refs.lottieBox,
        renderer: 'svg',
        loop: this.loop || true,
        animationData: this.animationData,
        // 如果需要用到路径请求，请使用 path ，lottie 如果 animationData 为空 ，则自动选择 path
        path: this.path
      })
      this.isLottieFinish()
    }

  }
}
</script>
