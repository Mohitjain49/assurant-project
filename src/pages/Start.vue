<template>
<AppNav />
<MainMenu />
<div :id="CESIUM_VIEWER_ID"></div>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue';
import MainMenu from "@/app/MainMenu.vue";

import { CESIUM_VIEWER_ID, useGlobeStore } from '@/stores/GlobeStore.js';
import { useUserStore } from '@/stores/UserStore.js';
import { useAppStore } from '@/stores/AppStore.js';
import { onMounted, onBeforeUnmount } from 'vue';

const globeStore = useGlobeStore();
const userStore = useUserStore();
const appStore = useAppStore();

onMounted(() => {
    document.title = "MND - Mapping Neurodivergence";
    userStore.updateUserInfo();
    globeStore.mountGlobe();
    appStore.mountApp();
})
onBeforeUnmount(() => {
    globeStore.unmountGlobe();
})
</script>