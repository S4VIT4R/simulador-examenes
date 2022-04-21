import React from 'react'
import NavBarAlumno from './NavBarAlumno'
import ResponderExamen from './ResponderExamen'
import Editar from "./Editar";
import { Route, Routes } from 'react-router-dom';


function HomeAlumno(props) {

   
    
  return (
    <div className='w-full'>
        <NavBarAlumno userName={props.userName}></NavBarAlumno>
      <Routes>
        <Route path='/homealumno' element={<HomeAlumno></HomeAlumno>} component={HomeAlumno}></Route>
        <Route path='/responderexamen' element={<ResponderExamen></ResponderExamen >} component={ResponderExamen}></Route>
        <Route path='/editar' element={<Editar></Editar>} component={Editar}></Route>
      </Routes>
        <h1 className='text-center font-bold mt-12'>{props.bienvenido}</h1>
    </div>
  )
}

export default HomeAlumno