import { defineStore } from "pinia";
import { ref } from "vue";
import * as Cesium from "cesium";

export const CESIUM_VIEWER_ID = "app-globe";
export const CESIUM_GEOCODER_ID = "app-geocoder";

export const useGlobeStore = defineStore("globe-store", () => {
    const storeMounted = ref(false);

    /**
     * @type {import('vue').Ref<Cesium.Viewer>} The Viewer to see and edit the map.
     */
    const viewer = ref(null);

    /**
     * @type {import('vue').Ref<Cesium.Geocoder>} The Viewer to see and edit the map.
     */
    const geocoder = ref(null);

    /**
     * This function mounts the globe for the app to use.
     */
    function mountGlobe() {
        if(storeMounted.value) { return; }
        storeMounted.value = true;
        initializeViewer();
    }

    /**
     * This function unmounts the globe.
     */
    function unmountGlobe() {
        if(!storeMounted.value) { return; }
        storeMounted.value = false;
        viewer.value.destroy();
    }

    /**
     * This function initializes the globe for the main app.
     */
    function initializeViewer() {
        viewer.value = new Cesium.Viewer(CESIUM_VIEWER_ID, {
            baseLayerPicker: false,
            timeline: false,
            geocoder: false,
            navigationHelpButton: false,
            fullscreenButton: false,
            sceneModePicker: false,
            homeButton: false,
            animation: false,
            baseLayer: Cesium.ImageryLayer.fromWorldImagery({
                style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
            })
        })
    }

    /**
     * This function sets the Geocoder for the application.
     * @param {Boolean} status This new status for the Geocoder.
     */
    function setGeocoder(status = true) {
        if(!status && geocoder.value != null) {
            geocoder.value.destroy();
            geocoder.value == null;
            return;
        }

        geocoder.value = new Cesium.Geocoder({
            flightDuration: 3,
            scene: viewer.value.scene,
            container: CESIUM_GEOCODER_ID
        });
    }

    return { viewer, geocoder, mountGlobe, unmountGlobe, setGeocoder }
})