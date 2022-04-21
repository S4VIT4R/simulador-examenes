import React,{useState} from 'react'
import './AgregarPregunta.css';
import {useNavigate} from "react-router-dom";
import {idExamen} from "./CardExamenDocente";
import { db, collections, getDoc, setDocs, docs,} from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

function AgregarPregunta() {
    const navigate = useNavigate()

    const valoresIniciales = {
        id: '',
        pregunta: '',
        opcion1: '',
        opcion2: '',
        opcion3: '',
        correcta: '',
    }
    const [values, setValues] = useState(valoresIniciales)

    const salir = () => {
        navigate('/editarexamen')
    }

    const handleOnChange = e => {
        const {name, value} = e.target
        setValues({...values, [name] : value})
    }

    const guardar = async() => {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r && 0x3 | 0x8)).toString(16);
        });
        values.id = uuid;

        try {
                const datosCompletos = []
                var idRecuperado = ''
                const querySnapshot = await getDoc(collections(db, "Examenes"));
                querySnapshot.forEach((doc) =>{
                    if (doc.id === idExamen) {
                        datosCompletos.push(doc.data());
                        console.log(datosCompletos);
                        idRecuperado = doc.id
                    }
                })

                if (window.confirm("¿Está seguro que desea agregar la pregunta?")) {
                    const examen = doc(db, "Examenes", idExamen);
                    await deleteDoc(examen);
                }

                var examen = [];
                var longitud = datosCompletos[0].examen.length;

                for(var i = 0; i<longitud; i++){
                    if(i===0){
                        var title = datosCompletos[0].examen[0].title;
                        var usuario = datosCompletos[0].examen[0].usuario;
                        examen.push({title,usuario})
                    }else{
                        var id = datosCompletos[0].examen[i].id;
                        var pregunta = datosCompletos[0].examen[i].pregunta;
                        var opcion1 = datosCompletos[0].examen[i].opcion1;
                        var opcion2 = datosCompletos[0].examen[i].opcion2;
                        var opcion3 = datosCompletos[0].examen[i].opcion3;
                        var correcta = datosCompletos[0].examen[i].correcta;
                        examen.push({id,pregunta,opcion1,opcion2,opcion3,correcta})
                    }
                }

                id = values.id;
                pregunta = values.pregunta;
                opcion1 = values.opcion1;
                opcion2 = values.opcion2;
                opcion3 = values.opcion3;
                correcta = values.correcta;
                examen.push({id,pregunta,opcion1,opcion2,opcion3,correcta})

                const ref = docs(db, "Examenes", idRecuperado);
                await setDocs(ref, {
                examen,
                });

                navigate('/editarexamen')
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section className='form-register'>

    <p className='mb-4'>Escriba la pregunta</p>
    <input onChange={handleOnChange} className='controls' type='text' name='pregunta' id='pregunta' placeholder='Ingrese la pregunta'/>
    <p className='mb-4'>Indique las posibles respuestas</p>
    <input onChange={handleOnChange} className='controls' type='text' name='opcion1' id='1' placeholder='Opcion 1'/>
    <input onChange={handleOnChange} className='controls' type='text' name='opcion2' id='2' placeholder='Opcion 2'/>
    <input onChange={handleOnChange} className='controls' type='text' name='opcion3' id='3' placeholder='Opcion 3'/>

    <p className='mb-4 mt-0'>Seleccione la respuesta correcta</p>
    <input onChange={handleOnChange} className='controls' type='text' name='correcta' id='correcta' placeholder='Correcta'/>

   <div className='flex items-center'>
   <button onClick={guardar} className='botons sepa btn btn-primary'>Guardar</button>
   <button onClick={salir} className='botons btn btn-primary col-md-6'>Salir</button>
   </div>
  </section>
  )
}

export default AgregarPregunta