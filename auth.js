// Import necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithRedirect, 
    GoogleAuthProvider, 
    onAuthStateChanged,
    getRedirectResult 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH0-HqKsYbSxX52epMYp1sdV0I_dfkDs8",
  authDomain: "url-118aa.firebaseapp.com",
  projectId: "url-118aa",
  storageBucket: "url-118aa.firebasestorage.app",
  messagingSenderId: "42489507688",
  appId: "1:42489507688:web:5eb2ed2093bf3e82a1f0dd",
  measurementId: "G-6C7PN7S4JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// PWA Install Prompt Logic
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('install-btn');
    if (installBtn) installBtn.style.display = 'block';
});

// Trigger Install
export function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            deferredPrompt = null;
        });
    }
}

// Google Sign In (Redirect Mode)
export function googleLogin() {
    signInWithRedirect(auth, provider);
}

// Handle Result After Redirect
getRedirectResult(auth).then((result) => {
    if (result) {
        console.log("Successfully signed in with Google:", result.user.email);
    }
}).catch((error) => {
    console.error("Redirect Error:", error.message);
});

// Auth State Monitor
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is active:", user.email);
    }
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
