<template>
  <q-btn v-if="$q.screen.gt.xs" flat no-caps no-wrap class="q-ml-xs">
    <q-toolbar-title shrink class="text-weight-bold">
      {{ title }}
    </q-toolbar-title>
  </q-btn>
</template>

<script>
export default {
  name: 'ToolbarTitle',
  data() {
    return {
      title: 'SIRI'
    }
  }
}
</script>
