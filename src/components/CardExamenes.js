import React from "react";
import { Link } from "react-router-dom";
import './CardExamenes.css'

export var idExamen = '';
export var titleExa = ''



function CardExamenes({id,title,imageUrl,body}){
    
    const imprimir = () =>{
        idExamen = id;
        titleExa = title;
        console.log(id);
    }


    return(
        <div className="mb-3">
            <div className="card-container">
            <div className="card-title"><h3>{title}</h3></div>
            <div className="image-container"><img src={imageUrl}/></div>
                <div className="mitad">
                    <div className="card-content">     
                        <div className="card-body"><p className="card-title-p">Profesor:</p> <p className="card-profesor">{body}</p></div>
                    </div>
                     <div className="btn"><button onClick={imprimir}><Link to='/preguntas'>Ver examen</Link></button></div>
                </div>
            </div>
        </div>
    )
}

export default CardExamenes