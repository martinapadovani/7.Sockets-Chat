  const express = require("express")
  const socket = require("socket.io")
  const path = require("path")
  const fs = require("fs")

  //CONFIGURACION DEL SERVIDOR

  //Creo una instancia de Express y le asignas a la variable app
  const app = express()

  const PORT = process.env.PORT || 3000
  /*Defino el puerto en el que el servidor escuchará, 
  ya sea el puerto proporcionado por la variable de entorno PORT 
  o el puerto 3000 de manera predeterminada. */

  //CONEXION CON EL FRONT

  app.use(express.static(path.join(__dirname, "public")))
  /*Desde el servidor indico la carpeta que contendrá los archivos estaticos (public) con .static
  .static recibe la ruta de public con .join, que le indico el nombre de la carpeta
  en la que estoy parado (__dirname) y la carpeta a la que quiero acceder (public)
   Esto permite que los archivos dentro de "public" sean accesibles desde el navegador
  */

  //Levanto el servidor con el puerto configurado
  const server = app.listen(PORT, () => {
    console.log("El servidor fue levantado en puerto 3000")
  }) 

  //CONFIGURACION DE SOCKETS

  //Instancio Socket.io (io) y lo conecto al servidor Express (server)
  const io = socket(server) //io = (input-output)
  //Los sockets se configuran y ejecutan sobre el servidor indicado

  //Desde io espero el evento connection (propio de la libreria socket.io):
  io.on("connection", (socket) => {
    /*cuando se ejecute el evento, se inicia una funcion flecha,
    que recibe por parametro el socket que se conectó */
    console.log(`Nuevo usuario conectado al socket: ${socket.id}`)

    //Definimos eventos propios:
    
    //Desde socket escucho/espero el evento chat:mensaje y un mensaje
    socket.on("chat:mensaje", (mensaje) => {
      //Desde el servidor recibo el evento con el mensaje, y lo emito a todos los sockets 
      io.sockets.emit("chat:mensaje", mensaje)
    })

    socket.on("chat:escribiendo", (username) => {
      console.log("Evento recibido")
      //En base al username recibido, desde el socket, transmito la emicion del evento
      socket.broadcast.emit("chat:escribiendo", username)
      /*Con broadcast, el evento se transmite a todos los clientes conectados,
       excepto al cliente que generó el evento */
    })
    
  })