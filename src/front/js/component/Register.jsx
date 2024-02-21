import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Context } from '../store/appContext';

const Register = () => {
    const { store, actions } = useContext(Context)
    return (
        <>
            <form onSubmit={actions.handleSubmit} className='w-25 mx-auto py-5 my-5'>
                <div className='form-group mb-3'>
                    <label htmlFor='name' className='form-label'>Nombre</label>
                    <input className='form-control' type='text' name='name' id='name' placeholder='Nombre' value={store.name} onChange={actions.handleChange}></input>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input className='form-control' type='text' name='email' id='email' placeholder='Email' value={store.email} onChange={actions.handleChange}></input>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='password' className='form-label'>Contraseña</label>
                    <input className='form-control' type='password' name='password' id='password' placeholder='Contraseña' value={store.password} onChange={actions.handleChange}></input>
                </div>
                <button className='btn btn-danger btn-sm w-100'>Register</button>
            </form>
        </>
    )
}

export default Register 
