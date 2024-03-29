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
    isAddTopLevelMenu: {
      require: false,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      categoryModel: '',
      categoryName: ''
    }
  },

  computed: {
    ...mapGetters([
      'storeCategories'
    ]),

    getCategories() {
      const topLevelCategory = {
        id: '0',
        name: '一级菜单'
      }
      const targetCategories = this.categories || this.storeCategories
      const isExitTopLevelCate = this._lodash.find(targetCategories, category => {
        return category.name === '一级菜单'
      })

      if(!isExitTopLevelCate && this.isAddTopLevelMenu) {
        targetCategories.unshift(topLevelCategory)
      }
      return targetCategories
    },

    getCategoryLabel() {
      return this.label || this._i18n.t('article.category')
    }
  },

  watch: {
    /**
     * categoryId可能是通过异步获取数据之后在传入的，所有需要监听categoryId的变化
     */
    categoryId(val) {
      this.categoryId = val
      this.handleGetCategoryModel()
      this.handleCategorySelect(val)
    }
  },

  created() {
    if(this.categoryId) {
      this.handleGetCategoryModel()
    }
  },

  methods: {
    /**
     * 如果是编辑状态，那么就通过传进来的分类ID给categoryModel赋值
     */
    handleGetCategoryModel() {
      const selectCategory = this._lodash.filter(this.getCategories, category => {
        return category.id === this.categoryId
      })
      this.categoryModel = selectCategory[0]
      this.categoryname = selectCategory[0].name
    },

    /**
     * 当选择选项的时候，将选项的id值emit出去
     * @param value
     */
    handleCategorySelect(value) {
      this.$emit('emitSelectedCategory', { value: value, name: this.categoryname })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
