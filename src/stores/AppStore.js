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
    const meetups = ref([]);
    const users = ref([]);

    const userExists = ref(-1);

    /**
     * This function mounts the application.
     */
    function mountApp() {
        axios.get((API_DOMAIN + "get_all_meetups")).then((response) => {
            meetups.value = response.data.data;
            setTimeout(() => { createMapPoints(); }, 500);
        }).catch((e) => {
            console.log(e);
        });

        axios.get((API_DOMAIN + "get")).then((response) => {
            users.value = response.data;
            console.log(users.value);
            setTimeout(() => { userExists.value = checkUserExists(); }, 500);
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
    function createMeetup(city = "Atlanta", state = "GA", time = "", zip = 30055, name2) {
        const query = `${city}, ${state}`;
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

        axios.get(url).then((response) => {
            const data = response.data[0];
            axios.post((API_DOMAIN + "create_meetup"), {
                city, state, time, zip, 
                name1: (userStore.userInfo.firstName + " " + userStore.userInfo.lastName),
                name2, lon: data.lon, lat: data.lat
            }).then(() => {
                alert("Meeting Made. Please refresh the app to see it.")
            }).catch((e) => {
                console.log(e)
                alert("An error occurred");
            })
        })
    }

    function checkUserExists() {
        for(let i = 0; i < users.value.length; i++) {
            const parameter = users.value[i].name === (userStore.userInfo.firstName + " " + userStore.userInfo.lastName);
            if(parameter) { return i; }
        }
        return -1;
    }

    /**
     * this function creates points of meetup locations.
     */
    function createMapPoints() {
        for(let i = 0; i < meetups.value.length; i++) {
            const userFullName = (userStore.userInfo.firstName + " " + userStore.userInfo.lastName);
            const meetup = meetups.value[i]

            if(meetup.name1 === userFullName || meetup.name2 === userFullName) {
                globeStore.createPoint(parseFloat(meetup.longitude), parseFloat(meetup.latitude));
            }
        }
    }

    return { menuOpen, meetups, users, userExists,
        mountApp, setMenuOpen, createMeetup
    };
})

/**
 * This navigates the app to the meetups store.
 */
export function goToMeetups() {
    const appStore = useAppStore();
    appStore.setMenuOpen(2);
}