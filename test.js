// import { defineStore } from "pinia";
// import { firestore } from "../firebase";
// import { setDoc, doc } from "firebase/firestore";

// export const useStore = defineStore("store", {
//   state: () => ({
//     user: null,
//     cart: [],
//   }),
//   actions: {
//     addToCart(movieId, posterPath, movieTitle, movieRelease, movieOverview) {
//       this.counter = 1;
//       this.movie = new Object();
//       console.log(this.cart);
//       if (this.cart.length == 0) {
//         this.movie[movieId] = {
//           poster: posterPath,
//           title: movieTitle,
//           release: movieRelease,
//           overview: movieOverview,
//           quantity: 1,
//         };
//         this.cart.push({
//             poster: posterPath,
//             title: movieTitle,
//             release: movieRelease,
//             overview: movieOverview,
//             quantity: 1,
//         });
//       } else {
//         for (var i = 0; i < this.cart.length; i++) {
//           if (movieTitle == this.cart[i].title) {
//             this.counter += this.cart[i].quantity;
//             this.cart.splice([i], 1);
//           }
//         }
//         this.movie[movieId] = {
//           poster: posterPath,
//           title: movieTitle,
//           release: movieRelease,
//           overview: movieOverview,
//           quantity: this.counter,
//         };
//         this.cart.push({
//             poster: posterPath,
//             title: movieTitle,
//             release: movieRelease,
//             overview: movieOverview,
//             quantity: this.counter,
//         });
//       }
//       console.log(this.cart);
//       console.log(this.movie)
//       // this.updateFirestore(this.movie)
//       this.addToFirestore();
//     },
//     async updateFirestore(movie) {
//       const 
//     }
//     async addToFirestore() {
//       await setDoc(doc(firestore, "carts", this.user.email), {
//         cart: this.cart,
//       });
//     },
//     removeFromCart() {},
//   },
// });
