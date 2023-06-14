<script setup>
import { router } from "../router";
import Header from "../components/Header.vue";
import Hero from "../components/Hero.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <body>
    <Header :info="{ site: 'Andy Movies', path: './login', button: 'Login' }" />
    <Hero />
    <Footer />
  </body>
</template>

<style scoped>
body {
  background-color: #282a36;
}
div {
  background-color: #282a36;
}
</style>
