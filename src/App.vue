<template>
    <div>
      <h1 class="titulo-principal"></h1>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style scoped>
  .titulo-principal {
    margin-top: 60px; 
    text-align: center; 
  }
  </style>