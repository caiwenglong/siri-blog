<template>
  <div class="q-gutter-sm row items-center no-wrap">
    <q-btn
      v-if="$q.screen.gt.sm"
      round
      dense
      flat
      color="grey-8"
      :icon="this.$q.fullscreen.isActive?'fullscreen_exit':'fullscreen'"
      @click="fullScreen"
    >
      <q-tooltip v-if="!this.$q.fullscreen.isActive">全屏</q-tooltip>
      <q-tooltip v-if="this.$q.fullscreen.isActive">退出全屏</q-tooltip>
    </q-btn>
    <q-btn flat round icon="translate">
      <q-menu>
        <q-list>
          <q-item v-for="item in availableLanguages" :key="item.value" v-close-popup clickable @click="handleLanguageChange(item.value)">
            <q-item-section>{{ item.text }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn round flat>
      <q-menu>
        <div class="row no-wrap q-pa-md">

          <div class="column items-center">
            <q-avatar size="72px">
              <img :src="this.$PUBLIC_PATH + 'data/avatar.jpg'">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">Hi！{{ userName }}</div>

            <q-btn
              v-close-popup
              color="primary"
              label="Logout"
              size="sm"
              @click="logout"
            />
          </div>
        </div>
      </q-menu>
      <q-avatar size="26px">
        <img :src="this.$PUBLIC_PATH + 'data/avatar.jpg'">
      </q-avatar>
      <q-tooltip>{{ userName }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import { getUserName } from '../../utils/auth'

export default {
  name: 'ToolbarItemRight',
  data() {
    return {
      search: '',
      mobileData: false,
      bluetooth: true,
      userName: getUserName()
    }
  },
  computed: {
    availableLanguages() {
      const messages = this._i18n.messages

      return Object.keys(messages).map((lang) => {
        return {
          text: messages[lang].language,
          value: lang
        }
      })
    }
  },
  methods: {
    fullScreen() {
      if(this.$q.fullscreen.isActive) {
        // 退出全屏模式：
        this.$q.fullscreen.exit()
          .then(() => { // v1.5.0+
            // success!
          })
        // eslint-disable-next-line handle-callback-err
          .catch(err => { // v1.5.0+
            // oh, no!!!
          })
      } else {
        // 请求全屏模式：
        this.$q.fullscreen.request()
          .then(() => { // v1.5.0+
            // success!
          })
        // eslint-disable-next-line handle-callback-err
          .catch(err => { // v1.5.0+
            // oh, no!!!
          })
      }
    },
    logout() {
      this.$store.commit('LOGOUT')
      this.$router.push('/')
      window.sessionStorage.clear()
    },

    // 切换语言
    handleLanguageChange(a) {
      this._i18n.locale = a
    }
  }
}
</script>
