import React, {useState} from 'react'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../firebaseConfig/firebase'
import "./Create.css"

const Create = ({setShowPoppup, setCambio, nombre, setNombre}) => {

const [telefono, setTelefono] = useState()
const [nit, setNit] = useState()
const [codigo, setCodigo] = useState()
const [razonSocial, setRazonSocial] = useState()




const personasCollection = collection(db, "dropdown")

const close = ()=>{
    setShowPoppup(false)
}
const store = async (e) =>{
    e.preventDefault()
    await addDoc(personasCollection, {nombre, telefono, nit, codigo, razonSocial})
    setCambio(true)
}

  return (
    <div className='container'>
        <i className="fa-solid fa-square-xmark close" onClick={close}></i>
        <h1>Agregar Objeto</h1>
        <div className='row'>
                

            <form onSubmit={store}>
            <div className='mb-3'>
                
                <input
                placeholder='Nombre'
                value={nombre}
                onChange={(e)=> setNombre(e.target.value)}
                type="text"
                className='form-control'
                />
            </div>

            <div className='mb-3'>
                
                <input
                placeholder='Telefono'
                value={telefono}
                onChange={(e)=> setTelefono(e.target.value)}
                type="text"
                className='form-control'
                />
            </div>

            <div className='mb-3'>
                
                <input
                placeholder='NIT'
                value={nit}
                onChange={(e)=> setNit(e.target.value)}
                type="text"
                className='form-control'
                />
            </div>

            <div className='mb-3'>

                <input
                placeholder='Codigo'
                value={codigo}
                onChange={(e)=> setCodigo(e.target.value)}
                type="text"
                className='form-control'
                />
            </div>

            <div className='mb-3'>
                
                <input
                placeholder='Razon Social'
                value={razonSocial}
                onChange={(e)=> setRazonSocial(e.target.value)}
                type="text"
                className='form-control'
                />
            </div>

            <button type='submit' className='btn btn-guardar' onClick={close}>Guardar</button>
            </form>
            
        </div>

    </div>
  )
}

export default Create