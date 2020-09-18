<template>
  <path
    :d="path"
    v-bind="{
      ...elementAddins,
      ...strokeAddins,
      'stroke-width': r() * 20,
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
    // whWithBounds() {
    // 	return this.wh * (1-(this.boundsMod/100))
    // },
    path() {
      const elSize = r() * 0.15 + 0.1
      const pairs = []
      pairs.push([
        r() * this.wh * 1.3 - this.wh * 0.15,
        r() * this.wh * 1.3 - this.wh * 0.15,
      ])
      for (let i = 1; i < r() * 5 + 2; i++)
        pairs.push([
          r() * this.wh * elSize * (r() > 0.5 ? -1 : 1),
          r() * this.wh * elSize * (r() > 0.5 ? -1 : 1),
        ])
      let pathStr = `M ${pairs[0][0]} ${pairs[0][1]} `
      for (let i = 1; i < pairs.length; i++)
        pathStr += `t ${pairs[i][0]} ${pairs[i][1]} `
      return pathStr
    },
  },
  mounted() {},
  methods: { r },
}
</script>

<style scoped lang="scss"></style>
