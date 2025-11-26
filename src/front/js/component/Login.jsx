import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { store, actions } = useContext(Context)

  return (
    <>
      <form onSubmit={actions.handleSubmitLogin} className='w-50 mx-auto my-5'>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input
            className='form-control'
            type='text'
            name='email'
            id='email'
            placeholder='Email'
            autoComplete='email'
            value={store.loginUser.email}
            onChange={actions.handleChangeLogin}>
          </input>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>Contraseña</label>
          <input
            className='form-control'
            type='password'
            name='password'
            id='password'
            placeholder='Contraseña'
            value={store.loginUser.password}
            onChange={actions.handleChangeLogin}>
          </input>
        </div>
        <button className='btn btn-primary w-100'>Login</button>
        <div className="d-flex justify-content-center my-2">
          <Link to="/forgotpassword" className="link-opacity-10-hover">Olvidé mi contraseña</Link>
        </div>
      </form>
    </>
  );
}

export default Login;

