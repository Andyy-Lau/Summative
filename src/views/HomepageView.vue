<script setup>
import { router } from "../router";
import Header from "../components/Header.vue";
import Hero from "../components/Hero.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <Header :info="{ site: 'Andy Movies', path: './login', button: 'Login' }" />
  <Hero />
  <Footer />
</template>

<style scoped>
div {
  background-color: #282a36;
}
</style>
