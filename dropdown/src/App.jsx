import './App.css'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import {db} from './firebaseConfig/firebase'
import { useEffect, useRef, useState } from 'react'
import Create from './components/Create'

function App() {
  //configuramos el hook para 
  const [personas, setPersonas] = useState([])

//importante para crear 
const [nombre, setNombre] = useState()
const [telefono, setTelefono] = useState()
const [nit, setNit] = useState()
const [codigo, setCodigo] = useState()
const [razonSocial, setRazonSocial] = useState()
//fin crear

//hook para saber si hay cambios
const [cambio, setCambio] = useState(false)

//hook para mostrar o cerrar el popup
const [showPoppup, setShowPoppup] = useState(false)

const divRef = useRef()
const initialItem = 0
const [itemsPerPage, setItemsPerPage] = useState(5)

//esta funcion es para escuchar la posicion de nuestro escrol dentro del dify asignar un nueva cantidad de elementos a cargar
function getScrollPoistion() {
  var ContainerElement = document.getElementById("ContentContainer");
  var y = ContainerElement.scrollTop;
  if(y===129){
    setItemsPerPage(itemsPerPage*2)
  }
  if(y<129){
    setItemsPerPage(5)
  }
}


  const personasCollection =  collection(db, "dropdown")





  // funcion para llamar la coleccion y setearla en el hook personas
  const getpersonas = async () => {
    const data = await getDocs(personasCollection)
    //console.log(data.docs)
    setPersonas([...data.docs.map( (doc) => ({...doc.data(), id:doc.id}))].splice(initialItem,itemsPerPage))
    console.log(personas)
}

const addPeople = () => {
setShowPoppup(true)
}


useEffect(()=>{
  getpersonas()
}, [cambio, itemsPerPage])
console.log(personas)

  const objetos =  personas.map( (persona) => (
    <li key={persona.id}>
        <span>Nombre: <b>{persona.nombre}</b></span>
        <span>Telefono: <b>{persona.telefono}</b> </span>
        <span>NIT: <b>{persona.nit}</b></span>
        <span>Codigo: <b>{persona.codigo}</b></span>
        <span>Razon Social: <b>{persona.razonSocial}</b></span>
    </li>
  
))




  return (
    <>
      <div className={showPoppup?'ShowPopPup': 'popPup'}>
    <Create setShowPoppup={setShowPoppup} setCambio={setCambio}/>
    </div>
  <div className='nav'>
    <div className="dropdown">
    <p>Dropdown Module</p>
    <ul className="dropdown-content scroll" id="ContentContainer" onScroll={getScrollPoistion}>
  
     <button onClick={addPeople} className="btn"> Agregar Nueva Persona</button>
    
      { objetos }
    
    </ul>
    
</div>
</div>
    </>
  )
}

export default App
