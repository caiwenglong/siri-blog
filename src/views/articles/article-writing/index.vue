<template>
  <div class="unit unit-article-writing">
    <div class="q-pa-md">
      <q-form ref="articleForm" v-model="articleFormValid" class="q-gutter-md" @submit="onSubmit">
        <div class="row q-col-gutter-md">
          <div class="col-4">
            <q-input
              v-model="$v.articleForm.title.$model"
              name="name"
              color="secondary"
              bottom-slots
              clearable
              counter
              :maxlength="articleTitleMaxLength"
              :label="$t('article.title')"
              :error="$v.articleForm.title.$dirty && $v.articleForm.title.$invalid"
              :error-message="$t('error.article.title')"
              @input="$v.articleForm.title.$touch()"
              @blur="$v.articleForm.title.$touch()"
            />
          </div>
          <div class="col-4">
            <q-select
              v-model="category"
              name="category"
              color="secondary"
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="categories"
              :label="$t('article.category')"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-italic text-grey">
                    No options slot
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-4">
            <q-select
              v-model="tags"
              use-input
              use-chips
              multiple
              input-debounce="0"
              color="secondary"
              label-color="red"
              class="multi-select-tags"
              :content-style="{ backgroundColor: '#ff0000' }"
              :options="optionsTags"
              @new-value="createTagValue"
              @filter="filterFn"
            />
          </div>
        </div>
        <div class="row q-gutter-md justify-end">
          <q-btn v-if="isEdit" outline type="submit" color="secondary" icon="send" :label="$t('article.edit')" />
          <q-btn v-else outline type="submit" color="secondary" icon="send" :label="$t('article.public')" />
          <q-btn outline color="amber" icon="refresh" :label="$t('article.reset')" @click="handleReset" />
          <q-btn outline color="white" text-color="black" :label="isEdit ? $t('article.goBack') : $t('article.cancel')" @click="handleCancel" />
        </div>
      </q-form>
    </div>
    <v-md-editor v-model="articleForm.content" height="400px" />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'ArticleWriting',
  data() {
    return {
      articleForm: {
        id: '',
        title: '',
        category: '',
        content: '',
        tags: ''
      },
      tags: [],
      articleFormValid: false,
      articleTitleMaxLength: 12,
      modelCategory: null,
      categories: [],
      category: {
        label: '',
        value: '',
        icon: '',
        idAuthor: ''
      },
      optionsTags: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      isEdit: false,
      idArticle: ''
    }
  },

  validations: {
    articleForm: {
      title: {
        required
      },
      content: {
        required
      },
      idAuthor: {
        required
      },
      category: {
        required
      }
    }
  },

  computed: {
    ...mapGetters([
      'userId',
      'storeCategories'
    ])
  },

  created() {
    this.$v.$reset()
    this.handleGetCategories()
    if(this.$route.params.isEdit) this.isEdit = this.$route.params.isEdit
    if(this.$route.params.idArticle) this.idArticle = this.$route.params.idArticle
    if(this.$route.params.isEdit && this.$route.params.idArticle) {
      this.handleGetArticle(this.$route.params.idArticle)
    }
  },

  methods: {

    /**
     * 获取文章信息
     * @param idArticle: 文章ID
     */
    handleGetArticle(idArticle) {
      this.$store.dispatch('getArticle', idArticle).then(res => {
        if(res.code === this._constant.srCode.SUCCESS) {
          const articleEntity = res.data.article
          if(articleEntity) {
            this.articleForm.id = idArticle
            this.articleForm.title = articleEntity.title
            this.articleForm.content = articleEntity.content
            this.articleForm.tags = articleEntity.tags
            this._lodash.filter(this.categories, category => {
              if(category.value === articleEntity.category) {
                this.category = category
              }
            })
          }
        }
      })
    },

    /**
     * 创建标签
     */
    handleGetCategories() {
      this._lodash.forEach(this.storeCategories, item => {
        if(!item.isParent) {
          const category = {
            label: '',
            value: '',
            icon: '',
            idAuthor: ''
          }
          category.value = item.id
          category.label = item.name
          category.icon = item.icon
          this.categories.push(category)
        }
      })
    },

    /**
     * 创建标签
     * @param val：标签值
     * @param done
     */
    createTagValue(val, done) {
      if(val.length > 0) {
        if(!this.optionsTags.includes(val)) {
          this.optionsTags.push(val)
        }
        done(val, 'add-unique')
      }
    },

    /**
     * 过滤标签
     * @param val
     * @param update
     */
    filterFn(val, update) {
      update(() => {
        if(val !== '') {
          const needle = val.toLowerCase()
          this.optionsTags = this.optionsTags.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },

    /**
     * 提交表单
     */
    onSubmit() {
      this._commonHandle.handleShowLoading()
      this.$v.$touch()
      this.articleForm.tags = this._lodash.toString(this.tags)
      this.articleForm.category = this.category.value
      this.articleForm.idAuthor = this.userId
      if(!this.$v.articleForm.$invalid) {
        const moduleMethod = this.isEdit ? 'modifyArticle' : 'addArticle'
        this.$store.dispatch(moduleMethod, this.articleForm).then(res => {
          this._commonHandle.handleHideLoading()
          if(res.code === this._constant.srCode.SUCCESS) {
            this._commonHandle.handleNotify({
              type: this._constant.notify.notifyType.POSITIVE,
              message: this._i18n.t('article.publicSuccess')
            })
            this.$router.push({ name: this.articleForm.category, params: { categoryId: this.articleForm.category }})
          } else {
            this._commonHandle.handleNotify({
              type: this._constant.notify.notifyType.NEGATIVE,
              message: this._i18n.t('article.failed')
            })
          }
        }).catch(error => {
          this._commonHandle.handleHideLoading()
          console.error(error.message)
          const errorMsg = error.message
          this._commonHandle.handleNotify({
            type: this._constant.notify.notifyType.NEGATIVE,
            message: errorMsg,
            transform: false
          })
        })
      } else {
        this._commonHandle.handleHideLoading()
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.NEGATIVE,
          message: this._i18n.t('error.form')
        })
      }
    },

    /**
     * 重置表单
     */
    handleReset() {
      this.$v.$reset()
      this.handleResetForm()
    },

    /**
     * 取消提交
     */
    handleCancel() {
      this.$router.go(-1)
    },

    /**
     * 重置表单
     */
    handleResetForm() {
      this.articleForm.title = ''
      this.articleForm.content = ''
      this.articleForm.category = ''
      this.articleForm.tags = null
      this.tags = []
    }
  }
}
</script>

<style scoped>

</style>
