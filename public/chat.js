//Instancia del socket
const socket = io()

const mensaje = document.getElementById("mensaje")
const username = document.getElementById("username")
const enviar = document.getElementById("enviar")
const listaDeMensajes = document.getElementById("output")
const escribiendo = document.getElementById("escribiendo")

//ENVIAR MENSAJE
enviar.addEventListener("click", () => {
  /*Cuando el usuario hace clic en el botón "Enviar", el socket va a emitir al servidor
  el evento "chat:mensaje", junto a los datos del mensaje que se pasan como objeto. */
  socket.emit("chat:mensaje", { usuario: username.value, contenido: mensaje.value })

  mensaje.value = "" //Borro el contenido del campo de entrada de mensajes.
})

//RECIBIR MENSAJE
socket.on("chat:mensaje", (mensaje) => {
  /*El socket espera/escucha el evento chat:mensaje que se envía desde el servidor.
   Cuando se reciba el evento junto al mensaje, lo agrego al html para mostrarlo*/
  listaDeMensajes.innerHTML += `<li> ${mensaje.usuario}: ${mensaje.contenido}</li>`
})

//Notificacion de "escribiendo.."
socket.on("chat:escribiendo", (username) => {
  console.log("Evento recibido")
  /*Cuando el servidor envía el evento "chat:escribiendo", recibo username 
  y muestro un mensaje "Escribiendo..." en la interfaz*/
  escribiendo.innerHTML = `<p>${username}</p> esta escribiendo...`
})


//Cuando el usuario presiona una tecla en el input de mensajes
mensaje.addEventListener("keypress", () => {
  //Envía un evento "chat:escribiendo" al servidor, junto al username
  socket.emit("chat:escribiendo", username.value)
})


