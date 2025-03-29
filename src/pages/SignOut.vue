<template>
<AppNav />
<main class="web-body"></main>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue';
import { useUserStore } from '@/stores/UserStore.js';
import { onBeforeMount } from 'vue';

const userStore = useUserStore();
onBeforeMount(() => {
    document.title = "MMI | Sign Out";
    userStore.logOutUser(true);
})
</script>