// IMPORTANT: This is a client-side simulation of user roles for rapid development.
// In a production environment, roles should be managed securely on the backend
// using Firebase Authentication custom claims, set via Cloud Functions.

// Add agent emails to this list.
const AGENT_EMAILS = ['agent@helpdesk.pro']; // Example agent email

/**
 * Checks the role of the user based on their email.
 * @param {firebase.User} user - The Firebase user object.
 * @returns {'agent' | 'user'}
 */
export function getUserRole(user) {
    if (user && AGENT_EMAILS.includes(user.email)) {
        return 'agent';
    }
    return 'user';
}
