import { Manager, Socket } from "socket.io-client";

let socket: Socket;

// Element references
let serverStatusLabel: HTMLElement;
let clientsUl: HTMLUListElement;
let messagesUl: HTMLUListElement;
let messageForm: HTMLFormElement;
let messageInput: HTMLInputElement;

const cacheDomElements = () => {
    serverStatusLabel = document.querySelector('#server-status')!;
    clientsUl = document.querySelector('#clients-ul')!;
    messagesUl = document.querySelector('#messages-ul')!;
    messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
};

export const connectToServer = (token: string, onConnected: () => void) => {
    // Disconnect any existing socket before creating a new one
    if (socket) {
        disconnectFromServer();
    }

    // The manager URL should point to the base URL of the server, not the client script.
    const manager = new Manager(import.meta.env.VITE_API_URL, {
        extraHeaders: {
            authentication: token
        }
    });

    socket = manager.socket('/');
    
    // Cache DOM elements once
    if (!serverStatusLabel) {
        cacheDomElements();
    }

    addListeners(onConnected);
}

export const disconnectFromServer = () => {
    if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
    }
};

const onMessageFormSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;
    socket.emit('message-from-client', { message: messageInput.value });
    messageInput.value = '';
};

const addListeners = (onConnected: () => void) => {
    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Conectado';
        onConnected();
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Desconectado';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientName => {
            clientsHtml += `<li>${clientName}</li>`;
        });
        clientsUl.innerHTML = clientsHtml;
    });

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${payload.fullName}</strong> <span>${payload.message}</span>`;
        messagesUl.appendChild(li);
        // Scroll to the bottom
        messagesUl.scrollTop = messagesUl.scrollHeight;
    });
    
    // Remove previous listener to avoid duplicates, then add the new one
    messageForm.removeEventListener('submit', onMessageFormSubmit);
    messageForm.addEventListener('submit', onMessageFormSubmit);
}
