import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert';

function Register(props) {

    const navigate = useNavigate();

    const initialStateValues = {
        nombre: '',
        usuario: '',
        tipoUsuario: '',
        password: '',
    }

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
      const {name, value} = e.target;
      setValues({...values, [name]: value})
    };

    const handleSubmit = e => {
      e.preventDefault();
      props.addUserFirebase(values)
    }

    const handleClickSelect = e => {
      const {name, value} = e.target;
      setValues({...values, [name]:value})
    }

    const handleNavigate = () => {
      props.setNotificacion('');
        navigate('/');
    }

  return (
    <div className='w-full max-w-xs m-auto'>
    {props.notificacion && <Alert message={props.notificacion}></Alert>}

    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>

        <div className='mb-4 relative'>
              <label htmlFor='nombre' className='block text-gray-700 text-sm font-fold mb-2'>Nombre</label>
          <div className='relative rounded shadow-sm'>
            <div>
              <input type='text' name='nombre' placeholder='Ingresa tu nombre'
              className='shadow appearence-none border rounded w-full py-2 px-4.5 pr-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={handleInputChange}>
              </input>
            </div>
            <div className='absolute  inset-y-0  left-2 flex items-center'>
              <i className='material-icons'>person</i>
            </div>
          </div>
        </div>

        <div className='mb-4 relative'>
              <label htmlFor='usuario' className='block text-gray-700 text-sm font-fold mb-2'>Usuario</label>
          <div className='relative rounded shadow-sm'>
            <div>
              <input type='text' name='usuario' placeholder='Ingresa tu usuario'
              className='shadow appearence-none border rounded w-full py-2 px-4.5 pr-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={handleInputChange}>
              </input>
            </div>
            <div className='absolute  inset-y-0  left-2 flex items-center'>
              <i className='material-icons'>account_circle</i>
            </div>
          </div>
        </div>

        <div className='mb-4 relative'>
              <label htmlFor='tipoUsuario' className='block text-gray-700 text-sm font-fold mb-2'>Tipo de Usuario</label>
          <div className='relative rounded shadow-sm'>
            <div>
              <select name='tipoUsuario' id='tipoUsuario' onClick={handleClickSelect} className='shadow appearence-none border rounded w-full py-2 px-4.5 pr-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                <option value='Docente'>Docente</option>
                <option value='Alumno'>Alumno</option>
              </select>
            </div>
            <div className='absolute  inset-y-0  left-2 flex items-center'>
              <i className='material-icons'>group</i>
            </div>
          </div>
        </div>

        <div className='mb-4 relative'>
              <label htmlFor='password' className='block text-gray-700 text-sm font-fold mb-2'>Contraseña</label>
          <div className='relative rounded shadow-sm'>
            <div>
              <input type='password' name='password' id='password'
              placeholder='*******' className='shadow appearence-none border rounded w-full py-2 px-4.5 pr-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={handleInputChange}>
              </input>
            </div>
            <div className='absolute  inset-y-0  left-2 flex items-center'>
              <i className='material-icons'>verified_user</i>
            </div>
          </div>
        </div>

              <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full m-auto'>Registrar</button>

    </form>
        <p className='my-2 text-sm flex justify-center px-3 '>¿Ya tienes una cuenta?</p>
        <button onClick={handleNavigate} className='bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full m-auto'>Iniciar Sesión</button>
  </div>
  )
}

export default Register