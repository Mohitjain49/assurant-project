<template>
  <div class="app-menu-body">
    <!-- Existing Meeting Selection Section -->
    <div class="dropdown">
      <label for="meeting">Select a Meeting:</label>
      <select id="meeting" v-model="selectedMeeting">
        <option v-for="meeting in meetings" :key="meeting.id" :value="meeting">
          {{ meeting.name }}
        </option>
      </select>
    </div>

    <div class="meeting-details" v-if="selectedMeeting">
      <h3>{{ selectedMeeting.name }}</h3>
      <p>State: {{ selectedMeeting.state }}</p>
      <p>City: {{ selectedMeeting.city }}</p>
      <p>Time: {{ selectedMeeting.time }}</p>
    </div>

    <!-- Create a Meeting Section -->
    <div class="create-meeting">
      <h2>Create a Meeting</h2>
      <div class="input-group">
        <label for="username">Username:</label>
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
  </div>
</template>

<script setup>
import { ref } from "vue";

// Dummy meetings data
const meetings = ref([
  { id: 1, name: 'Jane Doe', state: 'Georgia', city: 'Atlanta', zipcode: '30301', time: '2025-03-30T10:00:00' },
  { id: 2, name: 'John Smith', state: 'California', city: 'San Francisco', zipcode: '94105', time: '2025-04-02T14:00:00' },
  { id: 3, name: 'Smith Bird', state: 'Texas', city: 'Dallas', zipcode: '75201', time: '2025-04-05T16:00:00' }
]);

const selectedMeeting = ref(meetings.value[0]); // Default to first meeting

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
.app-menu-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-family: 'PT Sans', sans-serif;
    font-size: 25px;
    text-align: center;
}

/* Meeting Selection */
.dropdown {
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  margin-right: 10px;
}

select {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
}

/* Meeting Details */
.meeting-details {
  margin-top: 10px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 250px;
  font-size: 12px;
  line-height: 1.2;

}

/* Create a Meeting */
.create-meeting {
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid var(--silver-color);
  background-color: rgba(255, 255, 255, 0.8);
  color: var(--deep-teal);
  font-family: 'PT Sans', sans-serif;
  text-align: center;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* Input Fields */
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  text-align: left;
}

.input-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input-group input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* Create Button */
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

h2 {
    font-size: 20px;
}

p {
    color: var(--deep-teal);
}
</style>
