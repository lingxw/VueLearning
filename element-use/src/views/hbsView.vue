<template>
  <div id="subDiv">
  </div>
</template>

<script>
import home from '../components/Handlebars/home'

export default {
  name: 'HandlebarsView',
  // delimiters: ['${', '}'],
  components: {
  },
  data() {
    return {
      subDiv: null
    }
  },
  mounted() {
    this.subDiv = document.getElementById("subDiv")
    this.subDiv.innerHTML = home;
  }
}
</script>
