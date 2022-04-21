import React,{useState, useEffect} from 'react'
import './EditarPregunta.css';
import {useNavigate} from "react-router-dom";
import {idExamenn,idPregunta} from "./CardPregunta";
import { db, collections, getDoc, setDocs, docs,} from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

function EditarPregunta() {
    
    const [pregunta, setPregunta] = useState([])
    const valoresIniciales = {
        pregunta: '',
        opcion1: '',
        opcion2: '',
        opcion3: '',
        correcta: '',
    }


    const [values, setValues] = useState(valoresIniciales);

    useEffect(() => {
        const recuperarDatos = async() => {
           try {
                const datosCompletos = []
                const querySnapshot = await getDoc(collections(db, "Examenes"));
                querySnapshot.forEach((doc) =>{
                    if (doc.id === idExamenn) {
                        datosCompletos.push(doc.data());
                        console.log(datosCompletos);
                    }
                })

                var preguntaM = [];
                var longitud = datosCompletos[0].examen.length;

                for(var i=1; i<longitud; i++){
                    if(datosCompletos[0].examen[i].id === idPregunta){
                        var id = datosCompletos[0].examen[i].id;
                        var pregunta = datosCompletos[0].examen[i].pregunta;
                        var opcion1 = datosCompletos[0].examen[i].opcion1;
                        var opcion2 = datosCompletos[0].examen[i].opcion2;
                        var opcion3 = datosCompletos[0].examen[i].opcion3;
                        var correcta = datosCompletos[0].examen[i].correcta;
                        preguntaM.push({id,pregunta,opcion1,opcion2,opcion3,correcta})
                        break;
                    }
                }

                setPregunta(preguntaM);
           } catch (error) {
               console.log(error)
           }
        }
        recuperarDatos();
    },[pregunta])

    const navigate = useNavigate()

    const salir = () =>{
        navigate('/editarexamen')
    }

    const guardar = async() => {
        try {
                var idRecuperado = "";
                const datosCompletos = [];
                const querySnapshot = await getDoc(collections(db, "Examenes"));
                querySnapshot.forEach((doc) => {
                if (doc.id === idExamenn) {
                    datosCompletos.push(doc.data());
                    console.log(datosCompletos);
                    idRecuperado = doc.id;
                }
                });

                if (window.confirm("¿Está seguro que desea editar la pregunta?")) {
                    const examen = doc(db, "Examenes", idExamenn);
                    await deleteDoc(examen);
                }

                var examen = [];
                var longitud = datosCompletos[0].examen.length;

                for(var x = 0; x < longitud; x++){
                    if(x === 0){
                        var title = datosCompletos[0].examen[0].title;
                        var usuario = datosCompletos[0].examen[0].usuario;
                        examen.push({title,usuario})
                    }else{
                        if(datosCompletos[0].examen[x].id === idPregunta){
                            var id = idPregunta;
                            var pregunta = values.pregunta;
                            var opcion1 = values.opcion1;
                            var opcion2 = values.opcion2;
                            var opcion3 = values.opcion3;
                            var correcta = values.correcta;
                            examen.push({id,pregunta,opcion1,opcion2,opcion3,correcta})
                        }else{
                            id = datosCompletos[0].examen[x].id;
                            pregunta = datosCompletos[0].examen[x].pregunta;
                            opcion1 = datosCompletos[0].examen[x].opcion1;
                            opcion2 = datosCompletos[0].examen[x].opcion2;
                            opcion3 = datosCompletos[0].examen[x].opcion3;
                            correcta = datosCompletos[0].examen[x].correcta;
                            examen.push({id,pregunta,opcion1,opcion2,opcion3,correcta})
                        }
                    }
                }

                const ref = docs(db, "Examenes", idRecuperado);
                await setDocs(ref, {
                examen,
                });

                navigate('/editarexamen')

        } catch (error) {
            console.log(error)
        }
    }
    const handleOnChange = e => {
        const {name,value} = e.target;
        setValues({...values, [name]: value})
    }

  return (
    <section className='form-register'>
        {
            pregunta.map((element, index)=>{
                return(
                    <div key={index} className='mt-0'>
                        <label className='mt-3'>Pregunta actual: {element.pregunta}</label>
                        <input onChange={handleOnChange} className='controls' type='text' name='pregunta' id='pregunta' placeholder='Ingresa la nueva pregunta' />
                        
                        <label >Opcion1 actual: {element.opcion1}</label>
                        <input onChange={handleOnChange} className='controls' type='text' name='opcion1' id='1' placeholder='Ingresa la nueva opcion 1' />
                        <label>Opcion2 actual: {element.opcion2}</label>
                        <input onChange={handleOnChange} className='controls' type='text' name='opcion2' id='2' placeholder='Ingresa la nueva  opcion 2' />
                        <label>Opcion3 actual: {element.opcion3}</label>
                        <input onChange={handleOnChange} className='controls' type='text' name='opcion3' id='3' placeholder='Ingresa la nueva opcion 3' />

                        
                        <label className='mt-2'>Respuesta correcta actual: {element.correcta}</label>
                        <input onChange={handleOnChange} className='controls' type='text' name='correcta' id='correcta' placeholder='Ingresa la nueva respuesta correcta'/>

                        <div className='flex items-center'>
                        <button onClick={guardar} className='botons sepa btn btn-primary'>Guardar</button>
                        <button onClick={salir} className='botons btn btn-primary col-md-6'>Salir</button>
                        </div>
                    </div>
                )
            })
        }
  </section>
  )
}

export default EditarPregunta