<template>
  <div class="unit-article-list">
    <div class="bg-white q-mx-md q-mt-md q-pb-md q-pt-md">
      <template>
        <div class="q-pa-md col-12">
          <q-list v-if="articleList.length">
            <q-item
              v-for="article in articleList"
              :key="article.id"
              class="article__item"
              transition-show="jump-down"
              transition-hide="jump-up"
              @mouseenter.native="handleMouseEnter"
              @mouseleave.native="handleMouseLeave"
              @click.native="handleClickItem(article.id)"
            >
              <q-item-section>
                <q-item-label class="item__title">
                  <strong>
                    {{ article.title }}
                  </strong>
                  <span class="action-group float-right">
                    <q-btn-group>

                      <q-btn color="accent" icon="create">
                        <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
                          修改文章
                        </q-tooltip>
                      </q-btn>
                      <q-btn color="accent" icon="close" @click.stop="handleShowDialog(article.id)">
                        <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
                          删除文章
                        </q-tooltip>
                      </q-btn>
                    </q-btn-group>
                  </span>
                </q-item-label>
                <q-item-label v-if="article.tags.length" class="q-chip-wrapper">
                  <template v-for="(tag, i) in article.tags">
                    <q-chip :key="tag" square :color="tagColors[i]" text-color="white">{{ tag }}</q-chip>
                  </template>
                </q-item-label>
                <q-item-label class="item__body" caption lines="2">
                  <v-md-editor :value="article.content" mode="preview" />
                </q-item-label>
                <q-item-label>
                  <q-chip v-if="article.author" dense size="md" color="primary" text-color="white">
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                    <span class="author">{{ article.author }}</span>
                  </q-chip>
                  <span class="item-time float-right">
                    <span class="create-time">
                      <span class="">{{ $t('article.createTime') }}</span>
                      <span class="">{{ article.gmtCreate | dateFormat }}</span>
                    </span>
                    <span class="modified-time">
                      <span class="">{{ $t('article.modifiedTime') }}</span>
                      <span class="">{{ article.gmtModified | dateFormat }}</span>
                    </span>
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <div v-else>
            <div v-show="$q.screen.gt.sm" class="col-6 flex justify-center items-center ">
              <q-skeleton v-if="!isLottieF" type="text" height="70%" width="50%" />
              <lottie-web-cimo class="lottie-lg" :animation-data="defaultOptions.animationData" @isLottieFinish="handleFinish" />
            </div>
          </div>
        </div>
      </template>
    </div>
    <dialog-confirm :show="showDialog" @cancelBtnClick="handleCancelBtnClick" @confirmBtnClick="handleConfirmBtnClick" />
  </div>
</template>

<script>
import { getUserId } from '@/utils/auth'
import LottieWebCimo from '@/components/LottieWebCimo/lottie-web-cimo'
import DialogConfirm from '@/components/DialogConfirm/DialogConfirm.vue'
import * as animationData from '@/assets/lottie/43191-no-data-error.json'

export default {
  name: 'ArticleList',
  inject: ['reload'],
  components: {
    DialogConfirm,
    LottieWebCimo
  },
  data() {
    return {
      isLottieF: false,
      defaultOptions: {
        animationData: animationData.default,
        loop: true
      },
      showDialog: false,
      idArticle: '',
      categoryId: '',
      articleList: [],
      hoverClass: 'inset-shadow-1',
      tagColors: ['primary', 'teal', 'orange', 'info', 'warning'],
      pageNum: 1,
      pageSize: 10
    }
  },

  created() {
    this.categoryId = this.$route.meta.id
    this.getArticleList()
  },

  methods: {
    /**
     * 通过分类ID获取文章列表
     */
    getArticleList() {
      this._commonHandle.handleShowLoading()
      this.$store.dispatch('getAllArticles', { userId: getUserId(), category: this.categoryId, pageNum: 1, pageSize: 10 }).then(res => {
        this._commonHandle.handleHideLoading()
        if(res.code === this._constant.srCode.SUCCESS && res.data.result.articleList.length) {
          this.articleList = this._lodash.map(res.data.result.articleList, article => {
            if(article.tags) {
              article.tags = this._lodash.split(article.tags, ',')
            } else {
              article.tags = []
            }
            return article
          })
        }
      }).catch(err => {
        console.error(err)
      })
    },

    /**
     * 通过文章ID删除文章
     * @param idArticle
     * @returns {Promise<void>}
     */
    async handleDeleteArticle() {
      this._commonHandle.handleShowLoading()
      const deleteArticleResult = await this.$store.dispatch('deleteArticleById', this.idArticle)
      console.log(deleteArticleResult)
      this._commonHandle.handleHideLoading()
      if(deleteArticleResult.code === this._constant.srCode.SUCCESS) {
        this._commonHandle.handleNotify({
          message: '文章删除成功'
        })
        this.reload()
      }
    },

    /**
     * 显示提示框
     * @param idArticle：文章id
     * @returns {Promise<void>}
     */
    handleShowDialog(idArticle) {
      this.showDialog = true
      this.idArticle = idArticle
    },

    /**
     * 点击文章列表项跳转到对应的文章详情页
     * @param artId
     */
    handleClickItem(artId) {
      this.$router.push({ name: 'articleDetails', params: { artId: artId }})
    },

    /**
     * 鼠标划入列表项事件处理
     * @param evt
     */
    handleMouseEnter(evt) {
      evt.target.classList.add(this.hoverClass)
    },

    /**
     * 鼠标划出列表项事件处理
     * @param evt
     */
    handleMouseLeave(evt) {
      evt.target.classList.remove(this.hoverClass)
    },

    /**
     * 取消删除文章
     */
    handleCancelBtnClick() {
      this.showDialog = false
      console.log('0')
    },

    /**
     * 确认删除文章
     */
    handleConfirmBtnClick() {
      this.showDialog = false
      this.handleDeleteArticle()
    },

    /**
     * json动画加载完成后回调
     * @param e：boolean
     */
    handleFinish(e) {
      this.isLottieF = e
    }
  }
}
</script>

<style lang="scss" scoped>
  .article__item {
    padding-top: 20px;
    margin-bottom: 20px;
    transition: all 0.5s;
    cursor: pointer;
    border-radius: 4px;
    &.inset-shadow-1 {
      box-shadow: 0 7px 90px -50px rgba(0,0,0,0.5) inset
    }
  }
  .item__title {
    strong {
      font-size: 24px;
      color: $grey-8;
    }
  }
  .item__body {
    font-size: $itemBodyFont;
    color: $itemBodyColor;
    line-height: 1.5 !important;
    margin: 12px 0 20px 0;
    max-height: 160px;
  }
  .q-chip-wrapper {
    font-size: 12px;
    padding: 4px;
  }
  .item-time {
    line-height: 29px;
    color: $grey-6;
  }
  .modified-time {
    margin-left: 20px;
  }
</style>
