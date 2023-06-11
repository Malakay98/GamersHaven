import { createRouter, createWebHistory } from 'vue-router';
import gamesRoutes from './games';
import homeRoutes from './home';
// import profileRoutes from './profile';

const routes = [
  ...gamesRoutes,
  ...homeRoutes,
//   ...profileRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;