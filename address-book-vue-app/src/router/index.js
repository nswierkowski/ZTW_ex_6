import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorsMainView from '../components/authors/AuthorsMainView.vue'
import AuthorUpdate from '../components/authors/AuthorUpdate.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/authors',
    name: 'authors',
    component: AuthorsMainView
  },
  {
    path: '/authors/update-author/:id/:firstName/:lastName',
    name: 'updateAuthor',
    component: AuthorUpdate
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
