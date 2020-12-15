<template>
  <div class="unit-article-writing">
    <v-md-editor v-model="content" height="400px" />
  </div>
</template>

<script>

export default {
  name: 'ArticleWriting',
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style scoped>

</style>
