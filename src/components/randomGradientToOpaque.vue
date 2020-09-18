<template>
  <linearGradient
    :x1="`${(r() - 0.5) * 30}%`"
    :y1="`${(r() - 0.5) * 30}%`"
    :x2="`${(r() + 0.5) * 80}%`"
    :y2="`${(r() + 0.5) * 80}%`"
  >
    <stop
      offset="0%"
      :stop-color="`${color}`"
      :stop-opacity="startOrEnd ? 1 : 0"
    />
    <stop
      offset="100%"
      :stop-color="`${color}`"
      :stop-opacity="startOrEnd ? 0 : 1"
    />
  </linearGradient>
</template>

<script>
const r = () => parseFloat(Math.random().toFixed(4))

export default {
  props: {
    colors: {
      default: [],
    },
  },
  data() {
    return {}
  },
  computed: {
    color() {
      return this.randomColor()
    },
    startOrEnd() {
      return r() > 0.5
    },
  },
  mounted() {},
  methods: {
    r,
    randomColor() {
      return this.colors[Math.floor(r() * this.colors.length)]
    },
  },
}
</script>

<style scoped lang="scss"></style>
