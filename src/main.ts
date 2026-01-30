import { connectToServer } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <input id="jwt-token" placeholder="Json Web Token"/>

    <button id="btn-connect"> Conectarse <button/>

    <ul id="clients-ul">
    </ul>
    <span id="server-status">offline</span>

  <form id="message-form">
    <input placeholder="mensaje" id="message-input"/>
  </form>
  
  <h3>Mensajes:</h3>

  <ul id="messages-ul">

  </ul>


  </div>
`

const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')

// connectToServer()
btnConnect?.addEventListener('click', ()=>{
  
  if (!jwtToken || jwtToken.value.trim().length <= 0 ){
    return alert ('Escribe un JWT valido')
  }

  connectToServer(jwtToken.value.trim())
})
