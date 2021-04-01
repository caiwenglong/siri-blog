<!--
   动态菜单 item 递归实现
   myRouter ： 菜单列表
   initLevel ： 菜单初始化缩进等级
   bgColorLevel ：菜单背景色
   basePath : 上级菜单
   author ： ths
-->
<template>
  <div>

    <template v-for="(item,index) in myRouter">
      <template v-if="item.meta.isHidden !== true">
        <q-item-label
          v-if="item.meta.itemLabel"
          :key="item.meta.itemLabel"
          header
          class="text-weight-bold text-uppercase"
        >
          {{ item.meta.itemLabel }}
        </q-item-label>

        <!-- 没有孩子 -->
        <q-item
          v-if="!item.children || !item.children.length"
          :key="index"
          v-ripple
          exact
          active-class="baseItemActive bg-grey-3"
          :class="bgColor + '-' + bgColorLevel + ' base-menu-item'"
          :inset-level="initLevel"
          clickable
          :to="handleLink(basePath, item.path)"
          @contextmenu.prevent="onContextmenu(item)"
        >
          <q-item-section avatar>
            <q-icon :name="item.meta.icon" />
          </q-item-section>
          <q-item-section>{{ item.meta.title }}</q-item-section>
        </q-item>

        <!-- 有孩子 -->
        <q-expansion-item
          v-else
          :key="index"
          :duration="duration"
          :class="$route.fullPath.startsWith(item.path)?
            'baseRootItemActive base-menu-item'+bgColor + '-' + bgColorLevel:
            bgColor + '-' + bgColorLevel+ ' base-menu-item'"
          :default-opened="item.meta.isOpen"
          :header-inset-level="initLevel"
          :icon="item.meta.icon"
          :label="item.meta.title"
          @contextmenu.prevent="onContextmenu(item)"
        >

          <!-- 菜单项缩进 + 0.3 ; 背景色深度 + 1 ; 如果上级菜单路径存在，则拼接上级菜单路径 -->
          <base-menu-item
            :my-router="item.children"
            :init-level="initLevel + 0.2"
            :bg-color-level="bgColorLevel + 1"
            :bg-color="bgColor"
            :base-path="basePath === undefined ? item.path : basePath + '/' + item.path"
          />

        </q-expansion-item>
      </template>
    </template>
    <q-dialog v-model="prompt" persistent>
      <q-card class="md-width-prompt">
        <q-card-section class="dividing-line">
          <div class="text-h6">{{ isEdit ? $t('menu.menuModify') : $t('menu.menuAdd') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="categoryForm" v-model="categoryFormValid">
            <div class="row">
              <div class="col-12">
                <span class="text-link text-primary" @click="handleSetTopLevel">设置为一级菜单</span>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <article-category-select
                  :is-edit="true"
                  :is-add-top-level-menu="true"
                  :label="$t('category.parentCategory')"
                  :category-id="categoryForm.idParent"
                  @emitSelectedCategory="handleGetEmitCategory"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-input
                  v-model="categoryForm.name"
                  dense
                  counter
                  :maxlength="categoryNameMaxLength"
                  :label="$t('category.name')"
                  :error="$v.categoryForm.name.$dirty && $v.categoryForm.name.$invalid"
                  :error-message="$t('category.error.name')"
                  @input="$v.categoryForm.name.$touch()"
                  @blur="$v.categoryForm.name.$touch()"
                  @keyup.enter="handleSubmitForm"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-input v-model="categoryForm.icon" dense :label="$t('category.icon')" @keyup.enter="handleSubmitForm" />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn v-close-popup flat :label="$t('cancel')" />
          <q-btn flat :label="$t('confirm')" @click="handleSubmitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 600px">
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="red" text-color="white" />
          <span class="q-ml-sm infos-content">{{ $t('menu.menuDeleteTip', { categoryName: menuItem ? menuItem.meta.title : '' }) }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" :label="$t('cancel')" />
          <q-btn flat color="primary" :label="$t('confirm')" @click="handleDeleteMenuItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import { uuId } from '@/utils/common'
import ArticleCategorySelect from '@/components/ArticleCategorySelect/ArticleCategorySelect'

export default {
  name: 'BaseMenuItem',
  components: {
    ArticleCategorySelect
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['myRouter', 'initLevel', 'bgColor', 'bgColorLevel', 'duration', 'basePath'],
  data() {
    return {
      menuItem: '', // 正在操作的菜单项
      categoryNameMaxLength: 12, // 菜单名称最多12个字符
      categoryFormValid: false, // 表单验证是否通过
      prompt: false, // 是否显示提示框
      confirm: false, // 是否显示确认框
      categoryForm: {
        id: '',
        name: '',
        icon: '',
        idUser: '',
        idParent: '',
        path: ''
      },
      categories: [],
      isEdit: false, // 是否是修改
      categoryIdList: [], // 要删除的分类ID列表
      categoryParentId: [] // 要删除的分类的父ID，用来判断父ID是否有子分类，如果没有，则父级分类的isParent变为0
    }
  },

  validations: {
    categoryForm: {
      name: {
        required
      },
      idUser: {
        required
      },
      idParent: {
        required
      },
      path: {
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

  methods: {

    /**
     * 处理内部链接
     * @param basePath
     * @param itemPath
     */
    handleLink(basePath, itemPath) {
      const link = basePath === undefined ? itemPath : basePath + '/' + itemPath
      if(link.indexOf('http') !== -1) {
        return '#'
      }
      return link
    },

    /**
     * 右击菜单
     * plugin: https://github.com/GitHub-Laziji/menujs
     * @param item: 获得菜单项的信息
     * @returns {boolean}
     */
    onContextmenu(item) {
      if(item.meta.isShowMenuContext) {
        this.$contextmenu({
          items: [
            {
              label: this._i18n.t('menu.addArticle'),
              icon: 'fas fa-file-signature',
              disabled: item.meta.isParent || item.path === '/',
              onClick: () => {
                this.handleAddArticle(item)
              }
            },
            {
              label: this._i18n.t('menu.menuAdd'),
              icon: 'far fa-calendar-plus',
              onClick: () => {
                this.prompt = true
                this.isEdit = false
                this.categoryForm.idParent = item.meta.id
                this.handleGetMenuItem(item)
              }
            },
            {
              label: this._i18n.t('menu.menuModify'),
              icon: 'far fa-calendar-check',
              disabled: item.path === '/',
              onClick: () => {
                this.isEdit = true
                this.prompt = true
                this.handleGetMenuItem(item)
                this.handleGetCategoryForm(item)
                this.handleGetCategories()
              }
            },
            {
              label: this._i18n.t('menu.menuDelete'),
              icon: 'far fa-calendar-times',
              disabled: item.path === '/',
              onClick: () => {
                this.confirm = true
                this.handleGetMenuItem(item)
                this.handleGetCategoryIdList(item)
              }
            }
          ],
          x: event.clientX,
          y: event.clientY,
          customClass: 'menu-context',
          zIndex: 3000,
          minWidth: 230
        })
      }
      return false
    },

    /**
     * 提交表单
     */
    handleSubmitForm() {
      if(this.isEdit) {
        this.handleModifyMenuItem()
      } else {
        this.handleAddMenuItem()
      }
    },

    /**
     * 添加菜单
     */
    handleAddMenuItem() {
      this.categoryForm.idUser = this.userId
      if(this.menuItem.path === '/') {
        this.categoryForm.idParent = this._constant.gather.TOP_LEVEL_MENU_ID
      }
      if(this.categoryForm.idParent !== this._constant.gather.TOP_LEVEL_MENU_ID) {
        this.categoryForm.idParent = this.menuItem.meta.id
      }
      this.categoryForm.path = uuId(8, 16)
      this.$v.$touch()
      if(!this.$v.categoryForm.$invalid) {
        this.prompt = false
        this.$store.dispatch('addCategory', this.categoryForm).then(res => {
          if(res.code === this._constant.srCode.SUCCESS) {
            this._commonHandle.handleNotify({
              type: this._constant.notify.notifyType.POSITIVE,
              message: this._i18n.t('menu.successAddMenu')
            })
            this.handleRegenerateMenu(res.data.category.name)
          }
        }).catch(error => {
          this._commonHandle.handleNotify({
            type: this._constant.notify.notifyType.NEGATIVE,
            message: this._i18n.t('menu.failedAddMenu') + error.message
          })
          console.error(error)
        })
      }
    },

    /**
     * 删除分类
     * item: 菜单项信息
     */
    async handleDeleteMenuItem() {
      this._commonHandle.handleShowLoading()
      this.confirm = true

      // 1、删除该分类底下的所有文章
      const deleteArticleResult = await this.$store.dispatch('deleteArticleByCategoryIdList', this.categoryIdList)

      // 2、删除该分类
      const deleteCategoryResult = await this.$store.dispatch('batchDeleteCategory', { categoryIdList: this.categoryIdList, categoryParentId: this.categoryParentId })
      if(deleteArticleResult.code === this._constant.srCode.SUCCESS &&
         deleteCategoryResult.code === this._constant.srCode.SUCCESS) {
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.POSITIVE,
          message: this._i18n.t('menu.successDeleteMenu')
        })
        this.handleRegenerateMenu()
      } else if(deleteCategoryResult.code !== this._constant.srCode.SUCCESS) {
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.NEGATIVE,
          message: this._i18n.t('menu.failedDeleteMenu')
        })
      } else if(deleteArticleResult.code !== this._constant.srCode.SUCCESS) {
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.NEGATIVE,
          message: this._i18n.t('menu.failedDeleteArticle')
        })
      } else {
        console.error(this._i18n.t('menu.failedDeleteMenu'))
      }
    },

    /**
     * 修改菜单
     */
    handleModifyMenuItem() {
      this._commonHandle.handleShowLoading()
      this.$store.dispatch('modifyCategory', this.categoryForm).then(res => {
        this._commonHandle.handleHideLoading()
        if(res.code === this._constant.srCode.SUCCESS) {
          this._commonHandle.handleNotify({
            type: this._constant.notify.notifyType.POSITIVE,
            message: this._i18n.t('menu.successModifyMenu')
          })
          this.handleRegenerateMenu(res.data.category.name)
        } else {
          this._commonHandle.handleNotify({
            type: this._constant.notify.notifyType.NEGATIVE,
            message: this._i18n.t('menu.failedModifyMenu')
          })
        }
      }).catch(error => {
        this._commonHandle.handleNotify({
          type: this._constant.notify.notifyType.NEGATIVE,
          message: this._i18n.t('menu.failedModifyMenu') + error.message
        })
        console.error(error)
      })
    },

    /**
     * 得到正在操作的菜单项
     * @param menuItem
     */
    handleGetMenuItem(menuItem) {
      this.menuItem = menuItem
      this.categoryParentId.push(menuItem.meta.idParent)
    },

    /**
     * 得到正在操作的菜单项
     * @param item
     */
    handleAddArticle(item) {
      this.$router.push({ path: '/article-writing', query: { categoryId: item.meta.id }})
    },

    /**
     * 给categoryForm 赋值
     */
    handleGetCategoryForm() {
      this.categoryForm.idUser = this.userId
      this.categoryForm.path = this.menuItem.path
      this.categoryForm.id = this.menuItem.meta.id
      this.categoryForm.name = this.menuItem.meta.title
      this.categoryForm.icon = this.menuItem.meta.icon
      this.categoryForm.idParent = this.menuItem.meta.idParent
    },

    handleGetCategories() {
    },

    /**
     * 获取要删除的分类ID列表
     * @param menuItem：要删除的菜单项
     */
    handleGetCategoryIdList(menuItem) {
      if(menuItem.meta) {
        this.categoryIdList.push(menuItem.meta.id)
      }
      if(menuItem.children && menuItem.children.length) {
        this._lodash.forEach(menuItem.children, item => {
          this.handleGetCategoryIdList(item)
        })
      }
    },

    /**
     * 增删改分类之后，重新生成菜单
     */
    handleRegenerateMenu(menuName) {
      this.$store.dispatch('routers/generateRoutes', this.userId).then(() => {
        menuName ? this.$router.push({ name: menuName }) : this.$router.push('/')
      })
    },

    /**
     * 得到分类选择框的选项值
     * @param categoryInfo
     */
    handleGetEmitCategory(categoryInfo) {
      this.categoryForm.idParent = categoryInfo.value
    },

    /**
     * 设置为一级菜单
     */
    handleSetTopLevel() {
      this.categoryForm.idParent = this._constant.gather.TOP_LEVEL_MENU_ID
    }
  }
}
</script>

<style scoped lang="scss">
  /* item 颜色 */
  $ITEM_COLOR: #2c3e50;

    /* item 激活时颜色 */
  $ACTIVE_COLOR: #1976d2;
  $ACTIVE_BACKGROUND: rgba(25, 118, 210, 0.0618);

  .infos-content {
    max-width: 460px;
  }

  .base-menu-item {
    color: $ITEM_COLOR
  }

  /* item 被激活时父组件的样式 */
  .baseRootItemActive {
    color: $ACTIVE_COLOR
  }

  .baseItemActive {
    color: #1976d2;
    transition: all .618s;
    &:after {
      content: '';
      position: absolute;
      width: 3px;
      height: 100%;
      background: #1976d2;
      top: -0.5px;
      right: 0
    }
  }
</style>
