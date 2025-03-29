<template>
<AppNav />
<ParticlesBackground />
<main id="auth-page" class="web-body"></main>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue';
import ParticlesBackground from '@/components/ParticlesBackground.vue';

import { useUserStore } from '@/stores/UserStore.js';
import { onBeforeMount } from 'vue';

const userStore = useUserStore();
onBeforeMount(() => {
    document.title = "MMI | Sign Out";
    userStore.logOutUser(true);
})
</script>

<style scoped>
.web-body#auth-page {
    background: transparent;
}
</style>