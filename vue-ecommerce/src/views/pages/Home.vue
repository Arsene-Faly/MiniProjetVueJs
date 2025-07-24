<script setup></script>

<template>
  <section
    class="min-h-screen flex flex-col justify-center items-center text-center px-6"
  >
    <h1
      class="text-5xl sm:text-6xl font-extrabold text-green-800 mb-6 drop-shadow-lg animate-fadeIn"
    >
      Bienvenue sur MonSite !
    </h1>
    <p
      class="max-w-xl text-green-900 text-lg sm:text-xl mb-10 leading-relaxed animate-fadeIn delay-200"
    >
      Découvrez nos produits exclusifs et profitez des meilleures offres pour
      embellir votre quotidien.
    </p>
    <button
      class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 animate-fadeIn delay-400"
    >
      Voir les produits
    </button>
  </section>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease forwards;
}

.animate-fadeIn.delay-200 {
  animation-delay: 0.2s;
}

.animate-fadeIn.delay-400 {
  animation-delay: 0.4s;
}
</style>
