<template>
<div class="app-menu-body">
    <div class="profile-img-body">
        <h1 class="profile-img-placeholder"> MJ </h1>
        <font-awesome-icon class="profile-img-edit" icon="fa-image" title="Edit Image" />
    </div>
</div>
</template>

<script setup>

</script>

<style>
.profile-img-body {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
.profile-img-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 15px;
    border: 2px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 75px;
    color: white;
    background-color: var(--blue-cobalt);
}

.profile-img-edit {
    cursor: pointer;
    position: absolute;
    top: 45px;
    left: 0;
    color: white;
    font-size: 30px;
    padding: 7px;
    border-right: 1px dashed;
    border-bottom: 1px dashed;
    border-bottom-right-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: var(--default-transition), padding 0.2s;
}
.profile-img-edit:hover {
    padding: 10px;
    background-color: var(--blue-three);
}
</style>