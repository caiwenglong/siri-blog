<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      align="left"
      :breakpoint="0"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab name="material Icons" label="material design 图标集" />
      <q-tab name="fontawesome-v5" label="fontawesome-v5 图标集" />
      <q-tab name="htu" label="如何使用图标集合中的图标" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="material Icons">

        <template v-for="(v,k,i) in materialIcons">
          <q-icon
            :key="k"
            class="myIcon tag-read"
            :name="v"
            @click="copy(materialIcons_key[i])"
          >
            <q-tooltip>
              {{ materialIcons_key[i] }}
            </q-tooltip>
          </q-icon>
        </template>

      </q-tab-panel>

      <q-tab-panel name="fontawesome-v5">
        <template v-for="(v,k,i) in fontawesome">
          <q-icon :key="k" class="myIcon tag-read" :name="v" @click="copy(fontawesome_key[i])">
            <q-tooltip>
              {{ fontawesome_key[i] }}
            </q-tooltip>
          </q-icon>
        </template>

      </q-tab-panel>

      <q-tab-panel name="htu">
        <div class="base-markdown-content">
          <template>
            <v-md-editor :value="content" mode="preview" />
          </template>
        </div>
      </q-tab-panel>

    </q-tab-panels>

  </div>
</template>

<script>
import * as materialIconsSet from '@quasar/extras/material-icons'
import * as fontawesomeSet from '@quasar/extras/fontawesome-v5'
import { underscore, hyphen, snake } from 'name-styles'
import { copyToClipboard } from 'quasar'

