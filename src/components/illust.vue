<template>
  <svg
    :width="wh"
    :height="wh"
    :viewBox="`0 0 ${wh} ${wh}`"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <randomGradient
        v-for="g in gradientCount"
        :id="`grad${g}`"
        :key="'grad' + g"
        :colors="colors"
      />
      <randomGradientToOpaque id="gradtoopaque" :colors="colors" />

      <randomMask v-for="m in maskCount" :id="`mask${m}`" :key="'mask' + m">
        <component
          v-for="e in 3"
          :key="'maskel' + m + ' ' + e"
          :is="randomElement()"
          :elementAddins="{ ...elementAddins(), opacity: 1 }"
          :fillAddins="{
            ...fillElementAddins(),
            fill: 'black',
            mask: null,
          }"
          :strokeAddins="{
            ...strokeElementAddins(),
            stroke: 'black',
            mask: null,
          }"
          :wh="wh"
        />
      </randomMask>
    </defs>

    <rect id="bg" x="0" y="0" :width="wh" :height="wh" :fill="bgColor" />

    <component
      v-for="e in elementCount"
      :key="'el' + e"
      :is="randomElement()"
      :boundsMod="boundsMod"
      :elementAddins="elementAddins()"
      :fillAddins="fillElementAddins()"
      :strokeAddins="strokeElementAddins()"
      :wh="wh"
    />

    <!-- <rect
      v-if="r() > 0.3"
      id="overlay"
      x="0"
      y="0"
      :width="wh"
      :height="wh"
      :fill="`url(#gradtoopaque)`"
    /> -->
  </svg>
</template>

<script>
// todo some illustrations are all inside the boundsMod of the image
// todo drop shadows in the colors
import randomGradient from './randomGradient'
import randomGradientToOpaque from './randomGradientToOpaque'
import randomMask from './randomMask'
import randomCircle from './randomCircle'
import randomTriangle from './randomTriangle'
import randomRect from './randomRect'
import randomLine from './randomLine'
import randomRoundShape from './randomRoundShape'
import randomPath from './randomPath'
import randomSquarePath from './randomSquarePath'

const possibilities = [
  randomCircle,
  randomRect,
  randomTriangle,
  randomSquarePath,
  randomLine,
  // randomPath,
  // randomRoundShape,
]

const r = () => parseFloat(Math.random().toFixed(4))
const randomHexColor = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16)

export default {
  props: {
    elementCount: {
      default: Math.floor(r() * 60) + 2,
    },
    maskCount: {
      default: Math.floor(r() * 3),
    },
    wh: {
      default: 700,
    },
    colors: {
      default: () => [
        randomHexColor(),
        randomHexColor(),
        randomHexColor(),
        randomHexColor(),
      ],
    },
  },
  components: {
    randomMask,
    randomGradient,
    randomGradientToOpaque,
  },
  data() {
    return {
      opacity: 0.7,
      gradientCount: 6,
      strokeWidth: this.wh / 300,
      componentsInUse: this.generateComponentsToUse(),
    }
  },
  computed: {
    bgColor() {
      return this.colors[0]
      // return `url(#grad${Math.ceil(r() * this.gradientCount)})`
    },
    boundsMod() {
      return 5
      // return (r() - 0.5) * 60
    },
  },
  mounted() {},
  methods: {
    r,
    generateComponentsToUse() {
      const components = []
      let i = 1
      while (i > 0.25) {
        components.push(possibilities[Math.floor(r() * possibilities.length)])
        i = r()
      }
      return components
    },
    randomElement() {
      return this.componentsInUse[Math.floor(r() * this.componentsInUse.length)]
    },
    randomOpacity() {
      const minimum = r()
      return r() * this.opacity * (1 - minimum) + this.opacity * minimum
    },
    elementAddins() {
      return {
        opacity: this.randomOpacity(),
        mask: `url(#mask${Math.ceil(r() * this.maskCount + 1)})`, //1 extra for no mask
      }
    },
    fillElementAddins() {
      return {
        fill: `url(#grad${Math.ceil(r() * this.gradientCount)})`,
        stroke: 'none',
        'fill-rule': 'nonzero',
      }
    },
    strokeElementAddins() {
      return {
        stroke: `url(#grad${Math.ceil(r() * this.gradientCount)})`,
        'stroke-width': this.strokeWidth,
        fill: 'none',
      }
    },
  },
}
</script>

<style scoped lang="scss">
svg {
  position: relative;
}
</style>
