<script setup>
import { useStore } from "../store/index.js";
import { ref } from "vue";
import Header from "../components/Header.vue"

const movies = ref(false);
const store = useStore();

movies.value = store.cart;
console.log(store.cart);
</script>

<template>
  <body>
    <Header :info="{ site: 'Cart', path: '/purchase', button: 'Back' }" />
    <div v-if="movies" class="cart-content">
      <div v-for="movie in movies" class="movie-container">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
        <div class="text-container">
          <div>
            <h1>{{ movie.title }}</h1>
            <h2>{{ movie.release }}</h2>
            <h4>{{ movie.overview }}</h4>
          </div>
          <div class="cart-quantity">
          <button @click="store.updateFromCart(movie.title, movie.quantity, true)">+</button>
          <h3>{{ movie.quantity }} currently in cart</h3>
          <button @click="store.updateFromCart(movie.title, movie.quantity, false)">-</button>
        </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>You have nothing in your cart.</h2>
    </div>
  </body>
</template>

<style>
body {
  min-height: 100vh;
  background-color: #282a36;
  width: 100vw;
}
.cart-content {
  display: flex;
  flex-direction: column;
}
.movie-container {
  display: flex;
  margin-left: 1rem;
  margin-right: 1rem;
}
.text-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
}
.cart-quantity {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  gap: 1rem;
  text-align: center;
}
.cart-quantity h3 {
  margin-top: auto;
  margin-bottom: auto;
}
h1 {
  display: block;
}
img {
  aspect-ratio: auto;
  height: 180px;
  margin-bottom: 2rem;
  margin-right: 1rem;
}
h3 {
  align-self: flex-end;
}
button {
  padding: 6px 24px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  justify-self: center;
}
</style>
