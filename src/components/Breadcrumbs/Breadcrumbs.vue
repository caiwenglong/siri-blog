<template>
  <div class="flex">
    <q-breadcrumbs style="margin-left: 10px;" active-color="none">
      <transition-group name="breadcrumb">
        <template v-for="(v,i) in breadcrumbs">
          <q-breadcrumbs-el
            v-if="v.title"
            :key="i+v.title"
            style="margin-top: 4px"
            :label="$t(v.t_title) ? $t(v.t_title) : v.title"
            :icon="v.icon"
          >
            <div v-if="breadcrumbs.length !== i+1" style="margin:0 8px">
              /
            </div>
          </q-breadcrumbs-el>
        </template>
      </transition-group>
    </q-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  data() {
    return {
      breadcrumbs: []
    }
  },
  computed: {
    getBreadcrumbs() {
      return this.$store.getters.getBreadcrumbs
    }
  },
  watch: {
    getBreadcrumbs(newVal, oldVal) {
      this.breadcrumbs = newVal
    }
  },
  mounted() {
    this.breadcrumbs = this.$store.getters.getBreadcrumbs
  }
}
</script>
