import React from 'react'

const InputSearch = ({setInputSearch, setNombre, addPeople}) => {

  const handleChange = e => {

    setInputSearch(e.target.value.trim())
    setNombre(e.target.value.trim())
    
  }
  return (
    <div className='input__search__container'>
      <h3 className='search__title'>Buscar Objeto</h3>
   
      <input className='input-search' onChange={handleChange} type='text' placeholder='Buscar objeto por nombre'/><a onClick={addPeople} className="btn"> <i className="fa-regular fa-floppy-disk" alt="Agregar nueva empresa"></i></a>

    </div>
  
  )
}

export default InputSearch