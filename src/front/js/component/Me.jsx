import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';


const Me = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        if (store?.access_token !== null) actions.routePrivateUser()
    }, [])
    return (
        <>
            <h1>Mi Cuenta</h1>
        </>
    )
}

export default Me