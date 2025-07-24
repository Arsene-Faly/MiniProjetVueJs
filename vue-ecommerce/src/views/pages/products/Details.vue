<script setup>
import { getProductsById } from '@/services/product';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const product = ref({})
const isLoading = ref(false);
const errorMessage = ref(null);

const fetchProduct = async () => {
  isLoading.value = true
  try {
    const data = await getProductsById(route.params.id)
    product.value = data

  } catch (e) {

    errorMessage.value = e.message
    throw new Error(e.message)

  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProduct()
})

</script>

<template>
  <div v-if="!errorMessage">
      <div class="max-w-6xl mx-auto p-6" v-if="product">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-white p-6 rounded-3xl shadow-xl">
      <!-- Image produit -->
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-auto rounded-2xl shadow-md object-cover"
      />

      <!-- Détails -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          {{ product.title }}
        </h1>

        <p class="text-gray-600 text-base mb-6 leading-relaxed">
          {{ product.description }}
        </p>

        <div class="text-2xl font-semibold text-pink-600 mb-6">
          {{ product.price }}
        </div>

        <button
          @click="handleAddToCart(product)"
          class="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-xl transition duration-300 w-full sm:w-auto"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
  </div>
  <div v-else>
    <p>Produit not found</p>
  </div>
</template>
