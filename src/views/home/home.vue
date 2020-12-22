<template>

  <div class="unit unit-home">
    <div @click="handleClick">home</div>
    <span class="svg-container">
      <svg-icon icon-class="eye" />
    </span>
    <v-md-editor :value="content" mode="preview" />
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      content: ''
    }
  },

  computed: {
    ...mapGetters([
      'userId'
    ])
  },

  methods: {
    handleClick() {
      this._commonHandle.handleShowLoading()
      this.$store.dispatch('getAllArticles', { userId: this.userId, pageNum: 1, pageSize: 10 }).then(res => {
        this._commonHandle.handleHideLoading()
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
