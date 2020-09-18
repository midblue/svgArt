<template>
  <mask>
    <rect x="0" y="0" width="100%" height="100%" fill="white" />
    <slot></slot>
  </mask>
</template>

<script>
const r = () => parseFloat(Math.random().toFixed(4))

export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    r,
  },
}
</script>

<style scoped lang="scss"></style>
