<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { auth, firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc, collection, setDoc } from "@firebase/firestore";

const store = useStore();
const router = useRouter();
const email = ref("");
const passwordOne = ref("");
const passwordTwo = ref("");
const registerHidden = ref(false);
const loginHidden = ref(false);

const registerViaEmail = async () => {
  if (passwordOne.value !== passwordTwo.value) {
    alert("count to 5");
    return;
  }

  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.value,
    passwordOne.value
  );
  store.user = user;
  router.push("/purchase");
};

const registerViaGoogle = async () => {
  const usersRef = collection(firestore, "carts");
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  store.user = user;
  console.log(user.email);
  await setDoc(doc(usersRef, user.email), {
    cart: [],
  });
  const cart = (await getDoc(doc(firestore, "carts", user.email))).data().cart;
  store.cart = cart;
  console.log(store.cart);
  router.push("/purchase");
};

const loginViaEmail = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.value,
      passwordOne.value
    );
    store.user = user;
    router.push("/purchase");
  } catch (error) {
    console.log(error);
    alert("Please register first!")
  }
};

const loginViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  const userRef = await getDoc(doc(firestore, "carts", user.email));
  if (userRef.exists()) {
    store.user = user;
    store.cart = userRef.data().cart;
    router.push("/purchase");
  } else {
    alert("You have not registered with google yet! Please select the register option first.")
  }
};
</script>

<template>
  <body>
    <div class="main-container">
      <div class="child-1" v-on:click="registerHidden = !registerHidden">
        <h1>Register</h1>
        <img
          id="drop-down"
          src="https://d1k5j68ob7clqb.cloudfront.net/processed/meta/U58o0Y2xeB7uxwNjS8.png"
        />
      </div>
      <div v-if="registerHidden" class="register-container">
        <h1>Register via Email</h1>
        <form class="setup" @submit.prevent="registerViaEmail()">
          <input v-model="email" type="email" placeholder="email" />
          <input
            v-model="passwordOne"
            type="password"
            placeholder="Enter Password"
          />
          <input
            v-model="passwordTwo"
            type="password"
            placeholder="Re-enter Password"
          />
          <input type="submit" value="Register" />
        </form>
        <button @click="registerViaGoogle()">
          <div id="google-button">
            <img
              src="https://developers.google.com/static/identity/images/g-logo.png"
            />
            Register with Google
          </div>
        </button>
      </div>
      <div v-on:click="loginHidden = !loginHidden" class="child-2">
        <h1>Login</h1>
        <img
          id="drop-down"
          src="https://d1k5j68ob7clqb.cloudfront.net/processed/meta/U58o0Y2xeB7uxwNjS8.png"
        />
      </div>
      <div v-if="loginHidden" class="login-container">
        <h1>Login via Email</h1>
        <form class="login" @submit.prevent="loginViaEmail()">
          <input v-model="email" type="email" placeholder="Email" />
          <input v-model="passwordOne" type="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
        <button @click="loginViaGoogle()">
          <div id="google-button">
            <img
              src="https://developers.google.com/static/identity/images/g-logo.png"
            />
            Sign in with Google
          </div>
        </button>
      </div>
    </div>
    <footer>
      <img
        src="https://media.tenor.com/IVQgkTbHZhYAAAAd/spinning-monkey-spinning-ape.gif"
      />
    </footer>
  </body>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  margin: 0;
  min-height: 100vh;
  justify-content: space-between;
  background-color: white;
}
footer {
  padding-top: 3rem;
  width: 100vw;
}
footer img {
  height: 200px;
  width: 100%;
}
.main-container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  width: 100%;
}
.main-container > * {
  height: 20vh;
  width: 40vw;
  border-bottom: solid black 1px;
  /* border: solid black 1px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}
#drop-down {
  aspect-ratio: 1/1;
  max-height: 5vh;
}
.register-container,
.login-container {
  width: 100%;
  flex-direction: column;
  min-height: 40vh;
}
.main-container > * > * {
  margin: 1rem;
}
.main-container > * > *:first-child {
  margin-left: 3rem;
  font-size: 36px;
}
.login-container button {
  margin-bottom: 2rem;
}
form > * {
  margin: 0.3rem;
}
#google-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 10rem;
}
#google-button img {
  height: 2rem;
  margin: 0;
}
/* .auth-container {
  display: flex;
  gap: 5rem;
}

.setup,
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
} */
</style>
