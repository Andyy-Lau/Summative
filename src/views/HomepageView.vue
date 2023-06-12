<script setup>
import { router } from "../router";
</script>

<template>
  <Header :info="{ site: 'Andy Movies', path: '/login', button: 'Login' }" />
  <Hero />
  <Footer />
</template>

<style scoped>
div {
  background-color: #282a36;
}
</style>
