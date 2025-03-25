// Define Auth0 Client
const auth0Client = null;

// DOM Elements
const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');
const userInfoDiv = document.getElementById('user-info');
const profileElement = document.getElementById('profile');

// Initialize Auth0
async function initializeAuth0() {
    try {
        const auth0 = await createAuth0Client({
          domain: 'dev-88odyes1z8kfjkq7.us.auth0.com', // e.g., 'dev-abc123.auth0.com'
          client_id: 'JhKj76dGA4uPp7ESddA02mSjEjxxJUXb',
            redirect_uri: window.location.origin,
        });

        // Check if the user is authenticated on load
        const isAuthenticated = await auth0.isAuthenticated();

        if (isAuthenticated) {
            showUserInfo();
        } else {
            // Show login button if user is not authenticated
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
            userInfoDiv.style.display = 'none';
        }

        // Handle Login
        loginBtn.addEventListener('click', async () => {
            await auth0.loginWithRedirect();
        });

        // Handle Logout
        logoutBtn.addEventListener('click', async () => {
            await auth0.logout({
                returnTo: window.location.origin
            });
        });

        // Handle Auth0 Redirect callback
        if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
            await auth0.handleRedirectCallback();
            window.location.replace(window.location.origin); // Clear the URL
        }

        // Show user info
        async function showUserInfo() {
            const user = await auth0.getUser();
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            userInfoDiv.style.display = 'block';
            profileElement.textContent = JSON.stringify(user, null, 2);
        }
    } catch (error) {
        console.error('Error initializing Auth0:', error);
    }
}

// Initialize Auth0 client
initializeAuth0();
