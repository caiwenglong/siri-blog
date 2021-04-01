<template>
  <div class="unit-article-details">
    <div class="article-operation">
      <q-btn color="accent" icon="create" @click.stop="handleEditArticle">
        <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
          {{ $t('article.modifyArticle') }}
        </q-tooltip>
      </q-btn>
      <q-btn color="accent" icon="close" @click.stop="handleShowDialog">
        <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
          {{ $t('article.deleteArticle') }}
        </q-tooltip>
      </q-btn>
    </div>
    <v-md-editor :value="article.content" mode="preview" @copy-code-success="handleCopyCodeSuccess" />
    <dialog-confirm
      :show="showDialog"
      :confirm-message="$t('article.confirmDeleteArticle')"
      @cancelBtnClick="handleCancelBtnClick"
      @confirmBtnClick="handleConfirmBtnClick"
    />
  </div>
</template>

<script>
import DialogConfirm from '@/components/DialogConfirm/DialogConfirm.vue'
export default {
  name: 'ArticleDetails',
  components: {
    DialogConfirm
  },
  data() {
    return {
      article: {
        id: '',
        title: '',
        content: '',
        author: '',
        category: '',
        tags: '',
        gmtCreate: '',
        gmtModified: ''
      },
      showDialog: false
    }
  },

  created() {
    this.getArticleDetails()
  },

  methods: {
    /**
     * 获取文章详情
     */
    getArticleDetails() {
      this.$store.dispatch('getArticle', this.$route.params.artId).then((res) => {
        if(res.code === this._constant.srCode.SUCCESS && res.data.article) {
          this.article.id = res.data.article.id
          this.article.title = res.data.article.title
          this.article.content = res.data.article.content
          this.article.author = res.data.article.author
          this.article.category = res.data.article.category
          this.article.tags = res.data.article.tags
          this.article.gmtCreate = res.data.article.gmtCreate
          this.article.gmtModified = res.data.article.gmtModified
        }
      })
    },

    /**
     * 编辑文章
     */
    handleEditArticle() {
      this.$router.push({ name: 'articleWriting', params: { idArticle: this.article.id, isEdit: true }})
    },

    /**
     * 显示提示框
     * @returns {Promise<void>}
     */
    handleShowDialog() {
      this.showDialog = true
      this.idArticle = this.article.id
    },

    /**
     * 取消删除文章
     */
    handleCancelBtnClick() {
      this.showDialog = false
    },

    /**
     * 确认删除文章
     */
    handleConfirmBtnClick() {
      this.showDialog = false
      this.handleDeleteArticle()
    },

    /**
     * 通过文章ID删除文章
     * @returns {Promise<void>}
     */
    async handleDeleteArticle() {
      this._commonHandle.handleShowLoading()
      const deleteArticleResult = await this.$store.dispatch('deleteArticleById', this.article.id)
      this._commonHandle.handleHideLoading()
      if(deleteArticleResult.code === this._constant.srCode.SUCCESS) {
        this._commonHandle.handleNotify({
          message: '文章删除成功'
        })
        this.reload()
      }
    },

    /**
     * 复制代码成功
     */
    handleCopyCodeSuccess() {
      this._commonHandle.handleNotify({
        type: this._constant.notify.notifyType.POSITIVE,
        message: this._i18n.t('article.copySuccess')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-operation {
    text-align: right;
  }
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
