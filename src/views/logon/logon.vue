<template>

  <div class="flex justify-center items-center" style="height: 100vh">

    <div class="row base-card-shadow" style="width: 60vw;min-width: 300px">
      <div v-show="$q.screen.gt.sm" class="col-6 flex justify-center items-center ">
        <q-skeleton v-if="!isLottieF" type="text" height="70%" width="50%" />
        <lottie-web-cimo class="logon-lottie" :path="defaultOptions.path" @isLottieFinish="handleFinish" />
      </div>
      <q-separator v-if="$q.screen.gt.sm" vertical inset />
      <div class="col flex justify-center items-center">
        <q-card square style="min-width: 290px;height: 100%; width: 60%;" class="no-shadow">
          <q-card-section>
            <div v-if="isRegister" class="b-register">
              <q-form ref="registerForm" v-model="registerFormValid">
                <h3 class="text-uppercase">SIRI</h3>
                <!-- 用户名 -->
                <q-input
                  v-model="registerForm.username"
                  class="logon-input"
                  clearable
                  standout="bg-cyan text-white"
                  bottom-slots
                  :label="$t('login.username')"
                  :error="$v.registerForm.username.$dirty && $v.registerForm.username.$invalid"
                  :error-message="$t('error.login.usernameRequire')"
                  @input="$v.registerForm.username.$touch()"
                  @blur="$v.registerForm.username.$touch()"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
                <!-- 密码 -->
                <q-input
                  v-model="registerForm.password"
                  class="logon-input"
                  standout="bg-cyan text-white"
                  bottom-slots
                  counter
                  :maxlength="passwordMaxLength"
                  :type="isPwd ? 'password' : 'text'"
                  :label="$t('login.password')"
                  :error="$v.registerForm.password.$dirty && $v.registerForm.password.$invalid"
                  :error-message="registerPasswordErrors"
                  @blur="$v.registerForm.password.$touch()"
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

                <!-- 电话号码 -->
                <q-input
                  v-model="registerForm.phoneNum"
                  class="logon-input"
                  clearable
                  standout="bg-cyan text-white"
                  bottom-slots
                  counter
                  :label="$t('login.phoneNum')"
                  :maxlength="phoneNumMaxLength"
                  :error="$v.registerForm.phoneNum.$dirty && $v.registerForm.phoneNum.$invalid"
                  :error-message="phoneNumErrors"
                  @input="$v.registerForm.phoneNum.$touch()"
                  @blur="$v.registerForm.phoneNum.$touch()"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>

                <div class="row q-col-gutter-x-md">
                  <div class="col-8">
                    <!-- 手机验证码 -->
                    <q-input
                      v-model="registerForm.registerCode"
                      class="logon-input"
                      clearable
                      standout="bg-cyan text-white"
                      bottom-slots
                      :label="$t('login.registerCode')"
                      :error="$v.registerForm.registerCode.$dirty && $v.registerForm.registerCode.$invalid"
                      :error-message="$t('error.login.registerCodeRequire')"
                      @input="$v.registerForm.registerCode.$touch()"
                      @blur="$v.registerForm.registerCode.$touch()"
                    >
                      <template v-slot:prepend>
                        <q-icon name="account_circle" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-4">
                    <q-btn
                      class="bg-logon-card-input"
                      text-color="white"
                      unelevated
                      :loading="sendCodeLoading"
                      @click="handleGetRegisterCode"
                    >发送
                    </q-btn>
                  </div>
                </div>
                <!-- 注册按钮 -->
                <div class="q-gutter-md">
                  <q-btn
                    class="register-btn"
                    text-color="black"
                    unelevated
                    label=""
                    style="font-size: medium;"
                    @click="handleCancelRegister"
                  >取消
                  </q-btn>
                  <q-btn
                    class="register-btn bg-logon-card-input"
                    text-color="white"
                    unelevated
                    label=""
                    style="font-size: medium;"
                    @click="handleRegister"
                  >注册
                  </q-btn>
                </div>
              </q-form>
            </div>
            <div v-else class="b-logon">
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
            <div v-if="!isRegister" class="row justify-between" style="margin-bottom: 20px;">
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
      isRegister: false,
      registerForm: {
        username: '',
        password: '',
        phoneNum: '',
        registerCode: ''
      },
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
      sendCodeLoading: false,
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
    },
    registerForm: {
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      },
      phoneNum: {
        required,
        minLength: minLength(11)
      },
      registerCode: {
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
    },

    registerPasswordErrors() {
      if(!this.$v.registerForm.password.$dirty) return ''
      if(!this.$v.registerForm.password.required) {
        return this._i18n.t('error.login.passwordRequire')
      }
      if(!this.$v.registerForm.password.maxLength) {
        return this._i18n.t('error.login.passwordMinLength')
      }
      return ''
    },

    phoneNumErrors() {
      if(!this.$v.registerForm.phoneNum.$dirty) return ''
      if(!this.$v.registerForm.phoneNum.required) {
        return this._i18n.t('error.login.phoneNumRequire')
      }
      if(!this.$v.registerForm.phoneNum.minLength) {
        return this._i18n.t('error.login.phoneNumMinLength')
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
      this.isRegister = true
    },

    /**
     * 获取注册码
     */
    handleGetRegisterCode() {
      if(!this.registerForm.phoneNum) {
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.NEGATIVE,
          message: '请输入电话号码！'
        })
        return
      }
      this.sendCodeLoading = true
      this.$store.dispatch('user/getRegisterCode', this.registerForm.phoneNum).then(res => {
        if(res.code === this._constant.srCode.SUCCESS) {
          this._commonHandle.handleNotify({
            type: this._constant.notify.notifyType.POSITIVE,
            message: this._i18n.t('register.sendSuccess')
          })
        }
        this.sendCodeLoading = false
      }).catch(err => {
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.NEGATIVE,
          message: this._i18n.t('error.register.sendFailed')
        })
        this.sendCodeLoading = false
        console.error(err)
      })
    },

    /**
     * 注册功能
     */
    handleRegister() {
      this._commonHandle.handleShowLoading()
      this.$v.$touch()
      if(!this.$v.registerForm.$invalid) {
        this.$store.dispatch('user/registerUser', this.registerForm).then(res => {
          if(res.code === this._constant.srCode.SUCCESS) {
            this._commonHandle.handleNotify({
              type: this._constant.notify.notifyType.POSITIVE,
              message: this._i18n.t('register.success')
            })
          }
          //  注册成功后跳转到首页
          this.$router.push('/')
        }).catch(err => {
          this._commonHandle.handleNotify({
            type: this._constant.notify.notifyType.NEGATIVE,
            message: this._i18n.t('error.register.failed')
          })
          this.sendCodeLoading = false
          console.error(err)
        })
      } else {
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.NEGATIVE,
          message: this._i18n.t('error.register.formError')
        })
        this.sendCodeLoading = false
        console.error('failed')
      }
    },

    /**
     * 取消注册，返回登陆
     */
    handleCancelRegister() {
      this.isRegister = false
    }
  }
}
</script>

<style scoped>
  .logon-lottie {
    width: 70%;
    text-align: left;
  }

  .register-btn {
    width: 42%;
  }

  .logon-btn {
    font-size: large;
    margin-top: 0;
    margin-bottom: 20px;
    width: 100%;
  }

  .bg-logon-card-input {
    background: linear-gradient(to right, #36d1dc 1%, #5b86e5 99%);
    transition: all 0.3s ease-in-out;
    background-size: 200% auto;
  }

  .bg-logon-card-input:hover {
    background-position: right center;
    box-shadow: 0 12px 20px -11px #5b86e5;
  }
</style>
