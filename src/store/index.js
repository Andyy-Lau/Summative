import { defineStore } from "pinia";
import { firestore } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

export const useStore = defineStore("store", {
  state: () => ({
    user: null,
    cart: [],
  }),
  actions: {
    addToCart(posterPath, movieTitle, movieRelease, movieOverview) {
      this.counter = 1;
      console.log(this.cart);
      if (this.cart.length == 0) {
        this.cart.push({
          poster: posterPath,
          title: movieTitle,
          release: movieRelease,
          overview: movieOverview,
          quantity: 1,
        });
      } else {
        for (var i = 0; i < this.cart.length; i++) {
          if (movieTitle == this.cart[i].title) {
            this.counter += this.cart[i].quantity;
            this.cart.splice([i], 1);
          }
        }
        this.cart.push({
          poster: posterPath,
          title: movieTitle,
          release: movieRelease,
          overview: movieOverview,
          quantity: this.counter,
        });
      }
      console.log(this.cart);
      this.addToFirestore();
    },
    updateCart(movieTitle, quantity, add) {
      if (add) {
        for (var i = 0; i < this.cart.length; i++) {
          if (movieTitle == this.cart[i].title) {
            this.cart[i].quantity = ++quantity;
          }
        }
      } else {
        for (var i = 0; i < this.cart.length; i++) {
          if (movieTitle == this.cart[i].title) {
            if (quantity == 1) {
              this.cart.splice(i, 1);
            } else {
              this.cart[i].quantity = --quantity;
            }
          }
        }
      }
      this.addToFirestore();
    },
    removeFromCart(movieTitle) {
      for (var i = 0; i < this.cart.length; i++) {
        if (movieTitle == this.cart[i].title) {
          this.cart.splice(i, 1);
        }
      }
      this.addToFirestore();
    },
    async addToFirestore() {
      await setDoc(doc(firestore, "carts", this.user.email), {
        cart: this.cart,
      });
    },
  },
});
