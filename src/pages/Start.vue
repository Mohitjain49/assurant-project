<template>
<AppNav />
<div :id="CESIUM_VIEWER_ID"></div>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue';
import { CESIUM_VIEWER_ID, useGlobeStore } from '@/stores/GlobeStore.js';
import { onMounted, onBeforeUnmount } from 'vue';

const globeStore = useGlobeStore();

onMounted(() => {
    globeStore.mountGlobe();
})
onBeforeUnmount(() => {
    globeStore.onBeforeUnmount();
})
</script>