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
import { onMounted, onBeforeUnmount } from 'vue';

const globeStore = useGlobeStore();
const userStore = useUserStore();

onMounted(() => {
    document.title = "MMI - Mapping Mental Illnesses";
    userStore.updateUserInfo();
    globeStore.mountGlobe();
})
onBeforeUnmount(() => {
    globeStore.unmountGlobe();
})
</script>