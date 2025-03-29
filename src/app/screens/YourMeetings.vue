<template>
<div class="app-menu-body">
    <div style="height: 10px"></div>
    <div @click="toggleTab" class="meeting-navBtn" v-if="!createMeetingOpen">
        <span> Create Meeting </span>
        <font-awesome-icon icon="fa-plus" />
    </div>
    <div @click="toggleTab" class="meeting-navBtn" v-if="createMeetingOpen">
        <span> Leave </span>
        <font-awesome-icon icon="fa-arrow-up" />
    </div>

    <div class="create-meeting" v-if="createMeetingOpen">
        <h2 class="create-meeting-header">Create a Meeting</h2>
        <div class="input-group">
            <label for="username">Name (First and Last):</label>
            <input id="username" v-model="newMeeting.username" type="text" placeholder="Enter username">
        </div>
        <div class="input-group">
            <label for="state">State:</label>
            <input id="state" v-model="newMeeting.state" type="text" placeholder="Enter state">
        </div>
        <div class="input-group">
            <label for="city">City:</label>
            <input id="city" v-model="newMeeting.city" type="text" placeholder="Enter city">
        </div>
        <div class="input-group">
            <label for="zipcode">Zipcode:</label>
            <input id="zipcode" v-model="newMeeting.zipcode" type="text" placeholder="Enter zipcode">
        </div>
        <div class="input-group">
            <label for="time">Time:</label>
            <input id="time" v-model="newMeeting.time" type="datetime-local">
        </div>

        <button class="create-btn" @click="createMeeting">Create</button>
    </div>

    <template v-else>
        <div class="meeting-tab">
            <div class="meeting-tab-header">With Mohit Jain</div>
            <p> Time: 12am </p>
            <p> Place: Atlanta, GA </p>
        </div>
    </template>
</div>
</template>

<script setup>
import { ref } from "vue";
const createMeetingOpen = ref(false);

/**
 * This toggles whether the menu to create a meeting is open or not.
 */
function toggleTab() {
    createMeetingOpen.value = !createMeetingOpen.value;
}

// New Meeting Form Data
const newMeeting = ref({
    username: '',
    state: '',
    city: '',
    zipcode: '',
    time: ''
});

// Function to create a new meeting
const createMeeting = () => {
    if (!newMeeting.value.username || !newMeeting.value.state || !newMeeting.value.city || !newMeeting.value.zipcode || !newMeeting.value.time) {
        alert("Please fill out all fields!");
        return;
    }

    // Add new meeting to the list
    meetings.value.push({ ...newMeeting.value, id: meetings.value.length + 1 });

    // Clear the form
    newMeeting.value = { username: '', state: '', city: '', zipcode: '', time: '' };
};
</script>

<style scoped>
.meeting-navBtn {
    cursor: pointer;
    position: relative;
    left: calc(50% - 100px);
    width: 200px;
    height: fit-content;
    padding: 7px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border: 1px solid white;
    border-radius: 15px;
    font-size: 18px;
    font-family: 'PT Sans', sans-serif;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.25);
    gap: 5px;
    transition: var(--default-transition);
}
.meeting-navBtn:hover {
    background-color: var(--blue-three);
}

.create-meeting {
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    border: 2px solid var(--silver-color);
    background-color: rgba(255, 255, 255, 0.8);
    color: var(--deep-teal);
    font-family: 'PT Sans', sans-serif;
    text-align: center;
    width: 325px;
    margin-left: auto;
    margin-right: auto;
}
.create-meeting-header {
    color: var(--deep-teal);
}

.input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    text-align: left;
}

.input-group label {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 16px;
    margin-right: 10px;
}
.input-group input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.create-btn {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: var(--blue-five);
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}
.create-btn:hover {
    background-color: var(--blue-three);
}

.meeting-tab {
    overflow: hidden;
    position: relative;
    left: 5%;
    width: calc(90% - 12px);
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 5px;
    border-radius: 10px;
    font-family: 'PT Sans', sans-serif;
    color: var(--deep-teal);
    border: 2px dashed var(--brown-color);
}
.meeting-tab-header {
    font-weight: bold;
    width: fit-content;
    border-bottom: 2px solid;
    margin-bottom: 5px;
}
.meeting-tab p {
    color: inherit;
}
</style>
