import React, { useState } from "react";
import {db, collections, addDocs, getDoc} from "./firebase";
import {Route, Routes,useNavigate} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import HomeDocente from "./components/HomeDocente";
import HomeAlumno from "./components/HomeAlumno";
import Resultados from "./components/Resultados";
import Examenes from "./components/Examenes";
import ResponderExamen from "./components/ResponderExamen";
import Editar from "./components/Editar";
import GenerarExamen from "./components/GenerarExamen";
import Preguntas from "./components/Preguntas";
import ExamenResultado from "./components/ExamenResultado";
import Welcome from "./components/Welcome";
import EditarExamen from "./components/EditarExamen";
import EditarPregunta from "./components/EditarPregunta";
import AgregarPregunta from "./components/AgregarPregunta";


//VERIFICAR CAMBIOS

export var name = '';

function App() {



  const [notificacion, setNotificacion] = useState();
  const [userName, setUserName] = useState();
  const [notificacionSesion, setNotificacionSesion] = useState();
  const [bienvenido, setBienvenido] = useState();
  const navigate = useNavigate();

  const addUserFirebase = async(user) => {
    const usuariosFB = [];
    const querySnapshot = await getDoc(collections(db, "Usuarios"));
    querySnapshot.forEach((doc) => {
      usuariosFB.push(doc.data().user);
      }
      );

      var existeUser = 0;

      for(var i = 0; i<usuariosFB.length; i++){
        if(usuariosFB[i].usuario === user.usuario){
            existeUser = 1;
            break;
        }else{
            existeUser=0;
        }
      }

      if(existeUser===1){
        setNotificacion('Usuario Existente');
      }

      if(existeUser === 0){
        try {
          await addDocs(collections(db, "Usuarios"), {
            user
           });
           setBienvenido('!BIENVENIDO! ' + user.tipoUsuario  + ' ' + user.nombre);
           setUserName(user.nombre);
           name = user.nombre;
           if(user.tipoUsuario === 'Docente'){
             navigate('/homedocente');
           }

           if(user.tipoUsuario === 'Alumno'){
             navigate('/homealumno');
           }
        } catch (error) {
        }
      }
  }


  const validarLogin = async(user) => {
    const array = [];
    const querySnapshot = await getDoc(collections(db, "Usuarios"));
    querySnapshot.forEach((doc) => {
      array.push(doc.data().user);
      }
      );

      var contadorDocente = 0;
      var contadorAlumno = 0;
      var contadorN = 0; 
      for(var i = 0; i<array.length; i++){
        if(array[i].usuario === user.usuario && array[i].password === user.password){
          if(array[i].tipoUsuario === 'Docente'){
            contadorDocente++;
            setBienvenido(<Welcome us={array[i].tipoUsuario} nam={array[i].nombre}/>);
            setUserName(array[i].nombre);
            name = array[i].nombre;
          }else if(array[i].tipoUsuario === 'Alumno'){
            contadorAlumno++;
            setUserName(array[i].nombre);
            name = array[i].nombre;
            setBienvenido(<Welcome us={array[i].tipoUsuario} nam={array[i].nombre}/>);
          }
        }else{
          contadorN++;
        }
      }

      if(contadorDocente>0){
       navigate('/homedocente');
       setNotificacionSesion('');
      }else if(contadorAlumno>0){
        navigate('/homealumno');
        setNotificacionSesion('');
      }else if(contadorN>0){
        setNotificacionSesion('Usuario y contraseña incorrectos');
        navigate('/');
      }
  }

  return (
    <div className='bg-slate-300 h-screen text-black flex'>
      <Routes>
          <Route path='/' element={<Login validarLogin={validarLogin} notificacionSesion={notificacionSesion}/>}></Route>
          <Route path='/register' element={<Register addUserFirebase={addUserFirebase} notificacion={notificacion} setNotificacion={setNotificacion}/>}></Route>
          <Route path='/homedocente/*' element={<HomeDocente userName={userName} bienvenido={bienvenido}/>}></Route>
          <Route path='/homealumno/*' element={<HomeAlumno userName={userName} bienvenido={bienvenido}/>}></Route>
          <Route path='/examenes/*' element={<Examenes userName={userName}></Examenes>}></Route>
          <Route path='/resultados' element={<Resultados userName={userName}></Resultados>}></Route>
          <Route path='/responderexamen/*' element={<ResponderExamen userName={userName}></ResponderExamen>}></Route>
          <Route path='/editar' element={<Editar userName={userName}></Editar>}></Route>
          <Route path='/generarExamen' element={<GenerarExamen userName={userName}/>}></Route>
          <Route path='/preguntas' element={<Preguntas  userName={userName}/>}></Route>
          <Route path='/editarExamen/*' element={<EditarExamen userName={userName}></EditarExamen>}></Route>
          <Route path='/examenresultado' element={<ExamenResultado userName={userName}/>}></Route>
          <Route path='/editarpregunta' element={<EditarPregunta/>}></Route>
          <Route path='/agregarpregunta' element={<AgregarPregunta/>}></Route>
      </Routes>
    </div>
  )
}

export default App
