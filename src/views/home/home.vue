<template>

  <div class="unit unit-home">
    <div @click="handleClick">home</div>
    <span class="svg-container">
      <svg-icon icon-class="eye" />
    </span>
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
      'userId',
      'userId1'
    ])
  },

  methods: {
    handleClick() {
      this._commonHandle.handleShowLoading()
      console.log(this.userId)
      console.log(this.userId1)
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
