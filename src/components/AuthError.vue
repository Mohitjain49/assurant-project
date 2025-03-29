<template>
<div id="auth-error" class="center-flex-display">
    <p v-html="userStore.authErrorBox.text"></p>
</div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore.js';
const userStore = useUserStore();
</script>

<style scoped>
#auth-error {
    position: fixed;
    bottom: 30px;
    left: calc((100% - 450px) / 2);
    height: 75px;
    width: 450px;
    background-color: var(--deep-teal);
    border: 2px solid white;
    border-radius: 20px;
    z-index: 10;
}
#auth-error p {
    color: red;
    font-family: 'PT Sans', sans-serif;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
    border: 2px dotted white;
    border-radius: 10px;
}
</style>