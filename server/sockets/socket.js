const { io } = require('../server');
const {TicketControl}=require('../classes/ticket-control')


const ticketControl=new TicketControl();


io.on('connection', (client) => {
    

    client.on('estadoActual',(data,callback)=>{
        let ticketActual=ticketControl.getUltimoTicket();
        callback(ticketActual)
   
    })  


 client.on('siguienteTicket',(data,callback)=>{
     let siguiente=ticketControl.siguiente()
     console.log("cual es el siguiente ticket",siguiente)
     callback(siguiente)

 })    

//emitir  un evento 'estadoActual'
client.emit('estadoActual',{
    actual:ticketControl.getUltimoTicket(),
    ultimos4:ticketControl.getUltimos4()

})

//callback notifica cuando está listo
client.on('atenderTicket',(data,callback)=>{
   if(!data.escritorio  ){
       return callback({
           err:true,
           message:'el escritorio es necesario'
       })

   }
   //ticket que se debe atender
   let atenderTicket=ticketControl.atenderTicket(data.escritorio);
   callback(atenderTicket)

   //actualizar notificar cambios en los ultimos 4
   //emitir ultimos 4
   client.broadcast.emit('ultimos4',{
       ultimos4:ticketControl.getUltimos4()
   })

})



})


/*
io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    });

});


*/