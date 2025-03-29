<template>
<vue-particles id="tsparticles" :options="PARTICLES" />
</template>

<script setup>
import { ref } from 'vue';

const PARTICLES = ref({
    background: {
        color: "#000000", // Dark night sky background
    },
    particles: {
        number: { value: 150 },
        color: {  value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
            value: { min: 0.3, max: 1 }, // Twinkling effect
            animation: {
                enable: true,
                speed: 1.5,
                minimumValue: 0.3,
                sync: false,
            },
        },
        size: {
            value: { min: 1, max: 3 }, // Varying star sizes
        },
        move: {
            enable: true,
            speed: 0.2, // Very slow movement
            direction: "none",
            outModes: {
                default: "bounce",
            },
        },
    },
})
</script>