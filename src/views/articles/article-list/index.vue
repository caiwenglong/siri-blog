<template>
  <div class="unit-article-list">
    <div class="bg-white q-mx-md q-mt-md q-pb-md q-pt-md">
      <template>
        <div class="q-pa-md col-12">
          <q-list>
            <q-item
              v-for="i in 5"
              :key="i"
              class="article__item"
              transition-show="jump-down"
              transition-hide="jump-up"
              @mouseenter.native="handleMouseEnter"
              @mouseleave.native="handleMouseLeave"
              @click.native="handleClickItem"
            >
              <q-item-section>
                <q-item-label class="item__title">
                  <strong>
                    文章标题{{ i }}
                  </strong>
                </q-item-label>
                <q-item-label class="q-chip-wrapper">
                  <q-chip square color="primary" text-color="white">vue</q-chip>
                  <q-chip square color="info" text-color="white">quasar</q-chip>
                  <q-chip square color="warning" text-color="white">html</q-chip>
                </q-item-label>
                <q-item-label class="item__body" caption lines="2">段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</q-item-label>
                <q-item-label>
                  <q-chip dense size="md" color="primary" text-color="white">
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                    <span class="author">SIRI</span>
                  </q-chip>
                  <span class="item-time float-right">
                    <span class="create-time">
                      <span class="">{{ $t('article.createTime') }}</span>
                      <span class="">2020-12-22</span>
                    </span>
                    <span class="modified-time">
                      <span class="">{{ $t('article.modifiedTime') }}</span>
                      <span class="">2020-12-22</span>
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
export default {
  name: 'ArticleList',

  data() {
    return {
      hoverClass: 'inset-shadow'
    }
  },

  created() {
    this.getArticleList()
  },

  methods: {
    getArticleList() {
      this.$store.dispatch('getAllArticles').then(res => {
        console.log(res)
      })
    },

    handleClickItem() {
      console.log(1)
      this.$router.push('article-details/' + '123')
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
