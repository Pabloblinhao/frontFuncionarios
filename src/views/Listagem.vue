<!-- src/views/Listagem.vue -->
<template>
    <div>
      <Navbar />
      <h1>Listagem de Funcionários</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="funcionario in funcionarios" :key="funcionario.id">
            <td>{{ funcionario.nome }}</td>
            <td>{{ funcionario.email }}</td>
            <td>{{ funcionario.cargo }}</td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue";
  import Footer from "../components/Footer.vue";
  
  export default {
    name: "Listagem",
    components: {
      Navbar,
      Footer,
    },
    data() {
      return {
        funcionarios: [],
      };
    },
    created() {
      this.fetchFuncionarios();
    },
    watch: {
      
      $route() {
        this.fetchFuncionarios();
      },
    },
    methods: {
      fetchFuncionarios() {
        fetch("http://localhost/backFuncionarios/index.php?action=listarFuncionarios")
          .then((response) => response.json())
          .then((data) => {
            this.funcionarios = data;
          })
          .catch((error) => console.error("Erro ao carregar os funcionários:", error));
      },
    },
  };
  </script>
  
  <style>
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  </style>