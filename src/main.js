import 'cesium/Build/Cesium/Widgets/widgets.css';
import './styles/main.css';
import "./styles/globe.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Ion } from 'cesium'

import App from './App.vue'
import router from './router.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as FaIcons from '@fortawesome/free-solid-svg-icons'

library.add(
    FaIcons.faHouse,
    FaIcons.faPaperPlane,
    FaIcons.faCircleUser,
    FaIcons.faUserPlus,
    FaIcons.faArrowRightFromBracket,
    FaIcons.faMagnifyingGlass,
    FaIcons.faUserGroup,
    FaIcons.faStreetView
)

Ion.defaultAccessToken = import.meta.env.VITE_APP_CESIUM_KEY;
createApp(App).component('font-awesome-icon', FontAwesomeIcon)
    .use(createPinia())
    .use(router)
    .mount('#app');
