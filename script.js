class ticket {
    constructor(identidad, ciudadOrigen,ciudadFinal,asientosComprados, fecha){
        this.identidad = {
            nombre: identidad[0],
            DNI: identidad[1]
        }
        this.ciudadOrigen = ciudadOrigen
        this.ciudadFinal = ciudadFinal
        this.asientosComprados = asientosComprados
        this.fecha = fecha
    }
}
let asientos = {
    disponibles : 6,
    ocupados: 4
}
let posicionesCompradas = []
let nombreCompleto = []
let consultar = document.getElementById("consultar")
consultar.addEventListener("click", probarBoton)
let nombre = document.getElementById("nombre")
let apellido = document.getElementById("apellido")
let dni = document.getElementById("dni") 
let ciudadOrigen = document.getElementById("CiudadO")
let ciudadFinal = document.getElementById("ciudadF")
let cantidadAsientos = document.getElementById("cantidadAsientos")
let fecha = document.getElementById("pruebaFecha")
let cajaVoucher = document.getElementById("voucher")



function probarBoton(){
    componerNombre()
    componerTicket()
    posicionesCompradas = []
    guardarPosiciones()
    distinguirCiudades()
    nombreCompleto = []
}
function componerNombre(){
    nombreCompleto.push(`${nombre.value} ${apellido.value}`)
    nombreCompleto.push(dni.value)
}
function componerTicket(){
    ticketPedido = new ticket(nombreCompleto,ciudadOrigen.value,ciudadFinal.value,cantidadAsientos.value,fecha.value)
}
function guardarPosiciones(){
    for(i=1; i<= ticketPedido.asientosComprados; i++){
        posicionesCompradas.push(asientos.ocupados + i)
    }
}
function distinguirCiudades(){
    if(ticketPedido.ciudadFinal != ticketPedido.ciudadOrigen && ticketPedido.identidad.DNI != ""){
        recalcularAsientos()
    }else {
        alert("Se olvido de indicar su DNI o eligió la misma ciudad de destino y de partida")
    }
}
function recalcularAsientos(){
    if(ticketPedido.asientosComprados<=asientos.disponibles){
        asientos.disponibles = asientos.disponibles-ticketPedido.asientosComprados
        asientos.ocupados = asientos.ocupados + parseInt(ticketPedido.asientosComprados)
        mostrarRecibo()
    } else if(asientos.disponibles == 0) {
        alert("No hay más asientos disponibles")
    } else {
        alert(`Solo hay ${asientos.disponibles} asientos disponibles, y ${asientos.ocupados} asientos ocupados`)
        posicionesCompradas = []
    }
    
}
function mostrarRecibo(){
    cajaVoucher.innerHTML = `Asegúrese de que los datos sean correctos`
    cajaVoucher.innerHTML += 
        `<ul>
            <li>Comprador: ${ticketPedido.identidad.nombre}</li>
            <li>DNI: ${ticketPedido.identidad.DNI}</li>
            <li>Ciudad de embarque: ${ticketPedido.ciudadOrigen}</li>                
            <li>Ciudad de desembarque: ${ticketPedido.ciudadFinal}</li>
            <li>Fecha del viaje: ${ticketPedido.fecha}</li>                
            <li>Cantidad de asientos comprados: ${ticketPedido.asientosComprados}</li>
            <li>Posiciones compradas: ${posicionesCompradas}</li>
        </ul>`
}