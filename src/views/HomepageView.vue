<script setup>
import { router } from "../router"
</script>

<template>
    <button @click="router.push('./login')">Click</button>
</template>

<style scoped>
button {
    padding: 100px 100px;
}
</style>