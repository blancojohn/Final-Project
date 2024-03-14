import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

const ForgotPassword = () => {
    const { store, actions } = useContext(Context)

    return (
        <form onSubmit={actions.handleSubmitForgotPassword} className='w-50 mx-auto my-5'>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input className='form-control' type='text' name='email' id='email' placeholder='Email' value={store.email} onChange={actions.handleChangeForgotPassword}></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Nueva Contraseña</label>
                <input className='form-control' type='password' name='password' id='password' placeholder='Escribir Nueva Contraseña' value={store.password} onChange={actions.handleChangeForgotPassword}></input>
            </div>
            <button className='btn btn-primary w-100'>Restablecer Contraseña</button>
        </form>
    );
}

export default ForgotPassword;

