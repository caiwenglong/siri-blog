<template>
  <div class="unit-register">
    <div class="q-pa-md" style="max-width: 400px">



    </div>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        phoneNum: '',
        registerCode: ''
      },
      registerFormValid: false,
      isPwd: true,
      passwordMaxLength: 18,
      phoneNumMaxLength: 11
    }
  },

  validations: {
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
    passwordErrors() {
      if(!this.$v.registerForm.password.$dirty) return ''
      if(!this.$v.registerForm.password.required) {
        return this._i18n.t('error.login.passwordRequire')
      }
      if(!this.$v.registerForm.password.maxLength) {
        return this._i18n.t('error.login.passwordMinLength')
      }
      return ''
    }
  }

}
</script>

<style scoped>
</style>
