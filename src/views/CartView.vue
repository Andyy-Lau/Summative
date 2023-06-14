<script setup>
import { useStore } from "../store/index.js";
import { ref } from "vue";
import Header from "../components/Header.vue";

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
          <div class="movie-bottom-container">
            <div class="cart-quantity">
              <button
                @click="store.updateCart(movie.title, movie.quantity, false)"
              >
                -
              </button>
              <h3>{{ movie.quantity }} currently in cart</h3>
              <button
                @click="store.updateCart(movie.title, movie.quantity, true)"
              >
                +
              </button>
            </div>
            <button @click="store.removeFromCart(movie.title)" id="remove">Remove</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>You have nothing in your cart.</h2>
    </div>
  </body>
</template>

<style scoped>
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
  margin-bottom: 2rem;
}
.text-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
}
.movie-bottom-container {
  display: flex;
  justify-content: space-between;
}
.cart-quantity {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  text-align: center;
}
.cart-quantity h3 {
  margin-top: auto;
  margin-bottom: auto;
}
#remove {
  font-size: 16px;
  padding: 8px 12px;
}
h1 {
  display: block;
}
img {
  aspect-ratio: auto;
  height: 180px;
  margin-right: 1rem;
}
h3 {
  align-self: flex-end;
}
button {
  display: flex;
  padding: 0px 16px;
  height: 21.6px;
  border-radius: 8px;
  border: none;
  font-size: 24px;
  align-items: center;
}
</style>
