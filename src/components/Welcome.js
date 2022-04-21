import React from "react";
import './Welcome.css';

var image = '';

function Welcome({us,nam}){
    if(us === 'Alumno'){
        image="https://gstatic.com/classroom/themes/img_backtoschool.jpg";
    }else{
        image="https://gstatic.com/classroom/themes/Writing.jpg";
    }

    return(
        <div className="welcome-content">
            <img src={image} className="welcome-image"/>
                    <h2>BIENVENIDO!</h2>
                <div className="user">
                    <h3>{us}: {nam}</h3>
                </div>
        </div>

    )
}

export default Welcome