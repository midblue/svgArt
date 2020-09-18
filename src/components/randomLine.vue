<template>
  <line
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
    v-bind="{ ...elementAddins, ...strokeAddins }"
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
  },
  data() {
    const x1 = r() * (100 - this.boundsMod * 2) + this.boundsMod,
      y1 = r() * (100 - this.boundsMod * 2) + this.boundsMod,
      x2 = r() * (100 - this.boundsMod * 2) + this.boundsMod,
      y2 = r() * (100 - this.boundsMod * 2) + this.boundsMod
    return {
      x1: x1 + '%',
      y1: y1 + '%',
      x2: x2 + '%',
      y2: y2 + '%',
    }
    return {
      x1: r() * 150 - 25 + '%',
      y1: r() * 150 - 25 + '%',
      x2: r() * 150 - 25 + '%',
      y2: r() * 150 - 25 + '%',
    }
  },
  computed: {},
  mounted() {},
  methods: { r },
}
</script>

<style scoped lang="scss"></style>
