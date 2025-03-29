<template>
<template v-if="userStore.userPresent">
    <div class="app-menu-body" v-if="!editingProfile">
        <div class="profile-img-body">
            <h1 class="profile-img-placeholder"> MJ </h1>
            <font-awesome-icon class="profile-img-edit" icon="fa-pen" title="Edit Profile" @click="toggleEditStatus()" />
        </div>

        <h1 class="profile-name"> {{ userStore.userInfo.firstName + ' ' + userStore.userInfo.lastName }} </h1>

        <div class="profile-desc">
            <div class="profile-link-header"> Email </div>
            <a :href="('mailto:' + userStore.userInfo.email)" class="profile-link"> {{ userStore.userInfo.email }} </a>
            <div style="height: 5px;"></div>
        </div>
    </div>

    <div class="app-menu-body" v-if="editingProfile">
        <font-awesome-icon class="profile-img-edit" icon="fa-xmark" title="Stop Editing" @click="toggleEditStatus()" />
        <form @submit.prevent class="profile-form">
            <div class="form-radio-group" v-for="(group, index) in radioGroups">
                
            </div>
        </form>
    </div>
</template>
<template v-else>
    <div class="app-menu-body placeholder">
        <h1 class="profile-img-placeholder"> ? </h1>
        <span style="margin: 10px 0px;"> You are not currently signed in at the moment. </span>
        <RouterLink to="/signin" class="profile-signin-btn"> Sign In </RouterLink>
    </div>
</template>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore.js';
import { ref } from 'vue';

const userStore = useUserStore();
const editingProfile = ref(false);
const radioGroups = ref(new Array(20));

/**
 * This toggles the status of if the user is editing their profile or not.
 */
function toggleEditStatus() {
    editingProfile.value = !editingProfile.value;
}
</script>

<style>
.app-menu-body.placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-family: 'PT Sans', sans-serif;
    font-size: 25px;
    text-align: center;
    width: calc(100% - 20px);
    padding: 0px 10px;
}
.profile-signin-btn {
    border: 1px solid white;
    padding: 10px;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.25);
    transition: var(--default-transition), padding 0.2s;
}
.profile-signin-btn:hover {
    padding: 13px;
    background-color: var(--blue-three);
}

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
    font-size: 22px;
    padding: 10px;
    border-right: 1px dashed;
    border-bottom: 1px dashed;
    border-bottom-right-radius: 10px;
    background-color: rgba(0, 0, 0, 0.25);
    transition: var(--default-transition), padding 0.2s;
}
.profile-img-edit:hover {
    padding: 13px;
    background-color: var(--blue-three);
}

.profile-name {
    width: fit-content;
    text-align: left;
    font-size: 50px;
    padding-top: 5px;
    margin-left: 6.25%;
    color: var(--brown-color);
    text-shadow: 
        -1px -1px 0 white, /* Top-left shadow */
        1px -1px 0 white,  /* Top-right shadow */
        -1px 1px 0 white,  /* Bottom-left shadow */
        1px 1px 0 white;   /* Bottom-right shadow */;
}
.profile-desc {
    position: relative;
    width: 87.5%;
    height: fit-content;
    left: calc(6.25% - 7px);
    color: var(--deep-teal);
    border: 2px solid var(--silver-color);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    margin-top: 10px;
    font-family: 'PT Sans', sans-serif;
    font-size: 17px;
}

.profile-link-header {
    font-size: 20px;
    font-weight: bold;
    width: fit-content;
    border-bottom: 2px solid;
    margin-bottom: 3px;
}
.profile-link {
    font-size: 18px;
    color: var(--blue-five);
    border-bottom: 1px solid;
    margin-bottom: 15px;
}

.profile-form {
    width: 100%;
    height: fit-content;
    min-height: 100%;
    overflow: hidden;
}
.form-radio-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
}
</style>