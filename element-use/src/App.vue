<template>
  <div id="app">
    <div id="nav">
      <router-link to="/tree">Tree</router-link> |
      <router-link to="/code1">Code View 1</router-link> |
      <router-link to="/code2">Code View 2</router-link> |
      <router-link to="/code3">Code View 3</router-link> |
      <router-link to="/dragDiv">Drag Div</router-link> |
      <router-link to="/dragView">Drag View</router-link> |
      <router-link to="/dragView2">Drag View2</router-link> |
      <router-link to="/dragView3">Drag View3</router-link> |
      <router-link to="/csv">csv</router-link> |
      <router-link to="/print">print</router-link> |
      <router-link to="/ocrView">ocrView</router-link> |
      <router-link to="/graphView">graphView</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  height: 50px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
