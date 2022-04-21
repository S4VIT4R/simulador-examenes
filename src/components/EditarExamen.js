import React,{useEffect,useState} from 'react'
import {idExamen, titleExa} from "./CardExamenDocente";
import {useNavigate} from "react-router-dom";
import {db, collections, getDoc} from "../firebase";
import CardPregunta from './CardPregunta';
import NavBar from './NavBar'


// export var listaRespuestas = []

function EditarExamen(props) {
    
    const [preguntas, setPreguntas] = useState([])


    const navigate = useNavigate();

    useEffect(() => {
        const recuperarPreguntas = async() =>{
            try {
                const datosCompletos = []
                const querySnapshot = await getDoc(collections(db,'Examenes'))
                querySnapshot.forEach((doc) => {
                    if(doc.id === idExamen) datosCompletos.push({...doc.data(),id:doc.id})
                })

                const pregunta = []
                for(var i=0; i<datosCompletos.length; i++){
                    var preguntaList = {};
                    var idExamennn = datosCompletos[i].id;
                    // console.log(idExamennn);
                    var longitud = datosCompletos[i].examen.length;
                    // console.log(longitud);
                    // // console.log(longitud);
                    // pregunta.push(idExamennn);
                    for(var x=1; x < longitud; x++){
                        var id = datosCompletos[i].examen[x].id;
                        // console.log(idPreguntaaa);
                        preguntaList = datosCompletos[i].examen[x].pregunta;
                        pregunta.push({id, idExamennn, preguntaList})
                    }
                }
                // console.log('Hola');
                
                setPreguntas(pregunta);
            } catch (error) {
                console.log(error);
            }
        }

        recuperarPreguntas()
    },[preguntas])
    // console.log(preguntas);

    const salir = () =>{
        navigate('/examenes');
    }

    const agregar = () => {
        navigate('/agregarpregunta');
    }

  return (
    <div className='bg-slate-300 w-full overflow-y-auto overflow-y-scroll'>
        <NavBar userName={props.userName}></NavBar>
        {/* AGREGAR DIV CON BARRA DESPLAZABLE */}
        <div className='bg-pastel-50 w-3/4 h-9/10 m-auto mt-5 shadow rounded'>
            <div className='border border-2px h-9 bg-white flow-root'>
                {/* AQUITAR LABEL NOMBRE DEL ALUMNO */}
                {/* <label className='font-serif ml-2 text-sm mr-80'>Alumno: {props.userName}</label> */}
                <label className='font-bold ml-2 text-xl ml-10'>{titleExa}</label>
                {/* QUITAR BOTONES Y AGREGAR UN BOTÓN DE AGREGAR PREGUNTA */}
                <button onClick={salir} className='float-right mr-1'>
                    <svg className="h-8 w-8 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/> <line x1="9" y1="9" x2="15" y2="15" />  <line x1="15" y1="9" x2="9" y2="15" /></svg>
                </button>
                {/* <button className='float-right'>
                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />  <circle cx="12" cy="14" r="2" />  <polyline points="14 4 14 8 8 8 8 4" /></svg>
                </button> */}
                <button className='float-right mr-1' onClick={agregar}>
                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
                </button>
            </div>
            <div style={{padding: '15px'}}>
            {
                // AGREGAR 2 BOTONES, ELIMINAR Y EDITAR
                preguntas.map((element) => {
                    return(
                        <CardPregunta
                        key= {element.id} 
                        idd= {element.id}
                        idExamen = {element.idExamennn}
                        titlePreg={element.preguntaList}
                        />
                        // <div key={index}>
                        //     <label className='font-serif ml-2 text-xl'>{element.pregunta}</label>
                        //     <br></br>
                        // </div>
                    )
                })
                }
            </div>
        </div>
    </div>
  )
}

export default EditarExamen