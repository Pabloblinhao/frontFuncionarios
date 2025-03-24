<template>
  <div>
    <Navbar />
    <h1>Visualizar Funcionário</h1>

    <div class="container" v-if="funcionario.id">
      <label>Nome:</label>
      <input v-model="funcionario.nome" type="text" required />

      <label>Email:</label>
      <input v-model="funcionario.email" type="email" required />

      <label>Cargo:</label>
      <select v-model="funcionario.cargo_id" required>
        <option value="" disabled>Selecione um cargo</option>
        <option v-for="cargo in cargos" :key="cargo.id" :value="cargo.id">
          {{ cargo.nome }}
        </option>
      </select>

      <p><strong>Data de Cadastro:</strong> {{ funcionario.data_cadastro }}</p>

      <div class="buttons">
        <button @click="editarFuncionario">Editar</button>
        <button @click="inativarFuncionario" class="inativar">Inativar</button>
        <button @click="deletarFuncionario" class="deletar">Deletar</button>
      </div>
    </div>

    <p v-else class="loading">Carregando funcionário...</p>

    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Visualizacao",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      funcionario: {},
      cargos: [],
    };
  },
  async created() {
    await this.carregarCargos();
    await this.carregarFuncionario();
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

    async carregarFuncionario() {
      try {
        const response = await fetch(`http://localhost/backFuncionarios/index.php?action=listarFuncionarios&id=${this.$route.params.id}`);
        const data = await response.json();
        if (data.length > 0) {
          this.funcionario = data[0];

          // Garante que o cargo do funcionário seja selecionado corretamente
          this.funcionario.cargo_id = this.funcionario.cargo_id || "";
        }
      } catch (error) {
        console.error("Erro ao carregar funcionário:", error);
      }
    },

    editarFuncionario() {
      this.$router.push(`/editar/${this.$route.params.id}`);
    },

    async inativarFuncionario() {
      try {
        const response = await fetch(`http://localhost/backFuncionarios/index.php?action=inativarFuncionario&id=${this.$route.params.id}`, {
          method: "PUT",
        });
        const result = await response.json();
        alert(result.Success || result.Error);
        this.$router.push("/");
      } catch (error) {
        console.error("Erro ao inativar funcionário:", error);
      }
    },

    async deletarFuncionario() {
      try {
        const response = await fetch(`http://localhost/backFuncionarios/index.php?action=deletarFuncionario&id=${this.$route.params.id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        alert(result.Success || result.Error);
        this.$router.push("/");
      } catch (error) {
        console.error("Erro ao deletar funcionário:", error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 1.1rem;
  margin: 10px 0;
}

label {
  font-weight: bold;
  display: block;
  margin-top: 10px;
}

input, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

button:nth-child(1) {
  background-color: #333;
  color: white;
}

button.inativar {
  background-color: #333;
  color: white;
}

button.deletar {
  background-color: #333;
  color: white;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
}
</style>