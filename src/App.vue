<template>
  <div id="app">
    <button @click="resetIllust">go</button>
    <button @click="download">dl</button>

    <div id="master" :style="{ width: wh + 'px', height: wh + 'px' }">
      <div id="svgholder0">
        <illust ref="svg" :colors="colors" :wh="wh" :key="render" />
      </div>
    </div>
  </div>
</template>

<script>
import illust from './components/illust.vue'
import html2canvas from 'html2canvas'

export default {
  name: 'App',
  components: {
    illust,
  },
  data() {
    return {
      wh: 700,
      render: 1,
      colors: ['white', '#f00', '#00f'], //['#fff', '#02ADCC', '#fb0'], //['#fff', '#f00'], //, //['white', 'black'], //
    }
  },
  mounted() {
    document.removeEventListener('keydown', this.keyListener)
    document.addEventListener('keydown', this.keyListener)
  },
  methods: {
    keyListener(e) {
      if (e.code === 'Space') this.resetIllust()
      if (e.code === 'KeyD') this.download()
    },
    resetIllust() {
      this.render = Math.random()
    },
    download() {
      this.$refs.svg.$el.style.transform = 'scale(5)'
      this.$nextTick(() => {
        html2canvas(this.$refs.svg.$el).then(canvas => {
          const link = document.createElement('a')
          link.href = canvas.toDataURL()
          link.download = `${Math.random()}`.substring(3, 9) + '.png'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.$refs.svg.$el.style.transform = 'scale(1)'
        })
      })
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#master {
  position: relative;
  margin: 7vh auto 0 auto;
}

#svgholder1,
#svgholder0 {
  position: absolute;
  top: 0;
  left: 0;
  mix-blend-mode: multiply;
}
</style>
