<template>
  <div class="unit-article-list">
    <div class="bg-white q-mx-md q-mt-md q-pb-md q-pt-md">
      <template>
        <div class="q-pa-md col-12">
          <q-list>
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
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getUserId } from '@/utils/auth'

export default {
  name: 'ArticleList',

  data() {
    return {
      articleList: [],
      hoverClass: 'inset-shadow',
      tagColors: ['primary', 'teal', 'orange', 'info', 'warning'],
      pageNum: 1,
      pageSize: 10
    }
  },

  created() {
    this.getArticleList()
  },

  methods: {
    getArticleList() {
      this._commonHandle.handleShowLoading()
      this.$store.dispatch('getAllArticles', { userId: getUserId(), pageNum: 1, pageSize: 10 }).then(res => {
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
          console.log(this.articleList)
        }
      }).catch(err => {
        console.error(err)
      })
    },

    handleClickItem(artId) {
      this.$router.push('article-details/' + artId)
    },

    handleMouseEnter(evt) {
      evt.target.classList.add(this.hoverClass)
    },
    handleMouseLeave(evt) {
      evt.target.classList.remove(this.hoverClass)
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
    &.inset-shadow {
      box-shadow: $inset-shadow
    }
  }
  .item__title {
    strong {
      font-size: $itemTitleFont;
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
