import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { Navigate } from 'react-router-dom';


const Register = ({ setResgistration }) => {
    const { store, actions } = useContext(Context);
    if (!!store.user) return <Navigate to="/" replace />

    useEffect(() => {
        const registeredUser = store.registerUser.is_active; // boloeano que cambia true si la persona se registra.
        if (registeredUser === true) {
            setResgistration(false); //Para que se renderice el formulario de login, solo si el registro fué exitoso.
            actions.handleSetIs_active(); //Para que no redirija al usuario a hacer Login unicamente cuando no inicia sesión luego de registrarse.
        };
    }, [store.registerUser.is_active, setResgistration]);

    return (
        <form onSubmit={actions.handleSubmitRegister} className='w-50 mx-auto my-5'>

            <div
                className='mb-3'>
                <label
                    htmlFor='name'
                    className='form-label'>
                    Nombre
                </label>
                <input
                    className='form-control'
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Nombre'
                    autoComplete='name'
                    value={store.registerUser.name || ''} // operador lógico y string vacío eliminan warning de entradas controladas
                    onChange={actions.handleChangeRegister}>
                </input>
            </div>

            <div className='mb-3'>
                <label
                    htmlFor='email'
                    className='form-label'>
                    Email
                </label>
                <input
                    className='form-control'
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Email'
                    autoComplete='email'
                    value={store.registerUser.email || ''} // operador lógico y string vacío eliminan warning de entradas controladas
                    onChange={actions.handleChangeRegister}>
                </input>
            </div>

            <div
                className='mb-3'>
                <label
                    htmlFor='password'
                    className='form-label'>
                    Contraseña
                </label>
                <input
                    value={store.registerUser.password || ''} // operador lógico y string vacío eliminan warning de entradas controladas
                    onChange={actions.handleChangeRegister}
                    className='form-control'
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Contraseña' >
                </input>
            </div>

            <button
                className='btn btn-primary w-100'>
                Registrarse
            </button>

        </form>
    );
}

export default Register
