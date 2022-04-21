import React,{useEffect, useState} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import CardExamenDocente from "./CardExamenDocente";
import GenerarExamen from './GenerarExamen'
import NavBar from './NavBar'
import {db, collections, getDoc} from "../firebase";
import {name} from "../App";


function Examenes(props) {

  const navigate = useNavigate();
  const [lista, setLista] = useState([])

  useEffect(() => {

    const obtenerExamen = async() => {
      try {
        const datosCompletos = []
        const querySnapshot = await getDoc(collections(db,'Examenes'))
        querySnapshot.forEach((doc) =>{
          datosCompletos.push({...doc.data(), id:doc.id})
        })
        
        const examen = []

        for(var i = 0; i < datosCompletos.length; i++){
          var id = datosCompletos[i].id;
          var title = datosCompletos[i].examen[0].title;
          var usuario = datosCompletos[i].examen[0].usuario;
          if(usuario === name){
            examen.push({id,title,usuario})
          }
        }

        setLista(examen)
      } catch (error) {
        console.log(error);
      }
    }
    obtenerExamen()
  },[lista])

  const handleSubmit = () => {
    navigate('/generarExamen');
  }
  return (
    <div className='w-full items-center'>
        <NavBar userName={props.userName}></NavBar>
        <Routes>
          <Route path='/generarExamen' element={<GenerarExamen/>}></Route>

        </Routes>
        <div className='w-3/4 bg-teal-500	h-3/4 m-auto mt-5 shadow rounded relative flow-root'>
          <div className='border border-2px h-9 bg-white text-center'>
              <label className='font-serif ml-2 text-2xl'>Tus exámenes</label>
            <button className='float-right' onClick={handleSubmit}>
              <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
            </button>
          </div>
          <div>
            {
              lista.map((element) =>{
                return (
                  <CardExamenDocente
                    key={element.id} 
                    id={element.id}
                    title={element.title}
                    imageUrl='./examen.jpg'
                  />
                )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default Examenes