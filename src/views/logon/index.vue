<template>

  <div class="unit-logon flex justify-center items-center">

    <div class="row base-card-shadow">
      <div v-show="$q.screen.gt.sm" class="col-6 flex justify-center items-center ">
        <q-skeleton v-if="!isLottieF" class="logon-skeleton" type="text" />
        <lottie-web-cimo class="logon-lottie" :path="defaultOptions.path" @isLottieFinish="handleFinish" />
      </div>
      <q-separator v-if="$q.screen.gt.sm" vertical inset />
      <div class="col flex justify-center items-center">
        <q-card square class="no-shadow">
          <login v-if="panelCode === 1" @switchPanel="handleSwitchPanel" />
          <register v-if="panelCode === 2" @switchPanel="handleSwitchPanel" />
          <forget-password v-if="panelCode === 3" @switchPanel="handleSwitchPanel" />
        </q-card>
      </div>
    </div>
  </div>

</template>

<script>
import LottieWebCimo from '@/components/LottieWebCimo/lottie-web-cimo'
import login from './login/index'
import register from './register/index'
import forgetPassword from './forget-password/index'
export default {
  name: 'Logon',
  components: { LottieWebCimo, login, register, forgetPassword },
  data() {
    return {
      panelCode: 1,
      isLottieF: false,
      defaultOptions: {
        path: 'https://assets9.lottiefiles.com/packages/lf20_vo0a1yca.json',
        loop: true
      }
    }
  },
  methods: {
    // json动画加载完成
    handleFinish(e) {
      this.isLottieF = e
    },

    // 切换登录注册
    handleSwitchPanel(flag) {
      this.panelCode = flag
    }
  }
}
</script>
