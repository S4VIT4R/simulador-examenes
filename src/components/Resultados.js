import React from 'react'
import NavBar from './NavBar'

function Resultados(props) {
  return (
    <div className='w-full'>
      <NavBar userName={props.userName}></NavBar>
      <h1 className='text-center font-bold mt-12'>Resultados</h1>
    </div>
  )
}

export default Resultados