<template>
  <path :d="path" v-bind="{ ...elementAddins, ...fillAddins }"></path>
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
  },
  data() {
    return {}
  },
  computed: {
    path() {
      const elSize = r() * 0.4 + 0.15
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
  methods: {},
}
</script>

<style scoped lang="scss"></style>
