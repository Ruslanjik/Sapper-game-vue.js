import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Settings from './pages/Settings.vue';
import Table from './pages/table.vue';
import Game from './pages/Game.vue'; // ✅ Добавлен импорт

const routes = [
  { path: '/', component: Home },
  { path: '/settings', component: Settings },
  { path: '/table', component: Table },
  { path: '/game', component: Game } // ✅ Добавлен маршрут
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