export default {
  name: 'Icon',
  data() {
    return {
      tab: 'material Icons',
      materialIcons: [],
      materialIcons_key: [],
      fontawesome: [],
      fontawesome_key: [],
      content: '"Quasar支持：Material Icons、Font Awesome、Ionicons、MDI、Eva Icons和Themify Icons。\n' +
    '这个项目的图标集使用的是quasar自带的material design和fontawesome-v5图标集\n' +
    '\n' +
    '[[toc]]\n' +
    '\n' +
    '### 使用方式\n' +
    '```html\n' +
    '<!-- 单个图标使用 -->\n' +
    '<q-icon name="settings"/>\n' +
    '\n' +
    '<!-- 在按钮上使用图标 -->\n' +
    '<q-btn color="primary" icon="mail" label="On Left" />\n' +
    '```\n' +
    '几乎所有的组件都提供了icon属性来设置图标\n' +
    '\n' +
    '如果想要使用Quasar的其他图标集合，请在```quasar.js```里添加对于的依赖即可使用，关于图标的依赖都在```quasar/extras```目录下,比如我想要使用mdi-v4图标集\n' +
    '\n' +
    '```js\n' +
    'import \'@quasar/extras/mdi-v4/mdi-v4.css\'\n' +
    '```\n' +
    '\n' +
    '### 注意，需要使用全小写才能正确使用图标\n' +
    '在导入图标集合是发现，集合导出的图标名称是驼峰命名的，但是在quasar里使用驼峰命名的图标会出问题，比如：\n' +
    '图标名为 ArrowUpward 时\n' +
    '需要为 ```<q-icon name="arrow_upward"/>``` 才能正确使用\n' +
    '### 如果你想制作一个图标集合界面，就需要对导出的图标集合名词进行修改，使用正则是最方便的修改方式\n' +
    '```js\n' +
    '// 下面是针对 fontawesome-v5 图标集的修改\n' +
    '// 驼峰转 - 连接,并且添加\' fa-\'前缀\n' +
    'toLineForFa (name) {\n' +
    '  return name.replace(/([A-Z]|[0-9])/g, \'-$1\').toLowerCase().replace(/-/, \' fa-\')\n' +
    '}\n' +
    '```\n' +
    '\n' +
    '### 当然你也可以使用第三方工具包，比如：``name-styles``\n' +
    '\n' +
    '```js\n' +
    'import {\n' +
    '    camel,\n' +
    '    pascal,\n' +
    '    hyphen,\n' +
    '    snake\n' +
    '} from "name-styles";\n' +
    ' \n' +
    'const s = "Hello Name-Styles";\n' +
    ' \n' +
    'camel(s);\n' +
    '// helloNameStyles\n' +
    ' \n' +
    'pascal(s);\n' +
    '// HelloNameStyles\n' +
    ' \n' +
    'hyphen(s);\n' +
    '// hello-name-styles\n' +
    ' \n' +
    'snake(s);\n' +
    '// hello_name_styles\n' +
    '```\n' +
    '\n' +
    '下面是quasar对各个图标集图标名称的限制（我也不知道为啥要加这些限制）\n' +
    '\n' +
    '| Quasar IconSet name | Name prefix | Examples | Notes |\n' +
    '| --- | --- | --- | --- |\n' +
    '| material-icons | *None* | thumb_up | Notice the underline character instead of dash or space |\n' +
    '| material-icons-outlined | o_ | o_thumb_up | Notice the underline character instead of dash or space; **Quasar 1.0.5+** |\n' +
    '| material-icons-round | r_ | r_thumb_up | Notice the underline character instead of dash or space; **Quasar 1.0.5+** |\n' +
    '| material-icons-sharp | s_ | s_thumb_up | Notice the underline character instead of dash or space; **Quasar 1.0.5+** |\n' +
    '| ionicons-v4 | ion-, ion-md-, ion-ios-, ion-logo- | ion-heart, ion-logo-npm, ion-md-airplane | Use QIcon instead of `<ion-icon>` component; Logo icons require \'ion-logo-\' prefix |\n' +
    '| fontawesome-v5 | fa[s,r,l,d,b] fa- | "fas fa-ambulance" | QIcon "name" property is same as "class" attribute value in Fontawesome docs examples (where they show `<i>` tags) |\n' +
    '| mdi-v5/v4/v3 | mdi- | mdi-alert-circle-outline | Notice the use of dash characters; Use only one of mdi-v5, mdi-v4 or mdi-v3 |\n' +
    '| eva-icons | eva- | eva-shield-outline, eva-activity-outline | Notice the use of dash characters |\n' +
    '| themify | ti- | ti-hand-point-up | Notice the use of dash characters |\n' +
    '| line-awesome | la[s,r,l,d,b] la- | "las la-atom" | QIcon "name" property is same as "class" attribute value in Line Awesome docs examples (where they show `<i>` tags); \n' +
    '\n' +
    '### 当然你也可以使用iconfont图标集\n' +
    '使用iconfont图标集的方式在百度上都有，而且很简单，需要的话自己整合即可\n' +
    '"'
    }
  },
  created() {
    this.initMaterial()
    this.initFontawesome()
    this.getMsg()
  },
  methods: {

    // materialIcons图标集合初始化
    initMaterial() {
      // 获取materialIcons图标集合
      this.materialIcons = materialIconsSet
      const tMis = Object.keys(materialIconsSet)
      // 获取图标materialIcons下划线格式命名集合
      for(const j in tMis) {
        this.materialIcons_key.push(snake(underscore(tMis[j]).replace(/(mat)/g, '')))
      }
    },

    // fontawesome图标集合初始化
    initFontawesome() {
      this.fontawesome = fontawesomeSet
      const tMis = Object.keys(fontawesomeSet)
      for(const j in tMis) {
        this.fontawesome_key.push(hyphen(tMis[j]).replace(/-/, ' fa-'))
      }
    },

    // 复制成功
    copy(e) {
      copyToClipboard(e).then(() => {
        this.$q.notify({
          message: '成功复制到剪切板',
          color: 'green',
          position: 'top',
          timeout: 1500
        })
      }).catch(() => {
        // 不支持复制
        this.$q.notify({
          message: '复制到剪切板失败',
          color: 'warming',
          position: 'top',
          timeout: 1500
        })
      })
    },

    getMsg() {}

  }
}
</script>
<style lang="css" scoped>
  .myIcon {
    padding: 15px;
    height: 35px;
    width: 35px;
    color: #363F45;
  }

  .myIcon:hover {
    background: #EDECEC;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }
</style>
