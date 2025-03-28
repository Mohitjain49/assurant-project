import { defineStore } from "pinia";
import { ref } from "vue";
import * as Cesium from "cesium";

export const CESIUM_VIEWER_ID = "app-globe";
export const CESIUM_GEOCODER_ID = "app-geocoder";

export const useGlobeStore = defineStore("globe-store", () => {
    const storeMounted = ref(false);

    /**
     * @type {import('vue').Ref<Cesium.Viewer>}
     */
    const viewer = ref(null);
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

    return { viewer, geocoder, mountGlobe, unmountGlobe }
})