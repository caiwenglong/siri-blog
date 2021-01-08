<template>
  <div class="unit-article-details">
    <v-md-editor :value="article.content" mode="preview" />
  </div>
</template>

<script>
export default {
  name: 'ArticleDetails',

  data() {
    return {
      article: {
        title: '',
        content: '',
        author: '',
        category: '',
        tags: '',
        gmtCreate: '',
        gmtModified: ''
      }
    }
  },

  created() {
    this.getArticleDetails()
  },

  methods: {
    getArticleDetails() {
      this.$store.dispatch('getArticle', this.$route.params.artId).then((res) => {
        console.log(res)
        if(res.code === this._constant.srCode.SUCCESS && res.data.article) {
          this.article.title = res.data.article.title
          this.article.content = res.data.article.content
          this.article.author = res.data.article.author
          this.article.category = res.data.article.category
          this.article.tags = res.data.article.tags
          this.article.gmtCreate = res.data.article.gmtCreate
          this.article.gmtModified = res.data.article.gmtModified
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .unit-article-details {
    padding: 20px;
    background: #fff;
    color: $grey-4;
  }
  .unit-article__infos {
    padding: 20px;
    text-align: right;
  }
  .infos__time,
  .time--modified {
    margin-left: 20px;
  }

</style>
