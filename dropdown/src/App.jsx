import './App.css'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import {db} from './firebaseConfig/firebase'
import { useEffect, useRef, useState } from 'react'
import Create from './components/Create'
import InputSearch from './components/InputSearch'
import './scroll.css'

function App() {
  //configuramos el hook para 
  const [personas, setPersonas] = useState([])

//importante para crear 
const [nombre, setNombre] = useState('')
const [telefono, setTelefono] = useState('')
const [nit, setNit] = useState('')
const [codigo, setCodigo] = useState('')
const [razonSocial, setRazonSocial] = useState('')
//fin crear

const [objetos, setObjetos] = useState()

//hook para buscar en tiempo real
const [inputSearch, setInputSearch] = useState([])

//filtrar
const [filterPersonas, setFilterPersonas] = useState()

//hook para saber si hay cambios
const [cambio, setCambio] = useState(false)

//hook para mostrar o cerrar el popup
const [showPoppup, setShowPoppup] = useState(false)

const initialItem = 0
const [itemsPerPage, setItemsPerPage] = useState(5)

//esta funcion es para escuchar la posicion de nuestro escrol dentro del dify asignar un nueva cantidad de elementos a cargar
function getScrollPoistion() {
  let ContainerElement = document.getElementById("ContentContainer");
  let y = ContainerElement.scrollTop;
  let all = ContainerElement.scrollHeight



  if(y===all-300){
    setItemsPerPage(itemsPerPage+5)
  }
  
  if(y<10){
    setItemsPerPage(5)
  }
}


  const personasCollection =  collection(db, "dropdown")





  // funcion para llamar la coleccion y setearla en el hook personas
  const getpersonas = async () => {
    const data = await getDocs(personasCollection)
    //console.log(data.docs)
    setPersonas([...data.docs.map( (doc) => ({...doc.data(), id:doc.id}))].splice(initialItem,itemsPerPage))
  
}

useEffect(() => {
  setObjetos(personas)
}, [personas])


const addPeople = () => {
setShowPoppup(true)
}


useEffect(()=>{
  getpersonas()
}, [cambio, itemsPerPage])



  

//busqueda en tiempo real
useEffect(() => {

  if(inputSearch.length !== 0) {
    const filter = personas?.filter(obj => obj.nombre.toLowerCase().includes(inputSearch.toLowerCase()))
    setObjetos(filter)
    setItemsPerPage(100)
  } else {
  setObjetos(personas)
  }
}, [inputSearch])

return (
    <>
      <div className={showPoppup?'ShowPopPup': 'popPup'}>
    <Create setShowPoppup={setShowPoppup} setCambio={setCambio} nombre={nombre} setNombre={setNombre}/>
    </div>
  <div className='nav'>
    <div className="dropdown">
    <p>Dropdown Module</p>
    <ul className="dropdown-content scroll" id="ContentContainer" onScroll={getScrollPoistion}>
  
     
       <InputSearch setInputSearch={setInputSearch} setNombre={setNombre} addPeople={addPeople}/>
      
     
      {
        objetos?.map( (persona) => (
          <li key={persona.id}>
              <span>Nombre: <b>{persona.nombre}</b></span>
              <span>Telefono: <b>{persona.telefono}</b> </span>
              <span>NIT: <b>{persona.nit}</b></span>
              <span>Codigo: <b>{persona.codigo}</b></span>
              <span>Razon Social: <b>{persona.razonSocial}</b></span>
          </li>
        
      ))
      }
    
    </ul>
    
</div>
</div>
    </>
  )
}

export default App
