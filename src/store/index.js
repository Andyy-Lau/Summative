import { defineStore } from "pinia";
import { firestore } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

export const useStore = defineStore("store", {
  state: () => ({
    user: null,
    cart: [],
  }),
  actions: {
    // async addToCart(poster, title) {
    //   this.cart.push({
    //     poster,
    //     title,
    //   });

    //   await setDoc(doc(firestore, "carts", this.user.email), { cart: this.cart });
    // }
    async addToCart(posterPath, movieTitle, movieRelease, movieOverview) {
      this.counter = 1;
      console.log(this.cart)
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
      await setDoc(doc(firestore, "carts", this.user.email), {
        cart: this.cart,
      });
    },
  },
});
