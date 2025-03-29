<template>
<div class="app-menu-body">
    <template v-for="user in appStore.users">
        <div style="height: 10px;"></div>
        <div class="user-tab">
            <div class="">
                <div class="user-tab-header"> {{ user.name }} </div>
                <p> {{ 'Condition: ' + user.condition }} </p>
            </div>

            <div class="user-tab-meetingBtn" @click="appStore.setMenuOpen(2)">
                <span> Set Meeting </span>
                <font-awesome-icon icon="fa-calendar" />
            </div>
        </div>
    </template>
    <div style="height: 10px;"></div>
</div>
</template>

<script setup>
import { useAppStore } from '@/stores/AppStore.js';
const appStore = useAppStore();
</script>

<style scoped>
.user-tab {
    overflow: hidden;
    position: relative;
    left: 5%;
    width: calc(90% - 12px);
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 5px;
    border-radius: 10px;
    font-family: 'PT Sans', sans-serif;
    color: var(--deep-teal);
    border: 2px dashed var(--brown-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user-tab-header {
    font-weight: bold;
    width: fit-content;
    border-bottom: 2px solid;
    margin-bottom: 5px;
    margin-left: 10px;
}
.user-tab p {
    color: inherit;
    margin-left: 10px;
}

.user-tab-meetingBtn {
    cursor: pointer;
    margin-right: 10px;
    width: fit-content;
    height: fit-content;
    padding: 7px;
    border: 1px solid var(--deep-teal);
    border-radius: 15px;
    font-size: 18px;
    background-color: rgba(0, 0, 0, 0.05);
    transition: var(--default-transition);
}
.user-tab-meetingBtn:hover {
    background-color: var(--blue-one);
}
</style>