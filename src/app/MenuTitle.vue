<template>
<div class="app-menu-title center-flex-display">
    <h2> {{ TITLES[appStore.menuOpen] }} </h2>
</div>
</template>

<script setup>
import { useAppStore } from '@/stores/AppStore.js';
const appStore = useAppStore();
const TITLES = ['Search Locations', 'Find People', 'Your Meetings', 'Your Profile'];
</script>

<style scoped>
.app-menu-title {
    height: 43px;
    width: 100%;
    border-bottom: 2px solid white;
}
.app-menu-title h2 {
    color: white;
}
</style>