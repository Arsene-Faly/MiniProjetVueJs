<script setup>
import { computed } from "vue";
import { useProductCartStore } from "@/stores/product-cart";

const productCartStore = useProductCartStore();

const cartItems = computed(() => productCartStore.items);

const cartCount = computed(() => productCartStore.count);

const total = computed(() => productCartStore.total);

const handleIncrease = (id) => {
  productCartStore.increaseQuantity(id);
};
const handleDecrease = (id) => {
  productCartStore.decreaseQuantity(id);
};
const handleRemove = (id) => {
  productCartStore.removeFromCart(id);
};
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold mb-8 text-center">Mon Panier</h1>

    <div v-if="cartItems.length > 0" class="space-y-6">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md p-4 gap-4"
      >
        <img :src="item.image" :alt="item.title" class="w-36 h-24 object-cover rounded" />
        <div class="flex-1 w-full">
          <h2 class="text-lg font-semibold text-green-600">{{ item.title }}</h2>
          <p class="text-gray-900 font-bold">Prix unitaire : {{ item.price }} €</p>
          <p class="text-gray-900 font-bold">Somme (ou Total) : {{ item.unitPrice * item.quantity }} €</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            @click="handleDecrease(item.id)"
          >
            -
          </button>
          <span class="px-2">{{ item.quantity }}</span>
          <button
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            @click="handleIncrease(item.id)"
          >
            +
          </button>
        </div>
        <button
          class="text-red-500 hover:text-red-700 font-semibold ml-4"
          @click="handleRemove(item.id)"
        >
          Supprimer
        </button>
      </div>

      <div class="text-right mt-6">
        <p class="text-xl font-semibold">
          Total : <span class="text-gray-900">{{ total }} €</span>
        </p>
        <p class="text-xl font-semibold">
          Nombre produit : <span class="text-gray-900">{{ cartItems.length }} </span>
        </p>
        <button
          class="mt-4 px-6 py-3 bg-gray-900 hover:bg-gray-900 text-white rounded-lg shadow transition"
        >
          Valider la commande
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      Votre panier est vide.
    </div>
  </section>
</template>
