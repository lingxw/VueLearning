<template>
  <div style="text-align: left;">
    <highlight-code :lang='contentLang' :code="content" />
  </div>
</template>

<script>
import HighlightCode from '../components/HighlightCode'

export default {
  name: 'CodeView2',
  components: {
    HighlightCode
  },
  data() {
    return {
      content: 'import hljs from \'highlight.js\'\nimport \'highlight.js/styles/googlecode.css\'\n\nlet Highlight = {} // comment',
      contentLang: 'javascript'
    }
  },
  created() {
    this.name = this.$options.name
    console.log(`[${this.name}] Created`)
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

<style>
.hljs-ln-numbers {
  text-align: center;
  color: #ccc;
  border-right: 1px solid #999;
  vertical-align: top;
  padding-right: 5px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hljs-ln-code {
  padding-left: 10px;
}
.hljs-ln-code,
.hljs-ln-numbers {
  line-height: 14px;
}
code {
  white-space: pre-wrap;
  overflow: auto;
}
</style>