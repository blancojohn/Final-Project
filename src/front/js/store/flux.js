import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white",
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white",
                },
            ],
            /* objeto para registrar usuario */
            registerUser: {
                name: '',
                email: '',
                password: '',
                is_active: true,
            },
            isLoggedIn: false,  // esto revisa si el usuario esta logeado se cambia con un state
            currentUser: null,  // esto es para saber que usuario es el que esta logeado actualmente, aun nose como usarlo para el carrito pero ya veremos xd
            apiURL: "https://urban-space-doodle-wrr9g5wj496r2gp77-3001.app.github.dev",
        },
        actions: {
            /* ACCIONES */
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error cargando backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            handleSubmit: async (e) => {
                e.preventDefault();
                const { registerUser, apiURL } = getStore();
                const url = `${apiURL}/api/register`;
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(registerUser),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    toast.success("Registro Completado!"); // COLOQUE LOS TOAST AQUI PORQUE SACARLOS DEL BACKEND ME DIO DOLOR DE CABEZA
                    // Restablecer el objeto registerUser a su estado inicial
                    setStore({ registerUser: { name: '', email: '', password: '', is_active: true } });
                } else {
                    toast.error(data.msg || "Registro Fallido"); // COLOQUE LOS TOAST AQUI PORQUE SACARLOS DEL BACKEND ME DIO DOLOR DE CABEZA
                }
            },
			handleChange: (e) => {
				const { registerUser } = getStore(); 
				registerUser[e.target.name] = e.target.value; 
				setStore({
					registerUser: registerUser 
				});
			},
            login: async (email, password) => {
                const { apiURL } = getStore();
                const url = `${apiURL}/api/login`;
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setStore({
                        isLoggedIn: true,
                        currentUser: data.user,  
                    });
                    toast.success("Login exitoso"); // COLOQUE LOS TOAST AQUI PORQUE SACARLOS DEL BACKEND ME DIO DOLOR DE CABEZA
                    return true;
                } else {
                    toast.error(data.msg || "Usuario o Password son Incorrectas"); // COLOQUE LOS TOAST AQUI PORQUE SACARLOS DEL BACKEND ME DIO DOLOR DE CABEZA
                    return false;
                }
            },
            logout: () => {
                // Lógica para cerrar sesión
                setStore({
                    isLoggedIn: false,
                    currentUser: null,
                });
                toast.info("Cierre de sesión exitoso"); // COLOQUE LOS TOAST AQUI PORQUE SACARLOS DEL BACKEND ME DIO DOLOR DE CABEZA
            },
            setIsLoggedIn: (isLoggedIn) => { // esto actualiza el islogged in para poder hacer logout etc etc
                setStore({ isLoggedIn });
            },
        },
    };
};

export default getState;
