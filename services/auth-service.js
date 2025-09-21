// --- AUTH SINGLETON ---
let auth;

/**
 * Lazily initializes and returns the Firebase Auth instance.
 * Ensures that firebase.initializeApp() has been called before.
 * @returns {firebase.auth.Auth}
 */
function getAuth() {
    if (!auth) {
        auth = firebase.auth();
    }
    return auth;
}

// --- AUTHENTICATION FUNCTIONS ---

/**
 * Signs up a new user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<firebase.auth.UserCredential>}
 */
export function signUpUser(email, password) {
    return getAuth().createUserWithEmailAndPassword(email, password);
}

/**
 * Signs in an existing user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<firebase.auth.UserCredential>}
 */
export function signInUser(email, password) {
    return getAuth().signInWithEmailAndPassword(email, password);
}

/**
 * Signs out the current user.
 * @returns {Promise<void>}
 */
export function signOutUser() {
    return getAuth().signOut();
}

/**
 * Attaches a listener for authentication state changes.
 * @param {function(firebase.User | null)} callback
 * @returns {firebase.Unsubscribe}
 */
export function onAuthStateChanged(callback) {
    return getAuth().onAuthStateChanged(callback);
}
