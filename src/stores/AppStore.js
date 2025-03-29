import { defineStore } from 'pinia';
import { ref } from 'vue';

import axios from 'axios';
import { useGlobeStore } from './GlobeStore.js';
import { useUserStore } from './UserStore.js';

const API_DOMAIN = "https://b6dhy9qo2m.execute-api.us-east-1.amazonaws.com/";

export const useAppStore = defineStore('app-store', () => {
    const globeStore = useGlobeStore();
    const userStore = useUserStore();

    const menuOpen = ref(3);
    const meetups = ref(null);
    const users = ref(null);

    /**
     * This function mounts the application.
     */
    function mountApp() {
        axios.get((API_DOMAIN + "get_all_meetups")).then((response) => {
            meetups.value = response.data.data;
        }).catch((e) => {
            console.log(e);
        });

        axios.get((API_DOMAIN + "get")).then((response) => {
            users.value = response.data;
            console.log(users.value);
        }).catch((e) => {
            console.log(e);
        });
    }

    /**
     * This function sets which menu is open on the app.
     * @param {Number} index The index of the menu.
     */
    function setMenuOpen(index = 0) {
        if(!userStore.userPresent && index == 2) { index = 3; }
        menuOpen.value = index;
    }

    /**
     * This returns the coordinates of a city.
     * @param {String} city the city to find.
     * @param {String} state the state where the city is. 
     */
    function getCoordsOfCity(city = "Atlanta", state = "GA") {
        const query = `${city}, ${state}`;
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

        axios.get(url).then((response) => {
            const data = response.data[0];
            console.log(data.lon, data.lat);
        })
    }

    return { menuOpen, meetups, users,
        mountApp, setMenuOpen, getCoordsOfCity
    };
})
