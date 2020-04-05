//comando para establecer la conexion

var socket=io();

var searchParams=new URLSearchParams(window.location.search)
console.log(searchParams.has('escritorio'))
if(!searchParams.has('escritorio')){
    window.location='index.html'
    throw new Error('El escritorio es necesario')
}


var escritorio=searchParams.get('escritorio')
var label=$('small')

$('h1').text('Escritorio '+escritorio)

//cuando se pincha el boton, se trae el ticket a atender

$('button').on('click',function(){
    socket.emit('atenderTicket',{escritorio:escritorio},function(resp){
     console.log(resp)

     if(resp=='No hay mas tickets'){
         alert(resp)
         label.text(resp)
         return
     }

     label.text('Ticket'+resp.numero)

    })


})




/*

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

*/