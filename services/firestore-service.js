// --- FIRESTORE SINGLETON ---
let db;

/**
 * Lazily initializes and returns the Firestore database instance.
 * Ensures that firebase.initializeApp() has been called before.
 * @returns {firebase.firestore.Firestore}
 */
function getDB() {
    if (!db) {
        db = firebase.firestore();
    }
    return db;
}

// --- USER PROFILE FUNCTIONS ---

/**
 * Creates a user profile document in Firestore.
 * @param {string} uid User's ID
 * @param {string} username 
 * @param {string} role 'user' or 'agent'
 * @returns {Promise<void>}
 */
export function createUserProfile(uid, email, username, role) {
    return getDB().collection('users').doc(uid).set({
        username,
        email,
        role
    });
}

/**
 * Gets a user profile from Firestore.
 * @param {string} uid User's ID
 * @returns {Promise<firebase.firestore.DocumentSnapshot>}
 */
export function getUserProfile(uid) {
    return getDB().collection('users').doc(uid).get();
}


// --- TICKET FUNCTIONS ---

/**
 * Creates a new ticket in Firestore.
 * @param {object} ticketData
 * @returns {Promise<void>}
 */
export function createTicket(ticketData) {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.reject(new Error('User not authenticated.'));

    return getDB().collection('tickets').add({
        ...ticketData,
        uid: user.uid,
        userEmail: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'new'
    });
}

/**
 * Attaches a real-time listener for tickets created by a specific user.
 * @param {string} uid User's ID
 * @param {function(Array<object>)} callback Function to call with the tickets array
 * @returns {firebase.Unsubscribe}
 */
export function onTicketsUpdate(uid, callback) {
    return getDB().collection('tickets')
        .where('uid', '==', uid)
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
            const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(tickets);
        });
}

/**
 * Attaches a real-time listener for all tickets (for agents).
 * @param {function(Array<object>)} callback Function to call with the tickets array
 * @returns {firebase.Unsubscribe}
 */
export function onAllTicketsUpdate(callback) {
    return getDB().collection('tickets')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
            const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(tickets);
        });
}

/**
 * Updates the status of a specific ticket.
 * @param {string} ticketId 
 * @param {string} newStatus 
 * @returns {Promise<void>}
 */
export function updateTicketStatus(ticketId, newStatus) {
    return getDB().collection('tickets').doc(ticketId).update({ status: newStatus });
}
