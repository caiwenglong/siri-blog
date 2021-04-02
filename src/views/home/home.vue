<template>

  <div class="unit unit-home">
    <div class="markdown-grammar">
      <v-md-editor :value="articleContent1" mode="preview"/>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      articleContent1: `
::: tip
HI，欢迎来到SIRI博客网，博客网站使用说明：
  - 右击主页菜单添加一级菜单，右击创建的一级菜单来添加子菜单
  - 菜单的图标可以在图标集合中单击复制图标名称到添加菜单的图标类名中即可
:::

## 文章写作时用到的markdown语法
[markdwon基本语法](http://markdown.p2hp.com/basic-syntax/)

### KaTeX语法
$$\\\\sum_{i=1}^n a_i=0$$


### Mermaid（流程图）
[流程图语法](https://mermaid-js.github.io/mermaid/#/flowchart)

\`\`\`mermaid
graph LR
A --- B
B-->C[fa:fa-ban forbidden]
B-->D(fa:fa-spinner);
\`\`\`

### emoji表情
- 使用方式一：通用代码 Unicode， 使用格式为：\`&#x\` + \`unicode\` + \`;\`，例如：\`&#x1F601;\`

|Unicode|Markdown|Emoji|
|-|-|-|
|U+1F601|\`&#x1F601;\`|&#x1F601;|
|U+2709|\`&#x2709;\`|&#x2709;|
|U+1F170|\`&#x1F170;\`|&#x1F170;|
|U+1F92A|\`&#x1F92A;\`|&#x1F92A;|

- 使用方式二：非通用代码（有些不支持），使用格式为：\`:\` + 对应英文单词 + \`:\`， 例如：:astonished: ：\`:astonished:\`， :heart_eyes: ： \`:heart_eyes:\`
[Unicode全列表参见](https://code-farmer-i.github.io/vue-markdown-editor/zh/plugins/emoji.html)

|对应英文单词|Markdown|Emoji|
|-|-|-|
|astonished|\`:astonished:\`|:astonished:|
|heart_eyes|\`:heart_eyes:\`|:heart_eyes:|
|heavy_check_mark|\`:heavy_check_mark:\`|:heavy_check_mark:|

      `
    }
  }
}
</script>
