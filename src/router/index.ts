import { createRouter, createWebHistory } from 'vue-router'
import CaseDetailPage from '@/pages/CaseDetailPage.vue'
import CaseListPage from '@/pages/CaseListPage.vue'
import NewCasePage from '@/pages/NewCasePage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/cases' },
    { path: '/cases', name: 'cases', component: CaseListPage },
    { path: '/cases/new', name: 'case-new', component: NewCasePage },
    { path: '/cases/:ourRef', name: 'case-detail', component: CaseDetailPage, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/cases' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
