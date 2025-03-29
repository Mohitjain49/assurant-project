import { defineStore } from "pinia";
import { ref } from "vue";
import { goToMeetups } from "./AppStore.js";

import * as Cesium from "cesium";
import icon from "@/assets/location_icon.svg";

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

        viewer.value.screenSpaceEventHandler.setInputAction((event) => {
            const pointSelected = viewer.value.scene.pick(event.position);
            if(pointSelected == undefined) { return; }
            goToMeetups();
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        viewer.value.screenSpaceEventHandler.setInputAction((event) => {
            const pointSelected = viewer.value.scene.pick(event.endPosition);
            if(pointSelected == undefined) {
                viewer.value.canvas.style.cursor = "default";
            } else {
                viewer.value.canvas.style.cursor = "pointer";
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
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

    /**
     * This creates a new point on the map.
     * @param {Number} lon The longitude of the point.
     * @param {Number} lat The latitude of the point.
     */
    function createPoint(lon, lat) {
        const POINT_WIDTH = 35;

        viewer.value.entities.add({
            position: Cesium.Cartesian3.fromDegrees(lon, lat),
            billboard: {
                width: POINT_WIDTH, height: (POINT_WIDTH * 1.42075),
                image: icon,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            }
        })
    }

    return { viewer, geocoder,
        mountGlobe, unmountGlobe,
        setGeocoder, createPoint
    }
})