import React, {useState} from 'react';
import './GenerarExamen.css';
import {useNavigate} from "react-router-dom";
import {db, collections, addDocs} from "../firebase";
import Swal from 'sweetalert2';

function limpiar(){
 document.getElementById("pregunta").value="";
 document.getElementById("1").value="";
 document.getElementById("2").value="";
 document.getElementById("3").value="";
 document.getElementById("correcta").value="";
}
var contador = 0;
var contadorPregunta = 0;
var examen = [
        
]

function GenerarExamen(props) {
    
    const navigate = useNavigate();
    const valoresIniciales = {
        id: '',
        pregunta: '',
        opcion1: '',
        opcion2: '',
        opcion3: '',
        correcta: '',
    }

    const [values, setValues] = useState(valoresIniciales);
    const [usuario, setUsuario] = useState(null);
    const [title, setTitle] = useState();


    const handleSubmit = async() => {
      examen = []
      contador = 0;
      contadorPregunta = 0;
      navigate('/examenes');      
    }

    const handleChange = e =>{
        const {name, value} = e.target;
        console.log(name);
        console.log(value);
        setValues({...values, [name]: value});
    }


    const guardar = () => {
          var d = new Date().getTime();
          var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r && 0x3 | 0x8)).toString(16);
          });
          console.log('IDD')
          console.log(uuid)
          values.id = uuid;


        if(contador===0){
            examen.push({usuario,title})
            examen.push(values);
            contador++;
            contadorPregunta++;
            console.log(contadorPregunta)
        }else{
            examen.push(values)
            contador++;
            contadorPregunta++;
            console.log(contadorPregunta)
        }
        limpiar();
        
      console.log(examen);
      console.log(contador);
    }

    const handleChangeTitleAndUser = e => {
        setUsuario(props.userName);
        setTitle(e.target.value);
    }

    const handleSubmitGuardar = async() =>{
        console.log(contadorPregunta)
        if(contadorPregunta>=5){
          try {
            Swal.fire({
              icon: 'success',
              text: 'Examen Guardado',
            })
            await addDocs(collections(db, "Examenes"), {
                examen
               });
            navigate('/examenes')
          } catch (error) {
            console.log(error.message);
          }
        }else{
          Swal.fire({
            icon: 'error',
            text: 'La cantidad de preguntas mínimo deben ser 5, usted ha registrado ' + contadorPregunta,
          })
        }
    }


  return (
    <section className='form-register'>

      <p className='mb-4 font-serif text-2xl'>Ingrese el titulo del examen</p>
      <input onChange={handleChangeTitleAndUser} className='controls' type='text' name='title' id='title' placeholder='Ingrese el titulo del examen'/>
      <p className='mb-3'>Escriba la pregunta</p>
      <input onChange={handleChange} className='controls' type='text' name='pregunta' id='pregunta' placeholder='Ingrese la pregunta'/>
      <p className='mb-3'>Indique las posibles respuestas</p>
      <input onChange={handleChange} className='controls' type='text' name='opcion1' id='1' placeholder='Opcion 1'/>
      <input onChange={handleChange} className='controls' type='text' name='opcion2' id='2' placeholder='Opcion 2'/>
      <input onChange={handleChange} className='controls' type='text' name='opcion3' id='3' placeholder='Opcion 3'/>

      <p className='mb-3 mt-0'>Seleccione la respuesta correcta</p>
      <input onChange={handleChange} className='controls' type='text' name='correcta' id='correcta' placeholder='Correcta'/>

     <div className='flex items-center'>
     <button className='botons sepa btn btn-primary' onClick={guardar} >Siguiente Pregunta</button>
     <button className='botons sepa btn btn-primary' onClick={handleSubmitGuardar} >Guardar</button>
     <button className='botons btn btn-primary col-md-6' onClick={handleSubmit}>Salir</button>
     </div>
    </section>

    
  
  );
}

export default GenerarExamen