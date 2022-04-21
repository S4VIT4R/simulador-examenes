import React from 'react'
import {Link} from "react-router-dom";

function NavBarAlumno(props) {
  return (
    <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <Link to='/homealumno'>
                    <img src='./user1.png' width='40' alt=''></img>
                </Link>
                <label className='text-white mt-3.5 mx-1'>{props.userName}</label>
                <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                    <div className='collapse navbar-collapse' id="navbarNav">
                        <ul className='navbar-nav mx-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link mx-6 text-white' to='/homealumno'>Inicio</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mx-6 text-white' to='/responderexamen' >Examenes</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link text-white' to='/editar'>Resultados</Link>
                            </li>
                        </ul>
                    </div>
                <label className='text-white mx-2'>Cerrar Sesión</label>
                <Link to='/'>
                    <img src='./logout.png' width='40' alt=''></img>
                </Link>
            </div>
        </nav>
    </div>
  )
}

export default NavBarAlumno