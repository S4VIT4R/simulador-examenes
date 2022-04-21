import React from 'react'
import { useNavigate } from 'react-router-dom';
import {cantidadCorrectas} from "./Preguntas";
import './ExamenResultado.css'

function ExamenResultado(props) {

    const navigate = useNavigate()
    const salir = () =>{
        navigate('/responderexamen');
    }
    
  return (
      
    <div className='content-result'>
        <div className='bg-transparent w-50 m-auto shadow rounded'>
            <div className='bg-white flow-root text-center'>
                <label className='font-serif p-1 text-center text-lg'>Alumno: {props.userName}</label>
                <button onClick={salir} className='float-right mr-1'>
                    <svg className="h-8 w-8 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/> <line x1="9" y1="9" x2="15" y2="15" />  <line x1="15" y1="9" x2="9" y2="15" /></svg>
                </button>
            </div>            
            <div className='text-center flow-root'>
                 <label className='result-resp'>!Obtuviste {cantidadCorrectas} respuestas correctas de 5 preguntas!</label>                
            </div>            
            <div className='w-full  content-center h-full'>
                {
                    cantidadCorrectas === 1 && <div className='img-result'><img src='./1buena.jpg' alt='' width='400'></img></div>
                }
                {
                    cantidadCorrectas === 2 && <div className='img-result'><img src='./2buenas.jpg' alt='' width='400'></img></div>
                }
                {
                    cantidadCorrectas === 3 && <div className='img-result'><img src='./3buenas.jpg' alt='' width='400'></img></div>
                }
                {
                    cantidadCorrectas === 4 && <div className='img-result'><img src='./4buenas.jpg' alt='' width='400'></img></div>
                }
                {
                    cantidadCorrectas > 4 && <div className='img-result'><img src='./5buenas.jpg' alt='' width='400'></img></div>
                }
            </div>
        </div>
    </div>
  )
}

export default ExamenResultado