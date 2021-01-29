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
                :error-message="passwordErrors"
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

              <!-- 登录按钮 -->
              <q-btn
                :loading="loading"
                class="logon-btn bg-logon-card-input"
                text-color="white"
                unelevated
                label=""
                style="font-size: large;"
                @click="logon"
              >登 录 系 统
              </q-btn>
            </q-form>
            <div class="row justify-between" style="margin-bottom: 20px;">
              <q-btn flat label="忘记密码" />
              <q-btn outline label="我要注册" />
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
    passwordErrors() {
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
    logon() {
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
    handleFinish(e) {
      this.isLottieF = e
    }
  }
}
</script>

<style scoped>
  .logon-lottie {
    width: 70%;
    text-align: left;
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
