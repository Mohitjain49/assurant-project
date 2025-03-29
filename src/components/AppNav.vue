<template>
<div :class="getAppNavClasses()">
    <div class="app-navBar-side left">
        <RouterLink to="/" class="app-navBar-icon" title="Go To Application">
            <font-awesome-icon icon="fa-house" />
        </RouterLink>
        <a :href="GITHUB_REPO_LINK" target="2025-ksu-hackathon" class="app-navBar-icon" title="Our GitHub Repository">
            <img :src="github_icon" />
        </a>
    </div>

    <div class="app-navBar-side right">
        <RouterLink to="/signup" class="app-navBar-icon" title="Sign Up">
            <font-awesome-icon icon="fa-user-plus" />
        </RouterLink>
        <RouterLink v-if="!userStore.userPresent" to="/signin" class="app-navBar-icon" title="Sign In">
            <font-awesome-icon icon="fa-arrow-right-to-bracket" />
        </RouterLink>
        <RouterLink v-if="userStore.userPresent" to="/signout" class="app-navBar-icon" title="Sign Out">
            <font-awesome-icon icon="fa-arrow-right-from-bracket" />
        </RouterLink>
    </div>
</div>
</template>

<script setup>
import github_icon from "../assets/github_icon.svg";
import { useUserStore } from '@/stores/UserStore.js';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();
const GITHUB_REPO_LINK = "https://github.com/Mohitjain49/assurant-project";

/**
 * This returns the classes for the main navigation bar.
 */
function getAppNavClasses() {
    return ['app-navBar', ((route.path == "/") ? 'globe' : '')];
}
</script>

<style scoped>
.app-navBar {
    position: fixed;
    overflow: hidden;
    left: calc(50% - 225px);
    top: 10px;
    height: 45px;
    width: 450px;
    background-color: var(--deep-teal);
    border: 2px solid white;
    border-radius: 20px;
    z-index: 10;
    opacity: 0.9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
.app-navBar.globe {
    width: 375px;
    right: 10px;
    left: auto;
}

.app-navBar-side {
    width: fit-content;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.app-navBar-side.left {
    padding-left: 10px;
}
.app-navBar-side.right {
    padding-right: 10px;
}

.app-navBar-icon {
    cursor: pointer;
    width: 45px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
.app-navBar-icon svg, .app-navBar-icon img {
    font-size: 25px;
    padding: 5px;
    border: var(--dotted-empty-border);
    border-radius: 10px;
    transition: var(--default-transition);
}

.app-navBar-icon img {
    width: 25px;
    padding: 4px;
}
.app-navBar-icon:hover svg, .app-navBar-icon:hover img {
    background-color: var(--brown-color);
    border-color: white;
}

@media (max-width: 500px) {
    .app-navBar, .app-navBar.globe {
        position: absolute;
        width: calc(100% - 50px);
        min-width: 300px;
        left: 25px;
    }
}
</style>