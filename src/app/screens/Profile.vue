<template>
<template v-if="userStore.userPresent">
    <div class="app-menu-body" v-if="!editingProfile">
        <div class="profile-img-body">
            <h1 class="profile-img-placeholder"> {{ userStore.userInfo.firstName.substring(0, 1) + userStore.userInfo.lastName.substring(0, 1) }} </h1>
            <font-awesome-icon v-if="appStore.userExists == -1" class="profile-img-edit" icon="fa-pen" title="Edit Profile" @click="toggleEditStatus()" />
        </div>

        <h1 class="profile-name"> {{ userStore.userInfo.firstName + ' ' + userStore.userInfo.lastName }} </h1>

        <div class="profile-desc">
            <div class="profile-link-header"> Email </div>
            <a :href="('mailto:' + userStore.userInfo.email)" class="profile-link"> {{ userStore.userInfo.email }} </a>
            <div style="height: 5px;"></div>
        </div>
        <div v-if="appStore.userExists != -1" class="profile-desc">
            <div class="profile-link-header"> Condition </div>
            <span> {{ appStore.users[appStore.userExists].condition }} </span>
            <div style="height: 5px;"></div>
        </div>
    </div>

    <div class="app-menu-body" v-if="editingProfile">
        <font-awesome-icon class="profile-img-edit" icon="fa-xmark" title="Stop Editing" @click="toggleEditStatus()" />
        <form @submit.prevent class="profile-form">
            <div class="form-radio-group" v-for="(group, index) in radioGroups" :key="index">
                <div class="radio-group-wrapper">
                    <label>{{  group.question }}</label>
                    <div class="options">
                        <label v-for="(option, optionIndex) in group.options" :key="optionIndex" class="radio-option">
                            <input type="radio" :name="'question-' + index" :value="option" v-model="group.answer" /> {{ option }}
                        </label>
                    </div>
                </div>
            </div>

            <div class="form-biography-group">
                <div class="form-biography-wrapper">
                    <label for="biography">Biography</label>
                    <textarea id="biography" v-model="biography" rows="4" placeholder="Write your biography here" maxlength="200"></textarea>
                </div>
            </div>

            <div class="form-neurodivergent-group">
                <div class="form-neurodivergent-wrapper">
                    <label for="neurodivergentCondition">What neurodivergent condition do you identify with?</label>
                    <textarea id="neurodivergentCondition" v-model="neurodivergentCondition" rows="4" placeholder="Describe your neurodivergent condition here" maxlength="60"></textarea>
                </div>
            </div>

            <div class="form-submit-group">
                <button class="profile-submit-btn" type="submit" @click="createUser()">Submit</button>
            </div>
        </form>
    </div>
</template>
<template v-else>
    <div class="app-menu-body placeholder">
        <h1 class="profile-img-placeholder"> ? </h1>
        <span style="margin: 10px 0px;"> You are not currently signed in at the moment. </span>
        <RouterLink to="/signin" class="profile-signin-btn"> Sign In </RouterLink>
    </div>
</template>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore.js';
import { useAppStore } from '@/stores/AppStore.js';
import { ref, onMounted } from 'vue';

const appStore = useAppStore();
const userStore = useUserStore();
const editingProfile = ref(false);

