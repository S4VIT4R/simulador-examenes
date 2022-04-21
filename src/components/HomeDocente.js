import React from 'react'
import NavBar from "./NavBar";
import Resultados from "./Resultados";
import {Routes, Route} from "react-router-dom";
import Examenes from './Examenes';

function HomeDocente(props) {
  
  return (
    <div className='w-full'>
        <NavBar userName={props.userName}></NavBar>
      <Routes>
        <Route path='/homedocente' element={<HomeDocente></HomeDocente>} component={HomeDocente}></Route>
        <Route path='/examenes/*' element={<Examenes></Examenes>} component={Examenes}></Route>
        <Route path='/resultados' element={<Resultados></Resultados>} component={Resultados}></Route>
      </Routes>
        <h1 className='text-center font-bold mt-12'>{props.bienvenido}</h1>
    </div>
  )
}

export default HomeDocente