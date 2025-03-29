import { defineStore } from 'pinia';
import { ref } from 'vue';

import axios from 'axios';
import { useGlobeStore } from './GlobeStore.js';

export const useAppStore = defineStore('app-store', () => {
    const globeStore = useGlobeStore();
    const menuOpen = ref(3);

    /**
     * This function sets which menu is open on the app.
     * @param {Number} index The index of the menu.
     */
    function setMenuOpen(index = 0) {
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

    return { menuOpen, setMenuOpen, getCoordsOfCity };
})
