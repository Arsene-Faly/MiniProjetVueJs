<script setup>
import { RouterLink } from "vue-router";
import { ShoppingCartIcon, HomeIcon, CubeIcon } from "@heroicons/vue/24/outline";
import { useProductCartStore } from "../stores/product-cart";

const cartStore = useProductCartStore();
</script>

<template>
  <nav
    class="w-full max-w-6xl mx-auto mt-6 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-2xl px-6 py-4 shadow-lg flex justify-between items-center flex-wrap backdrop-blur-md bg-opacity-70"
  >
    <RouterLink
      :to="{ name: 'home' }"
      class="text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-50 hover:from-green-50 hover:to-green-200 transition duration-500"
    >
      MonSite
    </RouterLink>

    <ul class="flex gap-8 items-center text-lg font-semibold">
      <li>
        <RouterLink
          :to="{ name: 'home' }"
          class="flex items-center gap-1 hover:underline hover:text-green-100 transition duration-300"
        >
          <HomeIcon class="w-5 h-5" />
          Accueil
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'products' }"
          class="flex items-center gap-1 hover:underline hover:text-green-100 transition duration-300"
        >
          <CubeIcon class="w-5 h-5" />
          Produits
        </RouterLink>
      </li>

      <li class="relative flex items-center">
        <RouterLink
          :to="{ name: 'cart' }"
          class="hover:text-green-200 transition duration-300 relative"
          aria-label="Panier"
        >
          <ShoppingCartIcon class="w-7 h-7 text-white" />
          <span
            class="absolute -top-2 -right-2 bg-white text-green-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse"
            v-if="cartStore.count > 0"
          >
            {{ cartStore.count }}
          </span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
