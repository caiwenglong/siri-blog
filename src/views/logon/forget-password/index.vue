<template>
  <div class="unit-forget-password">
    <q-card-section>
      <div class="b-logon">
        <q-form ref="forgetPasswordForm" v-model="forgetPasswordFormValid">
          <h3 class="text-uppercase">SIRI</h3>
          <!-- 密码 -->
          <q-input
            v-model="forgetPasswordForm.password"
            class="logon-input"
            standout="bg-cyan text-white"
            bottom-slots
            counter
            :maxlength="passwordMaxLength"
            :type="isPwd ? 'password' : 'text'"
            :label="$t('login.password')"
            :error="$v.forgetPasswordForm.password.$dirty && $v.forgetPasswordForm.password.$invalid"
            :error-message="passwordErrors"
            @blur="$v.forgetPasswordForm.password.$touch()"
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
          <!-- 密码 -->
          <q-input
            v-model="forgetPasswordForm.repeatPassword"
            class="logon-input"
            standout="bg-cyan text-white"
            bottom-slots
            counter
            :maxlength="passwordMaxLength"
            :type="isPwd ? 'password' : 'text'"
            :label="$t('login.password')"
            :error="$v.forgetPasswordForm.repeatPassword.$dirty && $v.forgetPasswordForm.repeatPassword.$invalid"
            :error-message="repeatPasswordErrors"
            @blur="$v.forgetPasswordForm.repeatPassword.$touch()"
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
            v-model="forgetPasswordForm.phoneNum"
            class="logon-input"
            clearable
            standout="bg-cyan text-white"
            bottom-slots
            counter
            :label="$t('login.phoneNum')"
            :maxlength="phoneNumMaxLength"
            :error="$v.forgetPasswordForm.phoneNum.$dirty && $v.forgetPasswordForm.phoneNum.$invalid"
            :error-message="phoneNumErrors"
            @input="$v.forgetPasswordForm.phoneNum.$touch()"
            @blur="$v.forgetPasswordForm.phoneNum.$touch()"
          >
            <template v-slot:prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>

          <div class="row q-col-gutter-x-md">
            <div class="col-8">
              <!-- 手机验证码 -->
              <q-input
                v-model="forgetPasswordForm.registerCode"
                class="logon-input"
                clearable
                standout="bg-cyan text-white"
                bottom-slots
                :label="$t('login.registerCode')"
                :error="$v.forgetPasswordForm.registerCode.$dirty && $v.forgetPasswordForm.registerCode.$invalid"
                :error-message="$t('error.login.registerCodeRequire')"
                @input="$v.forgetPasswordForm.registerCode.$touch()"
                @blur="$v.forgetPasswordForm.registerCode.$touch()"
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
          <div class="row q-col-gutter-x-md">
            <div class="col-6">
              <q-btn
                class="modify-btn"
                text-color="black"
                unelevated
                label=""
                style="font-size: medium;"
                @click="handleCancelModify(1)"
              >取消
              </q-btn>
            </div>
            <div class="col-6">
              <q-btn
                class="modify-btn bg-logon-card-input"
                text-color="white"
                unelevated
                label=""
                style="font-size: medium;"
                @click="handleModifyPassword"
              >确定
              </q-btn>
            </div>
          </div>
        </q-form>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { minLength, required, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'ForgetPassword',
  data() {
    return {
      isPwd: true,
      forgetPasswordFormValid: false,
      forgetPasswordForm: {
        phoneNum: '',
        password: '',
        repeatPassword: '',
        registerCode: ''
      },
      phoneNumMaxLength: 11,
      passwordMaxLength: 18,
      sendCodeLoading: false
    }
  },
  validations: {
    forgetPasswordForm: {
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        sameAsPassword: sameAs('password')
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
    passwordErrors() {
      if(!this.$v.forgetPasswordForm.password.$dirty) return ''
      if(!this.$v.forgetPasswordForm.password.required) {
        return this._i18n.t('error.login.passwordRequire')
      }
      if(!this.$v.forgetPasswordForm.password.maxLength) {
        return this._i18n.t('error.login.passwordMinLength')
      }
      return ''
    },

    repeatPasswordErrors() {
      if(!this.$v.forgetPasswordForm.repeatPassword.$dirty) return ''
      if(!this.$v.forgetPasswordForm.repeatPassword.sameAsPassword) {
        return this._i18n.t('error.modify.passwordRequire')
      }
      return ''
    },

    phoneNumErrors() {
      if(!this.$v.forgetPasswordForm.phoneNum.$dirty) return ''
      if(!this.$v.forgetPasswordForm.phoneNum.required) {
        return this._i18n.t('error.login.phoneNumRequire')
      }
      if(!this.$v.forgetPasswordForm.phoneNum.minLength) {
        return this._i18n.t('error.login.phoneNumMinLength')
      }
      return ''
    }
  },

  methods: {
    /**
     * 获取注册码
     */
    handleGetRegisterCode() {
      if(!this.forgetPasswordForm.phoneNum) {
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.NEGATIVE,
          message: '请输入电话号码！'
        })
        return
      }
      this.sendCodeLoading = true
      this.$store.dispatch('user/getRegisterCode', this.forgetPasswordForm.phoneNum).then(res => {
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
     * 验证输入的电话号码是否已经注册
     */
    handleModifyPassword() {
      this._commonHandle.handleShowLoading()
      this.$v.$touch()
      if(!this.$v.forgetPasswordForm.$invalid) {
        this.$store.dispatch('user/modifyPassword', this.forgetPasswordForm).then(res => {
          if(res.code === this._constant.srCode.SUCCESS) {
            this._commonHandle.handleNotify({
              type: this._constant.notify.notifyType.POSITIVE,
              message: this._i18n.t('modify.success')
            })
            this.$emit('switchPanel', 1)
          }
          this._commonHandle.handleHideLoading()
        }).catch(err => {
          console.log(err)
          this._commonHandle.handleHideLoading()
        })
      } else {
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.NEGATIVE,
          message: this._i18n.t('error.form')
        })
        console.error('failed')
        this._commonHandle.handleHideLoading()
      }
    },

    /**
     * 取消修改密码，返回登陆
     */
    handleCancelModify() {
      this.$emit('switchPanel', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .modify-btn {
    width: 100%;
  }
  .bg-logon-card-input {
    margin-top: 10px;
  }
</style>
