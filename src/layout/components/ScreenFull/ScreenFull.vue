<template>
  <div ref="fullscreen" class="screenFull" @click="fullScreen">
    <svg-icon icon-class="fullscreen" style="color: #fff; width: 20px; height: 20px" />
  </div>
</template>

<script>
import Screenfull from 'screenfull'

export default {
  name: 'ScrennFull',
  methods: {
    fullScreen() {
      // const element = this.$refs.fullscreen
      if (Screenfull.isEnabled) {
        Screenfull.toggle()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
