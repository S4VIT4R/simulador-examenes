import React from 'react'
import NavBarAlumno from "./NavBarAlumno";

function Editar(props) {
  return (
    <div className='w-full'>
      <NavBarAlumno userName={props.userName}></NavBarAlumno>
      <h1 className='text-center font-bold mt-12'>Editar Datos</h1>
    </div>
  )
}

export default Editar