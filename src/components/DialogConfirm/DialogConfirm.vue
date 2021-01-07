<template>
  <div class="unit-dialog-confirm">
    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar size="md" :icon="confirmIcon" color="warning" text-color="white" />
          <span class="q-ml-sm confirm_message">{{ confirmMessage }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat :label="defaultBtnCancel" color="warning" @click="handleCancelDialog" />
          <q-btn v-close-popup flat :label="defaultBtnConfirm" color="primary" @click="handleConfirmDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogConfirm',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    confirmMessage: {
      type: String,
      default: '弹出框信息提示！'
    },
    confirmIcon: {
      type: String,
      default: 'not_listed_location'
    },
    btnCancel: {
      type: String,
      default: ''
    },
    btnConfirm: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      confirm: false
    }
  },

  computed: {
    defaultBtnCancel: function() {
      return this.btnCancel ? this.btnCancel : this._i18n.t('cancel')
    },
    defaultBtnConfirm: function() {
      return this.btnConfirm ? this.btnConfirm : this._i18n.t('confirm')
    },
    showDialog: function() {
      return this.show
    }
  },

  methods: {
    /**
     * 取消弹出框
     */
    handleCancelDialog() {
      this.$emit('cancelBtnClick')
    },

    /**
     * 确认弹出框
     */
    handleConfirmDialog() {
      this.$emit('confirmBtnClick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-card {
    min-width: 300px;
  }
  .confirm_message {
    width: 80%;
  }
</style>
