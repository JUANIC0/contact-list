const nombre = document.querySelector('.nombre')
const numero = document.querySelector('.numero')
const direccion = document.querySelector('.direccion')
const btnAgregarTarea = document.querySelector('.btn-agregar-tareas')


const listadoTareas = document.querySelector('.listado-tareas')

const db = window.localStorage

btnAgregarTarea.oneclick = () => {
let contacto = {
 id: Math.random(1,100),
nombre: nombre.value,
numero: numero.value,
direccion: direccion.value,
}
console.log(contacto)
}