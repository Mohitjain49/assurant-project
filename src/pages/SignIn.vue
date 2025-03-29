<template>
<AppNav />
<Transition name="alertBoxTransition" appear fade>
    <AuthError v-if="userStore.authErrorBox.status" />
</Transition>

<main class="web-body">
    <div class="auth-box-container center-flex-display"> 
        <div class="signin-box">
            <h2 class="signin-box-title">Sign In</h2>
            <p class="signup-link">
                Need an account? 
                <RouterLink to="/signup"> Sign Up </RouterLink>
            </p>
            <form @submit.prevent class="signup-form">
                <div class="input-group">
                    <input type="email" id="email" v-model="email" required placeholder="Enter your email" @click="userStore.setAuthErrorBox('')" />
                </div>
                <div class="input-group">
                    <input type="password" id="password" v-model="password" required placeholder="Enter your password" @click="userStore.setAuthErrorBox('')" />
                </div>
                <button type="submit" class="submit-btn" @click="initSignIn()">Sign In</button>
            </form>
        </div>
    </div>
</main>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue';
import AuthError from '@/components/AuthError.vue';

import { useUserStore } from '@/stores/UserStore.js';
import { ref, onBeforeMount } from 'vue';

const userStore = useUserStore();
const email = ref("");
const password = ref("");

onBeforeMount(() => {
    userStore.updateUserInfo();
    document.title = "MMI | Sign In";
})

/**
 * This function logs in the user to the app.
 */
function initSignIn() {
    userStore.logInUser({
        username: email.value,
        password: password.value
    });
};
</script>

<style scoped>
.auth-box-container {
    width: 100%;
    height: 700px;
    min-height: calc(100% - 70px);
}
.signin-box {
    background-color: var(--deep-teal);
    border: 2px solid white;
    border-radius: 20px;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.signin-box-title {
    text-align: center;
    font-size: 45px;
    color: white;
    font-weight: bold;
}


.signup-form {
    display: flex;
    flex-direction: column;
}
.input-group {
    margin-bottom: 20px;
    text-align: left;
}
.input-group label {
    display: block;
    font-size: 14px;
    color: white;
}

.input-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid white;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: white;
    color: var(--deep-teal);
}

button.submit-btn {
    padding: 12px;
    font-size: 18px;
    font-weight: bold;
    font-family: 'PT Sans', sans-serif;
    background-color: white;
    color: var(--deep-teal);
    border: 2px solid white;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}
button.submit-btn:hover {
    background-color: #8B4513;
    color: white;
    border-color: white;
}


.signup-link {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    color: white;
}
.signup-link a {
    color: var(--blue-five);
    text-decoration: none;
}
.signup-link a:hover {
    text-decoration: underline;
}
</style>

<style>
.alertBoxTransition-enter-active, .alertBoxTransition-leave-active {
    transition: bottom 0.5s, opacity 0.5s;
}
.alertBoxTransition-enter-from, .alertBoxTransition-leave-to {
    opacity: 0;
    bottom: -90px;
}
.alertBoxTransition-enter-to, .alertBoxTransition-leave-from {
    opacity: 1;
    bottom: 30px;
}
</style>