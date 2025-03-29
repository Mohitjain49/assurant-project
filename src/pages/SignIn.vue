<template>
<AppNav />
<main class="web-body">
    <div class="auth-box-container center-flex-display"> 
        <div class="signin-box">
            <h2>Sign In</h2>
            <p class="signup-link">
                Need an account? <a href="/signup">Create an account</a>
            </p>
            <form @submit.prevent="handleSubmit">
                <div class="input-group">
                    <input type="email" id="email" v-model="email" required placeholder="Enter your email"/>
                </div>
                <div class="input-group">
                    <input type="password" id="password" v-model="password" required placeholder="Enter your password"/>
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    </div>
</main>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue';
import { ref, onMounted } from 'vue';

const email = ref("");
const password = ref("");

onMounted(() => {
    document.title = "MMI | Sign In";
})

const handleSubmit = () => {
  // Handle the form submission logic (e.g
  console.log("Form submitted", { email: email.value, password: password.value });
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

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: white;
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

button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: white;
    color: var(--deep-teal);
    border: 2px solid white;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

button:hover {
    background-color: #8B4513;
    color: white;
    border-color: white;
}

.signup-link {
    font-size: 14px;
    color: white;
    margin-bottom: 20px;
}

.signup-link a {
    color: white;
    text-decoration: none;
    margin-bottom: 20px;
}

.signup-link a:hover {
    text-decoration: underline;
}

</style>