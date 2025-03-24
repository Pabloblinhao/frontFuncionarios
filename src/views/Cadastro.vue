<template>
  <div>
    <Navbar />
    <h1 class="title-h1">ADICIONAR FUNCIONÁRIO</h1>
    <form @submit.prevent="adicionarFuncionario" class="form-container">
      <input v-model="nome" type="text" placeholder="Nome" required class="input-field" />
      <input v-model="email" type="email" placeholder="Email" required class="input-field" />

      <select v-model="cargoSelecionado" required class="input-field">
        <option value="" disabled>Selecione um cargo</option>
        <option v-for="cargo in cargos" :key="cargo.id" :value="cargo.id">
          {{ cargo.nome }}
        </option>
      </select>

      <button type="submit" class="submit-btn">Adicionar</button>
    </form>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Cadastro",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      nome: "",
      email: "",
      cargoSelecionado: "", 
      cargos: [], 
    };
  },
  created() {
    this.carregarCargos();
  },
  methods: {
    async carregarCargos() {
      try {
        const response = await fetch("http://localhost/backFuncionarios/index.php?action=listarCargos");
        const data = await response.json();
        this.cargos = data; 
      } catch (error) {
        console.error("Erro ao carregar cargos:", error);
      }
    },

    async adicionarFuncionario() {
      if (!this.cargoSelecionado) {
        alert("Por favor, selecione um cargo.");
        return;
      }

      try {
        const response = await fetch("http://localhost/backFuncionarios/index.php?action=criarFuncionario", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            nome: this.nome,
            email: this.email,
            cargo_id: this.cargoSelecionado,  
          }),
        });

        const result = await response.json();
        alert(result.Success || result.Error);
        this.$router.push("/");
      } catch (error) {
        console.error("Erro ao adicionar funcionário:", error);
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.title-h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #555;
}
</style>