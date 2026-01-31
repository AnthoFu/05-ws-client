import { connectToServer, disconnectFromServer } from './socket/socket-client';
import { loginUser, registerUser } from './auth/auth';
import './styles/style.css';

// --- DOM Elements ---

// Views
const views = {
    initial: document.querySelector<HTMLElement>('#initial-view')!,
    login: document.querySelector<HTMLElement>('#login-view')!,
    register: document.querySelector<HTMLElement>('#register-view')!,
    chat: document.querySelector<HTMLElement>('#chat-view')!,
};

// Forms
const loginForm = document.querySelector<HTMLFormElement>('#login-form')!;
const registerForm = document.querySelector<HTMLFormElement>('#register-form')!;

// Form Inputs (Login)
const loginEmail = document.querySelector<HTMLInputElement>('#login-email')!;
const loginPassword = document.querySelector<HTMLInputElement>('#login-password')!;

// Form Inputs (Register)
const registerFullName = document.querySelector<HTMLInputElement>('#register-fullname')!;
const registerEmail = document.querySelector<HTMLInputElement>('#register-email')!;
const registerPassword = document.querySelector<HTMLInputElement>('#register-password')!;

// Buttons and Links
const btnLogout = document.querySelector<HTMLButtonElement>('#btn-logout')!;
const gotoLoginBtn = document.querySelector<HTMLButtonElement>('#goto-login')!;
const gotoRegisterBtn = document.querySelector<HTMLButtonElement>('#goto-register')!;
const showRegisterLink = document.querySelector<HTMLAnchorElement>('#show-register')!;
const showLoginLink = document.querySelector<HTMLAnchorElement>('#show-login')!;
const backToInitialLinks = document.querySelectorAll<HTMLAnchorElement>('.goto-initial');

// Error Displays
const loginError = document.querySelector<HTMLDivElement>('#login-error')!;
const registerError = document.querySelector<HTMLDivElement>('#register-error')!;

// --- State ---
let token: string | null = null;
type ViewName = keyof typeof views;

// --- View Navigation ---

const showView = (viewName: ViewName) => {
    Object.values(views).forEach(view => view.classList.add('hidden'));
    views[viewName].classList.remove('hidden');
    // Clear errors on navigation
    loginError.textContent = '';
    registerError.textContent = '';
};

// --- Event Listeners ---

// Navigation
gotoLoginBtn.addEventListener('click', () => showView('login'));
gotoRegisterBtn.addEventListener('click', () => showView('register'));
showRegisterLink.addEventListener('click', (e) => { e.preventDefault(); showView('register'); });
showLoginLink.addEventListener('click', (e) => { e.preventDefault(); showView('login'); });
backToInitialLinks.forEach(link => {
    link.addEventListener('click', (e) => { e.preventDefault(); showView('initial'); });
});

// Authentication
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    const email = loginEmail.value;
    const password = loginPassword.value;

    try {
        const { token: authToken } = await loginUser({ email, password });
        token = authToken;
        if (token) {
            connectToServer(token, () => showView('chat'));
        }
    } catch (error) {
        loginError.textContent = error instanceof Error ? error.message : 'Error desconocido';
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    registerError.textContent = '';
    const fullName = registerFullName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;

    try {
        await registerUser({ fullName, email, password });
        // Automatically log the user in after successful registration
        const { token: authToken } = await loginUser({ email, password });
        token = authToken;
        if (token) {
            connectToServer(token, () => showView('chat'));
        }
    } catch (error) {
        registerError.textContent = error instanceof Error ? error.message : 'Error desconocido';
    }
});

btnLogout.addEventListener('click', () => {
    disconnectFromServer();
    token = null;
    showView('initial');
});

// --- Initialize ---
showView('initial');