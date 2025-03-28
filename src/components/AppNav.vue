<template>
<div class="app-navBar">

</div>
</template>

<script setup>

</script>

<style scoped>
.app-navBar {
    position: fixed;
    left: 60px;
    top: 10px;
    height: 40px;
    width: calc(100% - 120px);
    background-color: var(--deep-teal-translucent);
    border: 2px solid white;
    border-radius: 20px;
    z-index: 10;
}

@media (min-width: 1220px) {
    .app-navBar {
        width: 1100px;
        left: calc(50% - 550px);
    }
}
</style>