import { createRouter, createWebHashHistory } from 'vue-router'
import AuthorsMainView from '../components/authors/AuthorsMainView.vue'
import AuthorUpdate from '../components/authors/AuthorUpdate.vue'
import LibraryMainView from '../components/library/LibraryMainView.vue'
import LibraryTable from '../components/library/LibraryTable'
import LendingRegisterTable from '../components/library/LibraryLendingRegisterTable.vue'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
  },
  {
    path: '/library',
    name: 'library',
    component: LibraryMainView,
    meta: { layout: 'LibraryLayout' }
  },
  {
    path: '/library/library-table/:readerId',
    name: 'libraryTable',
    component: LibraryTable,
    meta: { layout: 'LibraryLayout' }
  },
  {
    path: '/library/lending-register-table/',
    name: 'lendingRegisterTable',
    component: LendingRegisterTable,
    meta: { layout: 'LibraryLayout' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
