import { Manager, Socket } from "socket.io-client"

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000')

    const socket = manager.socket('/');

    addLinsteners(socket);
}

const addLinsteners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Conectado al servidor'
    })

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Desconectado del servidor'
    })

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml= ''
        clients.forEach(clientId => {
            clientsHtml+= `
            <li>${clientId}</li>
            `
        })
        clientsUl.innerHTML = clientsHtml
    })
}