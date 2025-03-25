import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Settings from './pages/Settings.vue';
import Table from './pages/Table.vue'; // Убедись, что файл называется Table.vue, а не table.vue
import Game from './pages/Game.vue'; 

const routes = [
  { path: '/', component: Home },
  { path: '/settings', component: Settings },
  { path: '/table', component: Table },
  { path: '/game', component: Game },
  { path: '/:catchAll(.*)', redirect: '/' } // Редирект всех неизвестных маршрутов на главную страницу
];

const router = createRouter({
  history: createWebHashHistory(), // Используем hash mode для совместимости со статическими хостингами
  routes
});

export default router;
