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
          <q-card-section>
            <div class="b-logon">
              <q-form ref="logonForm" v-model="logonFormValid">
                <h3 class="text-uppercase">SIRI</h3>
                <!-- 用户名 -->
                <q-input
                  v-model="logonForm.username"
                  class="logon-input"
                  clearable
                  standout="bg-cyan text-white"
                  bottom-slots
                  :label="$t('login.username')"
                  :error="$v.logonForm.username.$dirty && $v.logonForm.username.$invalid"
                  :error-message="$t('error.login.usernameRequire')"
                  @input="$v.logonForm.username.$touch()"
                  @blur="$v.logonForm.username.$touch()"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
                <!-- 密码 -->
                <q-input
                  v-model="logonForm.password"
                  class="logon-input"
                  standout="bg-cyan text-white"
                  bottom-slots
                  counter
                  :maxlength="passwordMaxLength"
                  :type="isPwd ? 'password' : 'text'"
                  :label="$t('login.password')"
                  :error="$v.logonForm.password.$dirty && $v.logonForm.password.$invalid"
                  :error-message="logonPasswordErrors"
                  @blur="$v.logonForm.password.$touch()"
                >
                  <template v-slot:prepend>
                    <q-icon name="vpn_key" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <q-btn
                  :loading="loading"
                  class="logon-btn bg-logon-card-input"
                  text-color="white"
                  unelevated
                  label=""
                  style="font-size: large;"
                  @click="handleLogon"
                >登 录 系 统
                </q-btn>
              </q-form>
            </div>
            <div class="btn-wrapper row justify-between">
              <q-btn flat label="忘记密码" />
              <q-btn outline label="我要注册" @click="handleSwitchRegister" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

</template>

<script>
import LottieWebCimo from '../../components/LottieWebCimo/lottie-web-cimo'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Logon',
  components: { LottieWebCimo },
  data() {
    return {
      isPwd: true,
      registerFormValid: false,
      phoneNumMaxLength: 11,
      logonFormValid: false,
      logonForm: {
        username: '',
        password: ''
      },
      passwordMaxLength: 18,
      defaultOptions: {
        path: 'https://assets9.lottiefiles.com/packages/lf20_vo0a1yca.json',
        loop: true
      },
      loading: false,
      percentage: 0,
      isLottieF: false
    }
  },

  validations: {
    logonForm: {
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },

  computed: {
    logonPasswordErrors() {
      if(!this.$v.logonForm.password.$dirty) return ''
      if(!this.$v.logonForm.password.required) {
        return this._i18n.t('error.login.passwordRequire')
      }
      if(!this.$v.logonForm.password.maxLength) {
        return this._i18n.t('error.login.passwordMinLength')
      }
      return ''
    }
  },

  methods: {
    /**
     * 登陆功能
     */
    handleLogon() {
      this._commonHandle.handleShowLoading()
      this.$v.$touch()
      if(!this.$v.logonForm.$invalid) {
        this.$store.dispatch('user/login', this.logonForm).then(res => {
          if(res.code === this._constant.srCode.SUCCESS) {
            this._commonHandle.handleHideLoading()
            this._commonHandle.handleNotify({
              type: this._constant.notify.notifyType.POSITIVE,
              message: this._i18n.t('login.logonSuccess')
            })
            this.$router.push('/')
          }
        }).catch(error => {
          this._commonHandle.handleNotify({
            type: this._constant.notify.notifyType.NEGATIVE,
            message: this._i18n.t('error.login.logonFailed')
          })
          console.error(error)
        })
      } else {
        console.error('failed')
      }
    },
    // json动画加载完成
    handleFinish(e) {
      this.isLottieF = e
    },
    /**
     * 切换到注册页面
     */
    handleSwitchRegister() {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style scoped>
  .logon-btn {
    font-size: large;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }
</style>
