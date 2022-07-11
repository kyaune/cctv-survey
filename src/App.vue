<template>
    <div class="app" v-if="showDialog">
      <Survey></Survey>
    </div>
</template>
<script>
import Survey from './components/Survey.vue'
import results from './components/results.js'
export default {
  components: { Survey },
  setup() {
    const { showDialog } = results()
    return {
      showDialog
    }
  }
}
</script>

<style>
@import './assets/base.css';
.app {
  width: 0;
  height: 0;
  margin: 0 auto;
  font-weight: normal;
  font-size: 21px;
  line-height: 25px;
  z-index: 2000;
  position: fixed;
  font-family: 'FedraSans';
}
@font-face {
  src: local('FedraSans'), url('./src/assets/fonts/FedraSans.woff') format('woff');
}
</style>
