<template>
  <div class="article-category-select">
    <q-select
      v-model="categoryModel"
      name="category"
      color="secondary"
      transition-show="flip-up"
      transition-hide="flip-down"
      emit-value
      map-options
      :options="getCategories"
      :option-value="optionValue"
      :option-label="optionLabel"
      :label="getCategoryLabel"
      @input="handleCategorySelect"
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
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ArticleCategorySelect',
  props: {
    label: {
      require: false,
      type: String,
      default: ''
    },
    categories: {
      require: true,
      type: Array,
      default: null
    },
    categoryId: {
      require: false,
      type: String,
      default: ''
    },
    optionValue: {
      require: false,
      type: String,
      default: 'id'
    },
    optionLabel: {
      require: false,
      type: String,
      default: 'name'
    },
    isEdit: {
      require: false,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      categoryModel: ''
    }
  },

  computed: {
    ...mapGetters([
      'storeCategories'
    ]),

    getCategories() {
      return this.categories || this.storeCategories
    },

    getCategoryLabel() {
      return this.label || this._i18n.t('article.category')
    }
  },

  created() {
    if(this.isEdit) {
      this.handleGetCategoryModel()
    }
  },

  methods: {
    /**
     * 如果是编辑状态，那么就通过穿进来的分类ID给categoryModel赋值
     */
    handleGetCategoryModel() {
      const selectCategory = this._lodash.filter(this.getCategories, category => {
        return category.id === this.categoryId
      })
      this.categoryModel = selectCategory[0]
    },

    /**
     * 当选择选项的时候，将选项的id值emit出去
     * @param value
     */
    handleCategorySelect(value) {
      this.$emit('emitSelectedCategory', value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
