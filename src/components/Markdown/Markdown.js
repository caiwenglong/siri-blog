import Vue from 'vue'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'

import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'

import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'

import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'

import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn'
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'

import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn'

VueMarkdownEditor.use(createTipPlugin())
VueMarkdownEditor.use(createTodoListPlugin())
VueMarkdownEditor.use(createLineNumbertPlugin())
VueMarkdownEditor.use(createCopyCodePlugin())
VueMarkdownEditor.use(createMermaidPlugin())
VueMarkdownEditor.use(createKatexPlugin())

VueMarkdownEditor.use(vuepressTheme, {
  codeHighlightExtensionMap: {
    vue: 'html'
  }
})

Vue.use(VueMarkdownEditor)
