<template>
<div class="app-menu-body">
    <div :id="CESIUM_GEOCODER_ID"></div>
</div>
</template>

<script setup>
import { CESIUM_GEOCODER_ID, useGlobeStore } from '@/stores/GlobeStore.js';
import { onMounted, onBeforeUnmount, nextTick } from 'vue';

const globeStore = useGlobeStore();
onMounted(() => {
    nextTick().then(() => { globeStore.setGeocoder(true); })
});
onBeforeUnmount(() => { globeStore.setGeocoder(false); });
</script>