const radioGroups = ref([
    { 
        question: "How would you rate your energy levels on most days?", 
        options: ["Low", "Moderate", "Fluctuates significantly"], 
        answer: "" 
    },
    { 
        question: "What best describes your social support needs?", 
        options: ["Prefer regular social connection", "Need occasional social interaction", "Value independence with minimal social needs"], 
        answer: "" 
    },
    { 
        question: "How comfortable are you discussing personal matters with others?", 
        options: ["Very comfortable", "Somewhat comfortable", "Prefer not to discuss personal matters"], 
        answer: "" 
    },
    { 
        question: "How do you respond to unexpected changes to plans?", 
        options: ["Adapt easily", "Need time to adjust", "Find changes very distressing"], 
        answer: "" 
    },
    { 
        question: "Which environment helps you feel most at ease?", 
        options: ["Busy and stimulating", "Quiet and predictable", "Natural/outdoors"], 
        answer: "" 
    },
    { 
        question: "How do you process sensory information?", 
        options: ["No strong sensory sensitivities", "Some sensory sensitivities (sound, light, texture)", "Strong sensory sensitivities that affect daily life"], 
        answer: "" 
    },
    { 
        question: "How do you typically communicate your needs?", 
        options: ["Direct and straightforward", "Through hints or indirect methods", "Struggle to communicate needs"], 
        answer: "" 
    },
    { 
        question: "What role does routine play in your daily life?", 
        options: ["Very important/need consistent routines", "Somewhat important with flexibility", "Prefer variety and spontaneity"], 
        answer: "" 
    },
    { 
        question: "How do you prefer to learn new information?", 
        options: ["Visual materials/reading", "Hands-on practice", "Discussion with others"], 
        answer: "" 
    },
    { 
        question: "What's your approach to social gatherings?", 
        options: ["Enjoy large group settings", "Prefer small group interactions", "Most comfortable one-on-one or alone"], 
        answer: "" 
    },
    { 
        question: "How important is having personal space and time alone?", 
        options: ["Essential/high priority", "Important but balanced with social time", "Not particularly important"], 
        answer: "" 
    },
    { 
        question: "What's your approach to special interests or hobbies?", 
        options: ["Have intense focus on specific interests", "Enjoy various hobbies casually", "Limited interest in hobbies"], 
        answer: "" 
    },
    { 
        question: "How do you typically communicate?", 
        options: ["Detailed and thorough", "Brief and to-the-point", "Visual or alternative communication methods"], 
        answer: "" 
    },
    { 
        question: "What's your preferred social communication style?", 
        options: ["Enjoy abstract/figurative conversation", "Prefer literal/concrete conversation", "Comfortable with either approach"], 
        answer: "" 
    },
    { 
        question: "How do you handle transitions between activities?", 
        options: ["Switch easily between tasks", "Need clear signals for transitions", "Require significant time to transition"], 
        answer: "" 
    },
    { 
        question: "How do you process emotions?", 
        options: ["Easily identify and express feelings", "Take time to understand my emotions", "Find emotions confusing or overwhelming"], 
        answer: "" 
    },
    { 
        question: "What type of content do you most enjoy?", 
        options: ["Fiction/entertainment", "Factual/educational", "Special interest topics"], 
        answer: "" 
    },
    { 
        question: "What's your approach to personal goals?", 
        options: ["Highly structured with specific plans", "General goals without rigid timelines", "Focus on daily living rather than goals"], 
        answer: "" 
    },
    { 
        question: "How do you show interest in others?", 
        options: ["Ask questions about them", "Share experiences or information", "Show interest through actions rather than words"], 
        answer: "" 
    },
    { 
        question: "How do you typically respond when feeling overwhelmed?", 
        options: ["Take action to address the situation", "Need quiet time alone", "Seek specific support from others"], 
        answer: "" 
    }
]);

const responses = ref(new Array(radioGroups.value.length).fill(null));
const biography = ref('');
const neurodivergentCondition = ref('');

/**
 * This toggles the status of if the user is editing their profile or not.
 */
function toggleEditStatus() {
    editingProfile.value = (checkUserExists() ? false : !editingProfile.value);
}

function checkUserExists() {
    for(let i = 0; i < appStore.users.length; i++) {
        const parameter = appStore.users[i].name === (userStore.userInfo.firstName + " " + userStore.userInfo.lastName);
        if(parameter) { return true; }
    }
    return false;
}

/**
 * This function adds the user to the more detailed table.
 */
function createUser() {
    const allRadioAnswered = responses.value.every(response => response !== null);
    const biographyFilled = biography.value.trim() !== '';
    const neurodivergentConditionFilled = neurodivergentCondition.value.trim() !== '';

    // If any field is missing, show alert and prevent submission
    if (!allRadioAnswered) {
        alert("Please answer all questions in the radio groups.");
        return;
    }
    if (!biographyFilled) {
        alert("Please fill out your biography.");
        return;
    }
    if (!neurodivergentConditionFilled) {
        alert("Please answer the neurodivergent condition question.");
        return;
    }
}
</script>

