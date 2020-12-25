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
          :class="bgColor + '-' + bgColorLevel"
          :inset-level="initLevel"
          :to="handleLink(basePath, item.path)"
          clickable
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
          :class="bgColor + '-' + bgColorLevel"
          :default-opened="item.meta.isOpen"
          :header-inset-level="initLevel"
          :icon="item.meta.icon"
          :label="item.meta.title"
          tag="div"
          @contextmenu.prevent="onContextmenu(item)"
        >

          <!-- 菜单项缩进 + 0.3 ; 背景色深度 + 1 ; 如果上级菜单路径存在，则拼接上级菜单路径 -->
          <base-menu-item
            :my-router="item.children"
            :init-level="initLevel + 0.2"
            :bg-color-level="bgColorLevel+1"
            :bg-color="bgColor"
            :base-path="basePath === undefined ? item.path : basePath + '/' + item.path"
          />

        </q-expansion-item>
      </template>
    </template>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="categoryForm" v-model="categoryFormValid">
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
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-input v-model="categoryForm.icon" dense :label="$t('category.icon')" @keyup.enter="prompt = false" />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn v-close-popup flat :label="$t('cancel')" />
          <q-btn v-close-popup flat :label="$t('submit')" @click="handleSubmitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import { uuId } from '@/utils/common'

export default {
  name: 'BaseMenuItem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['myRouter', 'initLevel', 'bgColor', 'bgColorLevel', 'duration', 'basePath'],
  data() {
    return {
      menuItemSelect: '',
      categoryNameMaxLength: 12,
      categoryFormValid: false,
      prompt: false,
      categoryForm: {
        name: '',
        icon: '',
        idUser: '',
        idParent: '',
        path: '',
        isDisable: 0
      }
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
      'userId'
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
     * @param item: 获得菜单项的信息
     * @returns {boolean}
     */
    onContextmenu(item) {
      this.$contextmenu({
        items: [
          {
            label: '添加分类',
            icon: 'eye',
            onClick: () => {
              this.prompt = true
              this.menuItemSelect = item
            }
          },
          { label: '编辑' },
          { label: '删除分类' }
        ],
        x: event.clientX,
        y: event.clientY,
        customClass: 'menu-context',
        zIndex: 3000,
        minWidth: 230
      })
      return false
    },

    handleSubmitForm() {
      this.categoryForm.idUser = this.userId
      this.categoryForm.idParent = this.menuItemSelect.meta.id
      this.categoryForm.path = uuId(8, 16)
      this.$v.$touch()
      if(!this.$v.categoryForm.$invalid) {
        this.$store.dispatch('addCategory', this.categoryForm).then(res => {
          if(res.code === this._constant.srCode.SUCCESS) {
            location.reload()
          }
        })
      }
    }
  }
}
</script>
