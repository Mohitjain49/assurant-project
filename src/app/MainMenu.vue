<template>
<div class="app-menu">
    <MenuTitle />
    
    <SearchLocations v-if="appStore.menuOpen > -1" />

    <MenuNavBar />
</div>
</template>

<script setup>
import MenuNavBar from './MenuNavBar.vue';
import MenuTitle from './MenuTitle.vue';

import SearchLocations from './screens/SearchLocations.vue';

import { useAppStore } from '@/stores/AppStore.js';
const appStore = useAppStore();
</script>