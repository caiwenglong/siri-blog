<template>
  <div class="unit-about-me">
    <template>
      <div class="q-px-lg q-pb-md">
        <div>时间线</div>
        <q-timeline color="secondary">
          <q-timeline-entry heading>
            工作经历
          </q-timeline-entry>

          <q-timeline-entry
            title="人力资源管理系统"
            subtitle="June 27, 2019 - 至今"
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="Event Title"
            subtitle="February 21, 1986"
            icon="delete"
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>

          <q-timeline-entry heading>
            November, 2017
          </q-timeline-entry>

          <q-timeline-entry
            title="Event Title"
            subtitle="February 22, 1986"
            avatar="https://cdn.quasar.dev/img/avatar2.jpg"
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="Event Title"
            subtitle="February 22, 1986"
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="Event Title"
            subtitle="February 22, 1986"
            color="orange"
            icon="done_all"
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="Event Title"
            subtitle="February 22, 1986"
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="Event Title"
            subtitle="February 22, 1986"
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
      <div class="q-pa-md q-gutter-md">
        <div>视差</div>
        <div class="row justify-between">

          <q-parallax
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          >
            <h1 class="text-white">Basic</h1>
          </q-parallax>

        </div>
      </div>
      <div class="q-pa-md">
        <di>滑块</di>
        <q-list dense>
          <q-item>
            <q-item-section avatar>
              <q-icon color="teal" name="volume_up" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="volume"
                :min="0"
                :max="10"
                label
                color="teal"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="deep-orange" name="brightness_medium" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="brightness"
                :min="0"
                :max="10"
                label
                color="deep-orange"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="mic"
                :min="0"
                :max="50"
                label
              />
            </q-item-section>
          </q-item>

          <q-separator inset spaced />

          <q-item>
            <q-item-section side>
              <q-icon name="volume_down" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="volume"
                :min="0"
                :max="10"
                label
              />
            </q-item-section>
            <q-item-section side>
              <q-icon name="volume_up" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AboutMe',
  data() {
    return {
      volume: 6,
      brightness: 3,
      mic: 8
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
