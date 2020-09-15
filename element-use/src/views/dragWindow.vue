<template>
  <drag-window :titlex="'test'" :id="1" />
</template>

<script>
  import dragWindow from '../components/DragWindow'
  export default {
    components: {
      dragWindow
    }
  }
</script>