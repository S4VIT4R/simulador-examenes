import React from "react";
import './CardDocente.css'
import { Link } from "react-router-dom";
import {db} from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

export var idExamen = '';
export var titleExa = '';


function CardExamenDocente({id,title,imageUrl}){
    const imprimir = () =>{
        idExamen = id;
        titleExa = title;
        // console.log(id);
    }
    
    const eliminar = async() => {
        idExamen = id;
        try {
            if(window.confirm('¿Está seguro que desea eliminar el examen?')){
                const examen = doc(db, 'Examenes',idExamen);
                await deleteDoc(examen);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="mb-3">
            <div className="card-container">
            <div className="card-title-exam"><h3>{title}</h3></div>
            <div className="image-exam-docente"><img src={imageUrl} alt='' className="imagenExamen"/></div>
                <div className="mitad-exa">
                     <div className="btn">
                         <button onClick={imprimir}><Link to='/EditarExamen'>
                            <svg className="h-8 w-8 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg></Link>
                        </button>
                        <button><Link onClick={eliminar} to='./examenes'>
                            <svg className="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg></Link></button>
                     </div>
                     <div/>
                </div>
            </div>
        </div>
    )
}

export default CardExamenDocente;