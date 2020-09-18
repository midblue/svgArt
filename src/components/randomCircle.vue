<template>
  <circle
    :cx="x"
    :cy="y"
    :r="rad"
    :transform="transform"
    v-bind="{ ...elementAddins, ...fillAddins }"
  ></circle>
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
    const rad = (r() * (50 - this.boundsMod * 2)) / 2,
      x = r() * (100 - this.boundsMod * 2 - rad * 2) + this.boundsMod + rad,
      y = r() * (100 - this.boundsMod * 2 - rad * 2) + this.boundsMod + rad
    // console.log(rad, x, y, r(), this.boundsMod)
    return {
      x: x + '%',
      y: y + '%',
      rad: rad + '%',
    }
  },
  computed: {
    transform() {
      const maxRotation = 360
      return `rotate(${(r() - 0.5) * maxRotation} ${(parseInt(this.x) / 100) *
        this.wh} ${(parseInt(this.y) / 100) * this.wh})`
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss"></style>
