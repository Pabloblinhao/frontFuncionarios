import { createRouter, createWebHistory } from 'vue-router';
import Listagem from '../views/Listagem.vue';
import Cadastro from '../views/Cadastro.vue';
import Visualizacao from '../views/Visualizacao.vue';

const routes = [
  { path: '/', component: Listagem },
  { path: '/cadastro', component: Cadastro },
  { path: '/visualizacao/:id', component: Visualizacao, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;