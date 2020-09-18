<template>
  <polygon
    :points="points"
    :transform="transform"
    v-bind="{ ...elementAddins, ...fillAddins }"
  />
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
    const diam = (r() * (50 - this.boundsMod * 2) * this.wh) / 80 + 20,
      x =
        r() *
          (this.wh - diam - this.boundsMod * 2) *
          (1 - this.boundsMod / this.wh) +
        // (this.wh - diam - this.boundsMod * 2) * 0.25 +
        this.boundsMod,
      y =
        r() *
          (this.wh - diam - this.boundsMod * 2) *
          (1 - this.boundsMod / this.wh) +
        // (this.wh - diam - this.boundsMod * 2) * 0.25 +
        this.boundsMod

    const points = `${diam * 0.5 + x} ${diam * 0.15 + y}, ${diam + x} ${diam +
      y}, ${x} ${diam + y}`
    // console.log(diam, x, y, this.boundsMod)
    return {
      diam,
      x,
      y,
      points,
    }
  },
  computed: {
    transform() {
      const maxRotation = 360
      return `rotate(${(r() - 0.5) * maxRotation} ${this.x +
        this.diam / 2} ${this.y + this.diam / 2})`
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss"></style>
