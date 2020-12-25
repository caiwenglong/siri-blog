<template>

  <div class="unit unit-home">
    <div @click="handleClick">home</div>
    <span class="svg-container">
      <svg-icon icon-class="eye" />
    </span>
  </div>

</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    }
  },

  methods: {
    handleClick() {
      this._commonHandle.handleShowLoading()
      this.$store.dispatch('GenerateRoutes', {}).then(res => {
        this._commonHandle.handleHideLoading()
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
