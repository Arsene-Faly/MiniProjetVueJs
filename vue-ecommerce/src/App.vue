<script setup>
import { RouterView } from "vue-router";
import Container from "./components/ui/Container.vue";
import Nav from "./components/Nav.vue";
</script>

<template>
  <Container>
    <Nav />
    <main>
      <RouterView />
    </main>
  </Container>
</template>
