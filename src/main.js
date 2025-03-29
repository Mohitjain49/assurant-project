import 'cesium/Build/Cesium/Widgets/widgets.css';
import './styles/main.css';
import "./styles/globe.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Amplify } from 'aws-amplify';
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
    FaIcons.faArrowRightToBracket,
    FaIcons.faArrowRightFromBracket,
    FaIcons.faMagnifyingGlass,
    FaIcons.faUserGroup,
    FaIcons.faStreetView,
    FaIcons.faImage,
    FaIcons.faPen,
    FaIcons.faXmark,
    FaIcons.faPlus,
    FaIcons.faArrowUp
);


const COGNITO_VARIABLES = {
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
    region: import.meta.env.VITE_AWS_REGION
}

Amplify.configure({
    Auth: { Cognito: COGNITO_VARIABLES }
});

Ion.defaultAccessToken = import.meta.env.VITE_APP_CESIUM_KEY;

createApp(App).component('font-awesome-icon', FontAwesomeIcon)
    .use(createPinia())
    .use(router)
    .mount('#app');
