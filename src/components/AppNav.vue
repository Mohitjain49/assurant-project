<template>
<div class="app-navBar">
    <div class="app-navBar-side left">
        <RouterLink to="/" class="app-navBar-icon" title="Go To Application">
            <font-awesome-icon icon="fa-house" />
        </RouterLink>
        <RouterLink to="/contact" class="app-navBar-icon" title="Contact MMI">
            <font-awesome-icon icon="fa-paper-plane" />
        </RouterLink>
    </div>

    <div class="app-navBar-side right">
        <RouterLink to="/profile" class="app-navBar-icon" title="Sign Up">
            <font-awesome-icon icon="fa-user-plus" />
        </RouterLink>
        <RouterLink to="/signin" class="app-navBar-icon" title="Sign In">
            <font-awesome-icon icon="fa-arrow-right-from-bracket" />
        </RouterLink>
    </div>
</div>
</template>

<script setup>

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
.app-navBar-icon svg {
    font-size: 25px;
    padding: 5px;
    border: 2px dotted rgba(0, 0, 0, 0);
    border-radius: 10px;
    transition: var(--default-transition);
}
.app-navBar-icon:hover svg {
    background-color: #8B4513;
    border-color: white;
}
</style>