import 'cesium/Build/Cesium/Widgets/widgets.css';
import './styles/main.css';
import "./styles/globe.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Ion } from 'cesium'

import App from './App.vue'
import router from './router.js'

Ion.defaultAccessToken = import.meta.env.VITE_APP_CESIUM_KEY;
createApp(App).use(createPinia()).use(router).mount('#app');
