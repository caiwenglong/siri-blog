<template>
  <div class="unit-article-writing">
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
              v-model="articleForm.category"
              color="secondary"
              :options="optionsCategory"
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
          <q-btn outline type="submit" color="secondary" icon="send" :label="$t('article.public')" />
          <q-btn outline color="amber" icon="refresh" :label="$t('article.reset')" @click="handleReset" />
          <q-btn outline color="white" text-color="black" :label="$t('article.cancel')" @click="handleCancel" />
        </div>
      </q-form>
    </div>
    <v-md-editor v-model="articleForm.content" height="400px" />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'ArticleWriting',
  data() {
    return {
      articleForm: {
        title: '',
        category: '',
        content: '',
        tags: ''
      },
      tags: [],
      articleFormValid: false,
      articleTitleMaxLength: 12,
      modelCategory: null,
      optionsCategory: [
        {
          label: 'Google',
          value: 'goog',
          description: 'Search engine',
          icon: 'mail'
        },
        {
          label: 'Facebook',
          value: 'fb',
          description: 'Social media',
          icon: 'bluetooth'
        },
        {
          label: 'Twitter',
          value: 'twt',
          description: 'Quick updates',
          icon: 'map'
        },
        {
          label: 'Apple',
          value: 'app',
          description: 'iStuff',
          icon: 'golf_course'
        },
        {
          label: 'Oracle',
          value: 'ora',
          disable: true,
          description: 'Databases',
          icon: 'casino'
        }
      ],
      optionsTags: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
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
      tags: {},
      category: {}
    }
  },

  created() {
    this.$v.$reset()
  },

  methods: {

    /*
    * 创建标签
    * */
    createTagValue(val, done) {
      if(val.length > 0) {
        if(!this.optionsTags.includes(val)) {
          this.optionsTags.push(val)
        }
        done(val, 'add-unique')
      }
    },

    /*
    *   过滤标签
    * */
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

    /*
    *   发布文章
    * */
    onSubmit() {
      this.$v.$touch()
      this.articleForm.tags = this._lodash.toString(this.tags)
      this.articleForm.category = this.articleForm.category.value
      if(!this.$v.articleForm.$invalid) {
        this.$store.dispatch('addArticle', this.articleForm).then(res => {
          if(res.code === this._constant.srCode.SUCCESS) {
            this._commonHandle.handleNotify({
              type: this._constant.notify.notifyType.POSITIVE,
              message: this._i18n.t('article.publicSuccess')
            })
          } else {
            this._commonHandle.handleNotify({
              type: this._constant.notify.notifyType.NEGATIVE,
              message: this._i18n.t('article.failed')
            })
          }
        }).catch(error => {
          console.error(error.message)
          const errorMsg = error.message
          this._commonHandle.handleNotify({
            type: this._constant.notify.notifyType.NEGATIVE,
            message: errorMsg,
            transform: false
          })
        })
      } else {
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.NEGATIVE,
          message: this._i18n.t('error.form')
        })
      }
    },

    /*
    *   重置表单
    * */
    handleReset() {
      this.$v.$reset()
      this.handleResetForm()
    },

    /*
    *   取消发布
    * */
    handleCancel() {
      this._commonHandle.handleNotify({ type: 'positive', message: 'error.form' })
    },

    /*
    *   重置表单
    * */
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
