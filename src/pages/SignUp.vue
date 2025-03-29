<template>
<AppNav />
<main class="web-body">
    <div class="auth-box-container center-flex-display">
        <div class="signup-box">
            <h2>Sign Up</h2>
            <p class="signup-link">
                Already have an account? <a href="/SignIn">Sign In</a>
            </p>

            <form submit.prevent="handleSubmit" class="signup-form">
                <div class="form-group">
                    <input type="text" id="firstName" v-model="firstName" placeholder="Enter your first name" required />
                </div>
                <div class="form-group">
                    <input type="text" id="lastName" v-model="lastName" placeholder="Enter your last name" required />
                </div>
                <div class="form-group">
                    <input type="text" id="email" v-model="email" placeholder="Enter your email" required />
                </div>
                <div class="form-group">
                    <input type="text" id="password" v-model="password" placeholder="Enter your password" required />
                </div>
                <div class="form-group">
                    <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm password" required />
                </div>
                <button type="submit" class="submit-btn">Sign Up</button>
            </form>
        </div>
    </div>
</main>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue';
import { ref, onMounted } from 'vue';

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleSubmit = () =>{
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!")
    } else
        console.log('User Data:', {firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value})
}
onMounted(() => {
    document.title = "MMI | Sign Up";
})
</script>

<style scoped>
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

h2 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
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
    font-size: 16px;
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

/* Style for the "Already have an account?" text*/
.signup-link {
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    margin-bottom: 20px;
    color: white;
}

.signup-link a {
    color: white;
    text-decoration: none;
}

.signup-link a:hover {
    text-decoration: underline;
}
</style>