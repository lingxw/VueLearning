<template>
  <pre v-highlight><code :class="contentLang" v-html="content"></code></pre>
</template>

<script>

export default {
  name: 'HighlightCode',
  components: {
  },
  props: {
    code: {
      type: String,
      default: ''
   },
   lang: {
      type: String,
      default: ''
   }
  },
  data() {
  return {
    content: null,
    contentLang: null,
    }
  },
  created() {
    this.name = this.$options.name
    console.log(`[${this.name}] Created`)
    this.content = this.$props.code
    this.contentLang = this.$props.lang
  },
  mounted() {
    console.log(`[${this.name}] Mounted`)
  },
  computed: {
  },
  methods: {
  }
}
</script>
