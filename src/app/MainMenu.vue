<template>
<div class="app-menu">
    <MenuTitle />
    
    <SearchLocations v-if="appStore.menuOpen == 0" />
    <FindPeople v-if="appStore.menuOpen == 1" />
    <YourMeetings v-if="appStore.menuOpen == 2" />
    <Profile v-if="appStore.menuOpen == 3" />

    <MenuNavBar />
</div>
</template>

<script setup>
import MenuNavBar from './MenuNavBar.vue';
import MenuTitle from './MenuTitle.vue';

import SearchLocations from './screens/SearchLocations.vue';
import Profile from './screens/Profile.vue';
import FindPeople from "./screens/FindPeople.vue";
import YourMeetings from './screens/YourMeetings.vue';

import { useAppStore } from '@/stores/AppStore.js';
import { onMounted } from 'vue';
const appStore = useAppStore();

onMounted(() => {
    appStore.getCoordsOfCity("Atlanta");
})
</script>