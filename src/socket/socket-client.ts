import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string, onConnected: () => void) => {
    const manager = new Manager('http://localhost:3000', {
        extraHeaders: {
            authentication: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListeners(onConnected);
}

const addListeners = (onConnected: () => void) => {
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Conectado';
        onConnected(); // Callback cuando se conecta
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Desconectado';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`;
        });
        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;

        socket.emit('message-from-client', { message: messageInput.value });

        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const message = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = message;
        messagesUl.appendChild(li); // Usar appendChild para elementos
    });
}