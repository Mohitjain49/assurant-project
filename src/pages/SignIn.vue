<template>
<AppNav />
<main class="web-body">
    <h1> Hello </h1>
</main>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue';
import { onMounted } from 'vue';

onMounted(() => {
    document.title = "MMI | Sign In";
})
</script>