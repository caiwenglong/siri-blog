<template>
  <q-scroll-area :visible="false" class="fit" :thumb-style="thumbStyleOfMenu">
    <div>
      <!-- 动态菜单 -->
      <q-list>
        <base-menu-item
          :my-router="menuList"
          :init-level="0"
          :bg-color="bgColor"
          :duration="150"
          :bg-color-level="1"
        />
      </q-list>
    </div>
  </q-scroll-area>
</template>

<script>
import { thumbStyleOfMenu } from '../BaseContent/thumbStyle'
import BaseMenuItem from './BaseMenuItem'
import { mapGetters } from 'vuex'
export default {
  name: 'BaseMenu',
  inject: ['reload'],
  components: { BaseMenuItem },
  data() {
    return {
      menuList: this.$store.getters.getRoutes[0].children,
      bgColor: 'bg-grey',
      thumbStyleOfMenu
    }
  },
  computed: {
    ...mapGetters([
      'getRoutes'
    ])
  },
  watch: {
    // 当增删改查菜单后更新菜单列表
    getRoutes() {
      this.reload()
    }
  }
}
</script>
