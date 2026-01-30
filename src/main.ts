import { connectToServer } from './socket/socket-client';
import './styles/style.css';

const loginView = document.querySelector<HTMLElement>('#login-view')!;
const chatView = document.querySelector<HTMLElement>('#chat-view')!;
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if (jwtToken.value.trim().length <= 0) {
    return alert('Por favor, ingrese un JWT válido');
  }
  
  connectToServer(jwtToken.value.trim(), () => {
    loginView.classList.add('hidden');
    chatView.classList.remove('hidden');
  });
});