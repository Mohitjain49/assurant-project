<template>
<AppNav />
<ParticlesBackground />

<Transition name="alertBoxTransition" appear fade>
    <AuthError v-if="userStore.authErrorBox.status" />
</Transition>

<div v-if="confirmPopupOpen" class="webpage-cover">
    <div class="auth-box-container center-flex-display">
        <div class="signup-box">
            <h2 class="signup-box-title" style="margin-bottom: 20px;">Verify Your Email</h2>

            <form @submit.prevent class="signup-form">
                <div class="form-group">
                    <input type="text" id="verify" v-model="verifyCode" placeholder="Enter Verification Code" required />
                </div>
                <button type="submit" class="submit-btn" @click="initConfirmSignUp()">Sign Up</button>
            </form>
        </div>
    </div>
</div>

<main id="auth-page" class="web-body">
    <div class="auth-box-container center-flex-display">
        <div class="signup-box">
            <h2 class="signup-box-title">Sign Up</h2>
            <p class="signup-link">
                Already have an account? 
                <RouterLink to="/signin"> Sign In </RouterLink>
            </p>

            <form @submit.prevent class="signup-form">
                <div class="form-group">
                    <input type="text" id="firstName" v-model="firstName" placeholder="Enter your first name" required @click="userStore.setAuthErrorBox('')" />
                </div>
                <div class="form-group">
                    <input type="text" id="lastName" v-model="lastName" placeholder="Enter your last name" required @click="userStore.setAuthErrorBox('')" />
                </div>
                <div class="form-group">
                    <input type="text" id="username" v-model="username" placeholder="Enter your User Name" required @click="userStore.setAuthErrorBox('')" />
                </div>
                <div class="form-group">
                    <input type="text" id="email" v-model="email" placeholder="Enter your email" required @click="userStore.setAuthErrorBox('')" />
                </div>
                <div class="form-group">
                    <input type="text" id="password" v-model="password" placeholder="Enter your password" required @click="userStore.setAuthErrorBox('')" />
                </div>
                <div class="form-group">
                    <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm password" required @click="userStore.setAuthErrorBox('')" />
                </div>
                <button type="submit" class="submit-btn" @click="initSignUp()">Sign Up</button>
            </form>
        </div>
    </div>
</main>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue';
import AuthError from '@/components/AuthError.vue';
import ParticlesBackground from '@/components/ParticlesBackground.vue';

import { useUserStore } from '@/stores/UserStore.js';
import { ref, onBeforeMount } from 'vue';
const userStore = useUserStore();

const username = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const verifyCode = ref("");
const confirmPopupOpen = ref(false);

/**
 * This initailizes the sign up process.
 */
function initSignUp() {
    if(password.value !== confirmPassword.value) {
        userStore.setAuthErrorBox("Passwords Do Not Match");
        return;
    }

    const signUpParams = {
        username: username.value,
        password: password.value,
        options: {
            userAttributes: {
                email: email.value,
                given_name: firstName.value,
                family_name: lastName.value
            }
        }
     }

    userStore.signUpUser(signUpParams,
        () => { setVerificationPopup() }
    )
}

/**
 * This inits the confirm sign up process.
 */
function initConfirmSignUp() {
    userStore.confirmSignUpUser({
        username: username.value,
        confirmationCode: verifyCode.value
    }, () => { setVerificationPopup() });
}

/**
 * This function opens the verification popup.
 */
function setVerificationPopup() {
    confirmPopupOpen.value = !confirmPopupOpen.value;
}

onBeforeMount(() => {
    document.title = "MND | Sign Up";
    userStore.updateUserInfo("/");
});
</script>

<style scoped>
.web-body#auth-page {
    background: transparent;
}

.auth-box-container {
    width: 100%;
    height: 700px;
    min-height: calc(100% - 70px);
}
.signup-box {
    background-color: var(--deep-teal);
    border: 2px solid white;
    border-radius: 20px;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.signup-box-title {
    text-align: center;
    font-size: 45px;
    color: white;
    font-weight: bold;
}

.signup-form {
    display: flex;
    flex-direction: column;
}
.form-group {
    text-align: left;
    margin-bottom: 20px;
}

label {
    font-size: 14px;
    color: white;
}

input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid white;
    border-radius: 4px;
    width: 100%;
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