<style>
.app-menu-body.placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-family: 'PT Sans', sans-serif;
    font-size: 25px;
    text-align: center;
    width: calc(100% - 20px);
    padding: 0px 10px;
}
.profile-signin-btn {
    border: 1px solid white;
    padding: 10px;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.25);
    transition: var(--default-transition), padding 0.2s;
}
.profile-signin-btn:hover {
    padding: 13px;
    background-color: var(--blue-three);
}

.profile-img-body {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
.profile-img-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 15px;
    border: 2px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 75px;
    color: white;
    background-color: var(--blue-cobalt);
}

.profile-img-edit {
    cursor: pointer;
    position: absolute;
    top: 45px;
    left: 0;
    color: white;
    font-size: 22px;
    padding: 10px;
    border-right: 1px dashed;
    border-bottom: 1px dashed;
    border-bottom-right-radius: 10px;
    background-color: rgba(0, 0, 0, 0.25);
    transition: var(--default-transition), padding 0.2s;
}
.profile-img-edit:hover {
    padding: 13px;
    background-color: var(--blue-three);
}

.profile-name {
    width: fit-content;
    text-align: left;
    font-size: 50px;
    padding-top: 5px;
    margin-left: 6.25%;
    color: var(--brown-color);
    text-shadow: 
        -1px -1px 0 white, /* Top-left shadow */
        1px -1px 0 white,  /* Top-right shadow */
        -1px 1px 0 white,  /* Bottom-left shadow */
        1px 1px 0 white;   /* Bottom-right shadow */;
}
.profile-desc {
    position: relative;
    width: 87.5%;
    height: fit-content;
    left: calc(6.25% - 7px);
    color: var(--deep-teal);
    border: 2px solid var(--silver-color);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    margin-top: 10px;
    font-family: 'PT Sans', sans-serif;
    font-size: 17px;
}

.profile-link-header {
    font-size: 20px;
    font-weight: bold;
    width: fit-content;
    border-bottom: 2px solid;
    margin-bottom: 3px;
}
.profile-link {
    font-size: 18px;
    color: var(--blue-five);
    border-bottom: 1px solid;
    margin-bottom: 15px;
}

.profile-form {
    width: 100%;
    height: fit-content;
    min-height: 100%;
    overflow: hidden;
}
.form-radio-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
}

.form-radio-group label:first-child {
    color: var(--deep-teal);
    font: 16px;
    font-weight: bold;
}

.form-radio-group .options label {
  font-weight: normal;
  font: 16px;
  color: var(--deep-teal);
}

.form-field {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

textarea {
  color: var(--deep-teal); /* Make text teal */
  font-family: 'PT Sans', sans-serif;
  font-size: 17px;
  border: 2px solid var(--silver-color);
  border-radius: 10px;
  padding: 10px;
  width: 87.5%;  /* Same width as other elements */
  margin-top: 10px;
}

.radio-group-wrapper {
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid var(--silver-color);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 87.5%;
  overflow-y: auto;
}

.radio-option {
  margin-bottom: 10px; /* Space between radio options */
  display: flex;
  align-items: center;
}

.radio-option input {
  margin-right: 5px; /* Space between radio button and label */
}

.form-biography-group,
.form-neurodivergent-group {
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid var(--silver-color);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 87.5%;
  overflow-y: auto;
}

/* Styles for the Submit button */
.profile-submit-btn {
  width: 75%;
  padding: 12px;
  background-color: var(--blue-five);
  color: white;
  border: 2px solid var(--silver-color);
  border-radius: 10px;
  font-family: 'PT Sans', sans-serif;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;
  cursor: pointer;
}

.profile-submit-btn:hover {
  background-color: var(--blue-three); /* Change to another color for the hover effect */
  transform: scale(1.05);  /* Slightly enlarge the button when hovered */
}
.profile-submit-btn:active {
  background-color: var(--blue-two); /* Change this color when the button is clicked */
  transform: scale(0.98);  /* Slightly shrink the button when clicked */
}

/* Wrapper for the button */
.form-submit-group {
  margin-top: 20px;
  text-align: center;
  width: 100%;
  padding-bottom: 15px;
}
</style>