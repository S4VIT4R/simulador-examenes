import React from "react";
import "./CardPregunta.css";
import { db, collections, getDoc, setDocs, docs } from "../firebase";
import {useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import "./EditarExamen";

export var idExamenn = "";
export var idPregunta = "";
export var titlePregunta = "";

function CardPregunta({idd, idExamen, titlePreg }) {
  const navigate = useNavigate();

  const imprimir = () => {
    idPregunta = idd;
    idExamenn = idExamen;
    navigate('/editarpregunta')
  };

  const eliminar = async () => {
    idExamenn = idExamen;
    idPregunta = idd;

    // var flag = false;
    // console.log(idExamenn);
    var idRecuperado = "";
    try {
      const datosCompletos = [];
      const querySnapshot = await getDoc(collections(db, "Examenes"));
      querySnapshot.forEach((doc) => {
        if (doc.id === idExamenn) {
          datosCompletos.push(doc.data());
          console.log(datosCompletos);
          idRecuperado = doc.id;
        }
      });

      if (window.confirm("¿Está seguro que desea eliminar la pregunta?")) {
        const examen = doc(db, "Examenes", idExamenn);
        await deleteDoc(examen);
      }

      var examen = [];
      var longitud = datosCompletos[0].examen.length;
      console.log(longitud);
      for (var y = 0; y < longitud; y++) {
        if (y === 0) {
          var title = datosCompletos[0].examen[y].title;
          var usuario = datosCompletos[0].examen[y].usuario;
          examen.push({ title, usuario });
        } else {
          console.log(idPregunta);
          console.log(datosCompletos[0].examen[y].id);
          if (idPregunta === datosCompletos[0].examen[y].id) {
            console.log("Eliminado");
          } else {
            console.log("Agregado");
            var id = datosCompletos[0].examen[y].id;
            var pregunta = datosCompletos[0].examen[y].pregunta;
            var opcion1 = datosCompletos[0].examen[y].opcion1;
            var opcion2 = datosCompletos[0].examen[y].opcion2;
            var opcion3 = datosCompletos[0].examen[y].opcion3;
            var correcta = datosCompletos[0].examen[y].correcta;
            examen.push({ id, pregunta, opcion1, opcion2, opcion3, correcta });
          }
          // console.log(y);
          // console.log(testUpdate);
        }
      }

      console.log(examen);
      const ref = docs(db, "Examenes", idRecuperado);
      await setDocs(ref, {
        examen,
      });
      // navigate('/examenes');

      // firebase.firestore().collection("libros").add({title: "De ratones y hombres",})
      // testUpdate = []
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-titlee">
      <div className="card-cuestions">
        <b>
          <p>{titlePreg}</p>
        </b>
        <div className="buttonsDocente">
          <button className="btnedit" onClick={imprimir}>
            <img src={"./editar.png"} />
          </button>
          <button className="btnedit"onClick={eliminar}>
              <img src={"./eliminar.png"} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardPregunta;