<template>

  <base-content>
    <div @click="handleClick">home</div>
    <span class="svg-container">
      <svg-icon icon-class="eye" />
    </span>
  </base-content>

</template>

<script>
import BaseContent from '../../components/BaseContent/BaseContent'

export default {
  name: 'Home',
  components: {
    BaseContent
  },
  data() {
    return {}
  },

  methods: {
    handleClick() {
      debugger
      this.$store.dispatch('getAllArticles').then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
