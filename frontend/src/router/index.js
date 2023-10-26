import { createRouter, createWebHistory } from 'vue-router'
import PetForm from "../components/PetForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/add',
      name: 'addPet',
      component: PetForm
    },
    {
      path: '/:id',
      name: 'editPet',
      component: PetForm
    }
  ]
})

export default router