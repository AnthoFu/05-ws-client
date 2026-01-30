import { connectToServer } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>

    <ul id="clients-ul">
    </ul>
    <span id="server-status">offline</span>

  <form id="message-form">
  <input placeholder="mensaje" id="message-input"/>
  </form>



  </div>
`


connectToServer()

