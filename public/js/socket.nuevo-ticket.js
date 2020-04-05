//comando para establecer la conexion

var socket=io();

var label=$('#lblNuevoTicket')

socket.on('connect',function(){
console.log("conectado al servidor")

socket.on('estadoActual',function(resp){
    label.text(resp.actual)
 
    })

})


socket.on('disconnect',function(){
    console.log("desconectado del servidor")
    })
    
    //listener botones jquery
$('button').on('click',function(){
   socket.emit('siguienteTicket',null,function(siguienteTicket){
   label.text(siguienteTicket)

   })
    console.log('click');
})