<template>
  <div>
    <button class="reset" @click="reset">Reset localStorage</button>
    <golden-layout  class="hscreen">
      <gl-row>
        <gl-component title="component1">
          <h1>Component 1</h1>
        </gl-component>
        <gl-stack>
          <gl-component title="component2">
            <h1>Component 2</h1>
          </gl-component>
          <gl-component title="component3">
            <h1>Component 3</h1>
          </gl-component>
        </gl-stack>
      </gl-row>
    </golden-layout>
  </div>
</template>

<script>
export default {
  name: 'GoldenLayoutView',
  components: {
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    reset() {
      delete localStorage.browserGL;
      location.reload();
    }
  }
}
</script>

<style>
body {
	overflow: hidden; 	/* The 'light' theme let a scroll-bar on the right of the main container */
}
.hscreen {
	width: 80vw;
	height: 80vh;
}
.reset {
	position: absolute;
	bottom: 0;
	right: 0;
	float: right;
	z-index: 9000;
}
.reset:hover {
	background-color: red;
}
</style>
