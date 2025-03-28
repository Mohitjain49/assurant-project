import { defineStore } from 'pinia';
import { ref } from 'vue';

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

    return { menuOpen, setMenuOpen };
})
