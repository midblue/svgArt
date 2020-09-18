<template>
  <rect
    :x="x"
    :y="y"
    :width="w"
    :height="h"
    :transform="transform"
    v-bind="{ ...elementAddins, ...fillAddins }"
  ></rect>
</template>

<script>
const r = () => parseFloat(Math.random().toFixed(4))

export default {
  props: {
    elementAddins: {
      type: Object,
      default: {},
    },
    fillAddins: {
      type: Object,
      default: {},
    },
    strokeAddins: {
      type: Object,
      default: {},
    },
    boundsMod: {
      type: Number,
      default: 0,
    },
    wh: {
      type: Number,
      default: 0,
    },
  },
  data() {
    const x = r() * (100 - this.boundsMod * 2) + this.boundsMod,
      y = r() * (100 - this.boundsMod * 2) + this.boundsMod,
      w = r() * (100 - x - this.boundsMod),
      h = r() * (100 - y - this.boundsMod)
    return {
      x: x + '%',
      y: y + '%',
      w: w + '%',
      h: h + '%',
    }
  },
  computed: {
    transform() {
      // chance to rotate
      const maxRotation = 20
      if (r() > 0.2) return ''
      return `rotate(${(r() - 0.5) * maxRotation} ${(parseInt(this.x) / 100) *
        this.wh +
        ((parseInt(this.w) / 100) * this.wh) / 2} ${(parseInt(this.y) / 100) *
        this.wh +
        ((parseInt(this.h) / 100) * this.wh) / 2} )`
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss"></style>
