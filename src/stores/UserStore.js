import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from 'vue-router';

import * as Auth from 'aws-amplify/auth';

export const useUserStore = defineStore("user-store", () => {
    const router = useRouter();
    const userPresent = ref(false);

    const userInfo = ref({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });

    const authErrorBox = ref({
        status: false,
        text: ""
    });

    /**
     * This sets the status of if the user is logged in or not.
     * @param {Boolean} status The status of the user.
     */
    function setUserPresent(status = false) {
        userPresent.value = status;
    }

    /**
     * This logs in the user into their  account.
     * @param {Auth.SignInInput} params The necessary parameters for signing into an account.
     */
    function logInUser(params) {
        Auth.signIn(params).then(({ isSignedIn, nextStep }) => {
            onLogIn(isSignedIn);
        }).catch((e) => {
            onLogInError(e);
        });
    }

    /**
     * This automatically logs the user into their account.
     */
    function autoLogInUser() {
        Auth.autoSignIn().then(({ isSignedIn, nextStep }) => {
            onLogIn(isSignedIn);
        }).catch((e) => {
            onLogInError(e);
        })
    }

    /**
     * This function runs whenever the user logs into theis account successfully.
     * @param {Boolean} isSignedIn The status of whether the user is signed in or not.
     */
    function onLogIn(isSignedIn) {
        setAuthErrorBox();
        if(isSignedIn) { updateUserInfo(); }
    }

    /**
     * This function runs whenever an error occurs with Logging In the User.
     * @param e The object representing the error. 
     */
    function onLogInError(e) {
        console.log(e);
        const errorName = e.name;
        
        if(errorName === "NotAuthorizedException") {
            setAuthErrorBox("Incorrect Email Or Password.");
        } else if(errorName === "EmptySignInUsername") {
            setAuthErrorBox("Please Fill In Your Email.")
        } else if(errorName === "EmptySignInPassword") {
            setAuthErrorBox("Please Fill In Your Password.")
        } else {
            setAuthErrorBox("An Error Occurred.<br>Please Try Again.")
        }
    }

    /**
     * This logs out the user from their account.
     * @param {Boolean} global If true, signs out the user from all devices, otherwise it just affects this one.
     */
    function logOutUser(global = true) {
        Auth.signOut({ global }).then(() => {
            resetUserInfo();
            router.push("/signin");
        }).catch((e) => {
            router.push("/signin");
        })
    }

    /**
     * This signs up a new user for an  account.
     * @param {Auth.SignUpInput} params The necessary parameters for signing up a new user.
     * @param {Function} confirmOpen This is the function to open the Confirmation Popup.
     */
    function signUpUser(params, confirmOpen = () => {}) {
        Auth.signUp(params).then(({ isSignUpComplete, userId, nextStep }) => {
            setAuthErrorBox();
            confirmOpen();
        }).catch((e) => {
            const errorName = e.name;
            console.log(e);

            if(errorName === "EmptySignUpUsername") {
                setAuthErrorBox("Please Fill In Your Email.");
            } else if(errorName === "EmptySignUpPassword") {
                setAuthErrorBox("Please Fill In Your Password.");
            } else {
                setAuthErrorBox("An Error Occurred.<br>Please Try Again.");
            }
        });
    }

    /**
     * This signs up a new user for an  account.
     * @param {Auth.ConfirmSignUpInput} params The necessary parameters for confirming a new user signed up.
     * @param {Function} confirmClose This is the function to close the Confirmation Popup.
     */
    function confirmSignUpUser(params, confirmClose = () => {}) {
        Auth.confirmSignUp(params).then((result) => {
            setAuthErrorBox();
            confirmClose();
            router.push('/login');
        }).catch((e) => {
            const errorName = e.name;
            setAuthErrorBox("An Error Occurred.<br>Please Try Again.");
        });
    }

    /**
     * This updates the user's basic info from their account.
     * @param {String} nextRoute the next route for the app to go to following receiving the user's info.
     */
    function updateUserInfo(nextRoute = "/") {
        Auth.fetchUserAttributes().then((userAttributes) => {
            setUserPresent(true);
            userInfo.value = {
                firstName: userAttributes.given_name,
                lastName: userAttributes.family_name,
                email: userAttributes.email,
                phoneNumber: userAttributes.phone_number
            }
            router.push(nextRoute);
        }).catch((e) => {
            resetUserInfo();
            if(checkUnauthenticatedException(e)) { return; }
        })
    }

    /**
     * This sets the status of the authentication error box.
     * @param {String} statement The error statement to give to the user.
     *  If the string is empty (which is by default), hides the error box.
     */
    function setAuthErrorBox(statement = "") {
        authErrorBox.value = { status: (statement !== ""), text: statement }
    }

    /**
     * This resets the user's info upon the user logging out.
     */
    function resetUserInfo() {
        setUserPresent(false);
        userInfo.value = { firstName: "", lastName: "", email: "", phoneNumber: "" }
    }

    /**
     * This gets the user's authentication info.
     */
    function getUserAuthDetails() {
        Auth.getCurrentUser().then(({username, userId, signInDetails}) => {
            console.log({username, userId, signInDetails});
        }).catch((e) => {
            if(checkUnauthenticatedException(e)) { return; }
            console.log("Error Accessing User Info:", e);
        });
    }

    /**
     * This deletes the user's account if they are logged on.
     */
    function deleteUserAccount() {
        if(!userPresent.value) { return; }
        Auth.deleteUser().then(() => {
            resetUserInfo();
            router.push("/logout");
        }).catch((e) => {
            console.log("Error Deleting User Account:", e);
        });
    }

    /**
     * This returns if an error is a "UserUnAuthenticatedException" error.
     * @param {Error} error The error to check.
     */
    function checkUnauthenticatedException(error) {
        return (error.name === 'UserUnAuthenticatedException');
    }

    /**
     * This checks if the user is logged on for deleting their account.
     */
    function initDeletePage() {
        if(userPresent.value) { return; }
        setAuthErrorBox('Log In to Delete Account');
        router.push("login");
    }

    return { userInfo, userPresent, authErrorBox,
        updateUserInfo, setAuthErrorBox,
        logInUser, logOutUser, signUpUser, confirmSignUpUser,
        deleteUserAccount, initDeletePage
    }
});