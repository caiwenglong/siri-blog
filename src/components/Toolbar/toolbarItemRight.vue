<template>
  <div class="q-gutter-sm row items-center no-wrap">
    <q-input v-model="search" dense outlined style="min-width: 60px" input-class="text-right" class="q-ml-md">
      <template v-slot:append>
        <q-icon v-if="search === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
      </template>
    </q-input>
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
    <q-btn v-if="$q.screen.gt.sm" round dense flat color="grey-8" icon="video_call">
      <q-tooltip>创建</q-tooltip>
    </q-btn>
    <q-btn v-if="$q.screen.gt.sm" round dense flat color="grey-8" icon="apps">
      <q-tooltip>应用</q-tooltip>
    </q-btn>
    <q-btn v-if="$q.screen.gt.sm" round dense flat color="grey-8" icon="message">
      <q-tooltip>消息</q-tooltip>
    </q-btn>
    <q-btn round dense flat color="grey-8" icon="notifications">
      <q-badge color="red" text-color="" floating>
        2
      </q-badge>
      <q-tooltip>通知</q-tooltip>
    </q-btn>
    <q-btn round flat>
      <q-menu>
        <div class="row no-wrap q-pa-md">

          <div class="column items-center">
            <q-avatar size="72px">
              <img :src="this.$PUBLIC_PATH + 'data/avatar.jpg'">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">Hi！ CIMO</div>

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
      <q-tooltip>账号</q-tooltip>
    </q-btn>
    <q-btn flat round color="primary" icon="card_giftcard">
      <q-menu>
        <q-list>
          <q-item v-for="item in availableLanguages" :key="item.value" v-close-popup clickable @click="handleLanguageChange(item.value)">
            <q-item-section>{{ item.text }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'ToolbarItemRight',
  data() {
    return {
      search: '',
      mobileData: false,
      bluetooth: true
    }
  },
  computed: {
    availableLanguages() {
      const messages = this._i18n.messages
      console.log(messages)

      const a = Object.keys(messages).map((lang) => {
        return {
          text: messages[lang].language,
          value: lang
        }
      })
      console.log(a)
      return a
    }
  },
  methods: {
    fullScreen() {
      if (this.$q.fullscreen.isActive) {
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
