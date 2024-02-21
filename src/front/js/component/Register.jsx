import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const Register = () => {
    const { store, actions } = useContext(Context)
    return (
        <form onSubmit={actions.handleSubmit} className='w-50 mx-auto my-5'>
            <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Nombre</label>
                <input className='form-control' type='text' name='name' id='name' placeholder='Nombre' value={store.registerUser.name} onChange={actions.handleChange}></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input className='form-control' type='text' name='email' id='email' placeholder='Email' value={store.registerUser.email} onChange={actions.handleChange}></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Contraseña</label>
                <input className='form-control' type='password' name='password' id='password' placeholder='Contraseña' value={store.registerUser.password} onChange={actions.handleChange}></input>
            </div>
            <button className='btn btn-primary w-100'>Registrarse</button>
        </form>
    );
}

export default Register
