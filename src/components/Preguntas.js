import React,{useEffect,useState} from 'react'
import {idExamen, titleExa} from "./CardExamenes";
import {useNavigate} from "react-router-dom";
import {db, collections, getDoc} from "../firebase";

export var cantidadCorrectas = ''

function Preguntas(props) {
    
    const resp = {
        pregunta1: '',
        pregunta2: '',
        pregunta3: '',
        pregunta4: '',
        pregunta5: ''
    }

    const [preguntas, setPreguntas] = useState([])
    const [respuestas, setRespuestas] = useState(resp)

    const navigate = useNavigate();

    useEffect(() => {
        const recuperarPreguntas = async() =>{
            try {
                const datosCompletos = []
                const querySnapshot = await getDoc(collections(db,'Examenes'))
                querySnapshot.forEach((doc) => {
                    if(doc.id === idExamen){
                        datosCompletos.push({...doc.data(),id:doc.id})
                    } 
                })

                const pregunta = []
                for(var i=0; i<datosCompletos.length; i++){
                    var longitud = datosCompletos[i].examen.length
                        for(var x=1; x < longitud; x++){
                            pregunta.push(datosCompletos[i].examen[x])
                        }
                }

                for (let i = pregunta.length - 1; i > 0; i--) {
                    let indiceAleatorio = Math.floor(Math.random() * (i + 1));
                    let temporal = pregunta[i];
                    pregunta[i] = pregunta[indiceAleatorio];
                    pregunta[indiceAleatorio] = temporal;
                }

                const revueltas = []
                for(var z =0; z<5; z++){
                    revueltas.push(pregunta[z]);
                }

                setPreguntas(revueltas);
            } catch (error) {
                console.log(error);
            }
        }

        recuperarPreguntas()
    },[])
   

    const salir = () =>{
        navigate('/responderexamen');
    }

    const guardar = () =>{
        var correctas = 0;
        for(var i = 0; i<preguntas.length; i++){
            if(i === 0){
               if(preguntas[i].correcta === respuestas.pregunta1){
                   correctas++;
               }
            }else if(i===1){
                if(preguntas[i].correcta === respuestas.pregunta2){
                    correctas++;
                }
            }else if(i===2){
                if(preguntas[i].correcta === respuestas.pregunta3){
                    correctas++;
                }
            }else if(i===3){
                if(preguntas[i].correcta === respuestas.pregunta4){
                    correctas++;
                }
            }else if(i===4){
                if(preguntas[i].correcta === respuestas.pregunta5){
                    correctas++;
                }
            }
           
        }
        
        cantidadCorrectas = correctas
        navigate('/examenresultado')
    }

    const handleOnChange = e => {
        const {name, value} = e.target;
        setRespuestas({...respuestas, [name]: value})
    }

  return (
    <div className='bg-slate-300 w-full'>
        <div className='bg-green-200 w-3/4 h-9/10 m-auto mt-5 shadow rounded'>
            <div className='border border-2px h-9 bg-white flow-root'>
                <label className='font-serif ml-2 text-lg mr-80'>Alumno: {props.userName}</label>
                <label className='font-bold ml-10 text-xl'>{titleExa}</label>
                <button onClick={salir} className='float-right'>
                    <svg className="h-8 w-8 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/> <line x1="9" y1="9" x2="15" y2="15" />  <line x1="15" y1="9" x2="9" y2="15" /></svg>
                </button>
                <button onClick={guardar} className='float-right'>
                    <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />  <circle cx="12" cy="14" r="2" />  <polyline points="14 4 14 8 8 8 8 4" /></svg>
                </button>
            </div>
            <div>
            {   
                preguntas.map((element, index) => {
                    console.log(element.codigo)
                    return(
                        <div key={element.codigo}>
                            <label className='font-serif ml-2 text-xl'>{element.pregunta}</label>
                            <br></br>
                            <label className='mx-2'>
                            <input onChange={handleOnChange} type="radio" name={'pregunta'+(index+1)} value={element.opcion1}/>{element.opcion1}
                            </label>
                            <br></br>
                            <label className='mx-2'>
                            <input onChange={handleOnChange} type="radio" name={'pregunta'+(index+1)} value={element.opcion2}/>{element.opcion2}
                            </label>
                            <br></br>
                            <label className='mx-2'>
                            <input onChange={handleOnChange} type="radio" name={'pregunta'+(index+1)} value={element.opcion3}/>{element.opcion3}
                            </label>
                            <br></br>
                        </div>
                    )
                })
            }
            </div>
        </div>
    </div>
  )
}

export default Preguntas