<template>
  <path
    :d="path"
    v-bind="{
      ...elementAddins,
      ...strokeAddins,
      'stroke-width': 5,
    }"
  ></path>
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
    wh: {},
    boundsMod: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  computed: {
    path() {
      const elSize = r() * 0.6 + 0.1
      const pairs = []
      pairs.push([
        r() * (this.wh - this.boundsMod * 2) + this.boundsMod,
        r() * (this.wh - this.boundsMod * 2) + this.boundsMod,
      ])
      for (let i = 1; i < r() * 15 + 2; i++) {
        const keepX = r() > 0.5
        const base = keepX ? pairs[i - 1][1] : pairs[i - 1][0],
          constantVal = keepX ? pairs[i - 1][0] : pairs[i - 1][1]
        let diff, newVal
        while (
          !newVal ||
          newVal < this.boundsMod ||
          newVal > this.wh - this.boundsMod
        ) {
          diff = r() * this.wh * elSize * (r() > 0.5 ? -1 : 1)
          newVal = base + diff
        }
        const x = keepX ? constantVal : newVal
        const y = keepX ? newVal : constantVal
        pairs.push([x, y])
      }
      let pathStr = `M ${pairs[0][0]} ${pairs[0][1]} `
      for (let i = 1; i < pairs.length; i++)
        pathStr += `L ${pairs[i][0]} ${pairs[i][1]} `
      return pathStr
    },
  },
  mounted() {},
  methods: { r },
}
</script>

<style scoped lang="scss"></style>
