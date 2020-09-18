<template>
  <linearGradient
    :x1="`${(r() - 0.5) * 30}%`"
    :y1="`${(r() - 0.5) * 30}%`"
    :x2="`${(r() + 0.5) * 80}%`"
    :y2="`${(r() + 0.5) * 80}%`"
  >
    <stop offset="0%" :stop-color="`${color1}`" :stop-opacity="1" />
    <stop offset="100%" :stop-color="`${color2}`" :stop-opacity="1" />
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
    color1() {
      return this.randomColor()
    },
    color2() {
      if (r() > 0.7) return this.color1
      return this.randomColor()
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
