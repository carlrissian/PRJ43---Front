<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Aplicación principal */
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #f4f4f9;
  color: #333;
}

/* General para eliminar márgenes y alinear en el contenedor */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
