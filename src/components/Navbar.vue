<!-- src/components/Navbar.vue -->
<template>
    <nav>
      <ul>
        <li><router-link to="/">Listagem</router-link></li>
        <li><router-link to="/cadastro">Cadastro</router-link></li>
        <li><router-link to="/visualizacao/:id">Visualização</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
  };
  </script>
  
  <style scoped>
  nav {
    background-color: #333;
    padding: 1rem;
    position: fixed;  
    top: 0;           
    left: 0;          
    width: 100%;      
    z-index: 10;      
  }
  
  ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin-right: 1rem;
  }
  
  a {
    color: white;
    text-decoration: none;
  }
  </style>