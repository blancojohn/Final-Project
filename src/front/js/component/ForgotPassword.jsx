import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const ForgotPassword = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // encuentra el ID del usuario por email
        actions.findUserIdByEmail(email).then(() => {
          
            actions.handleSubmitForgotPassword({ email, password });
        });
    };

    return (
        <form onSubmit={handleSubmit} className='w-50 mx-auto my-5'>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input
                    className='form-control'
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Email'
                    value={email}
                    onChange={handleChange}
                ></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Nueva Contraseña</label>
                <input
                    className='form-control'
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Escribir Nueva Contraseña'
                    value={password}
                    onChange={handleChange}
                ></input>
            </div>
            <button className='btn btn-primary w-100'>Restablecer Contraseña</button>
        </form>
    );
};

export default ForgotPassword;
