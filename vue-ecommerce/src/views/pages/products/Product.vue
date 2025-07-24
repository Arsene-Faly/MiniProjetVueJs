<script setup>
import { RouterLink } from "vue-router";
import { getProducts } from "@/services/product";
import { useProductStore } from "@/stores/product-store";
import { useProductCartStore } from "@/stores/product-cart";
import { onMounted, ref, computed, watch } from "vue";

const productCartStore = useProductCartStore();
const productStore = useProductStore();

const isLoading = ref(false);
const errorMessage = ref("");

const search = ref("");
const currentPage = ref(1);
const itemsPerPage = 8;

const categories = ref(["Tous", "Électronique", "Vêtements", "Maison", "Sport"]);
const selectedCategory = ref("Tous");

const handleAddToCart = (product) => {
  productCartStore.addToCart(product);
};

const fetchProducts = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const data = await getProducts();
    productStore.setProducts(data);
  } catch (e) {
    errorMessage.value = "Erreur lors du chargement des produits.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

// Filtrer les produits selon recherche et catégorie
const filteredProducts = computed(() => {
  let filtered = productStore.all;

  if (selectedCategory.value !== "Tous") {
    filtered = filtered.filter(
      (p) => p.category === selectedCategory.value
    );
  }

  if (search.value.trim()) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  return filtered;
});

// Pagination
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

// Reset page à 1 quand filtre change
watch([search, selectedCategory], () => {
  currentPage.value = 1;
});
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-10">
    <!-- Recherche + catégories -->
    <form
      @submit.prevent
      class="flex flex-col sm:flex-row gap-4 mb-6 items-center"
    >
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher un produit..."
        class="flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />
      <button
        type="button"
        class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition transform hover:scale-105"
        @click="currentPage = 1"
      >
        Rechercher
      </button>
    </form>

    <div class="flex flex-wrap gap-3 mb-8 justify-center">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="[
          'px-4 py-2 rounded-full cursor-pointer border transition',
          selectedCategory === cat
            ? 'bg-green-600 text-white border-green-600 shadow-md'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-green-100'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">
      Nos Produits
    </h1>

    <div v-if="errorMessage" class="text-center text-red-600 mb-6">
      {{ errorMessage }}
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="n in itemsPerPage"
        :key="n"
        class="bg-white border border-gray-200 rounded-2xl shadow-sm animate-pulse flex flex-col"
      >
        <div class="w-full h-52 bg-gray-300 rounded-t-2xl"></div>
        <div class="p-4 flex flex-col flex-1 space-y-3">
          <div class="h-6 bg-gray-300 rounded w-3/4"></div>
          <div class="h-5 bg-gray-300 rounded w-1/2"></div>
          <div class="mt-auto h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>

    <div v-else>
      <div
        v-if="paginatedProducts.length === 0"
        class="text-center text-gray-600"
      >
        Aucun produit trouvé.
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col"
        >
          <RouterLink
            :to="{ name: 'products-detail', params: { id: product.id } }"
            class="block"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-52 object-cover rounded-t-2xl"
            />
          </RouterLink>

          <div class="p-4 flex flex-col flex-1">
            <h2 class="text-lg font-semibold text-gray-800 truncate mb-1">
              {{ product.title }}
            </h2>

            <p class="text-green-600 text-lg font-bold mb-4">
              {{ product.price.toLocaleString() }} Ar
            </p>

            <button
              class="cursor-pointer mt-auto bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              @click="handleAddToCart(product)"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav
        v-if="totalPages > 1"
        class="flex justify-center mt-10 space-x-2 select-none"
        aria-label="Pagination"
      >
        <button
          @click="currentPage > 1 && (currentPage--)"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Précédent
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-1 rounded-md border transition',
            currentPage === page
              ? 'bg-green-600 text-white border-green-600 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-green-100'
          ]"
        >
          {{ page }}
        </button>

        <button
          @click="currentPage < totalPages && (currentPage++)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Suivant
        </button>
      </nav>
    </div>
  </section>
</template>
