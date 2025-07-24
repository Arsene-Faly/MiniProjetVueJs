import Home from '@/views/pages/Home.vue'
import Cart from '@/views/pages/products/Cart.vue'
import Details from '@/views/pages/products/Details.vue'
import Product from '@/views/pages/products/Product.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/products',
      name: 'products',
      component: Product,
    },
    {
      path: "/products/:id",
      name: "products-detail",
      component: () => import("@/views/pages/products/Details.vue"),
    },

    {
      path: '/products-cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Notfound',
      component: () => import("@/views/pages/Notfound.vue"),
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
