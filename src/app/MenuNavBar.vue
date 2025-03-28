<script setup>
import { useAppStore } from '@/stores/AppStore.js';
const appStore = useAppStore();

/**
 * This function returns the classes for a option in the Menu Nav Bar.
 * @param {Number} index The index of the option.
 */
function getOptClasses(index = 0) {
    return ['menu-navBar-icon', (appStore.menuOpen == index ? 'selected' : '')];
}
</script>

<template>
<div class="menu-navBar">
    <div @click="appStore.setMenuOpen(0)" :class="getOptClasses(0)" title="Search Locations">
        <font-awesome-icon icon="fa-magnifying-glass" />
    </div>
    <div @click="appStore.setMenuOpen(1)" :class="getOptClasses(1)" title="Find People Near Me">
        <font-awesome-icon icon="fa-street-view" />
    </div>
    <div @click="appStore.setMenuOpen(2)" :class="getOptClasses(2)" title="Group Meetings">
        <font-awesome-icon icon="fa-user-group" />
    </div>
    <div @click="appStore.setMenuOpen(3)" :class="getOptClasses(3)" title="Your Profile">
        <font-awesome-icon icon="fa-circle-user" />
    </div>
</div>
</template>

<style scoped>
.menu-navBar {
    width: 100%;
    height: 53px;
    border-top: 2px solid white;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
}

.menu-navBar-icon {
    cursor: pointer;
    width: 45px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
.menu-navBar-icon.selected svg {
    background-color: var(--blue-three);
    border-color: var(--silver-light);
}

.menu-navBar-icon svg {
    font-size: 30px;
    padding: 5px;
    border: var(--dotted-empty-border);
    border-radius: 10px;
    transition: var(--default-transition);
}
.menu-navBar-icon:hover svg {
    background-color: var(--blue-cobalt);
    border-color: white;
}
</style>