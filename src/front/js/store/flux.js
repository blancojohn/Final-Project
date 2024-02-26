import { toast } from 'react-toastify';

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
			loginUser: {
				email: '',
				password: '',
			},
			user: null,
			access_token: null,
			isLoggedIn: false,  // esto revisa si el usuario esta logeado se cambia con un state
			currentUser: null,  // esto es para saber que usuario es el que esta logeado actualmente, aun nose como usarlo para el carrito pero ya veremos xd
			apiURL: "http://127.0.0.1:3001",
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
			handleSubmitRegister: (e) => {
				e.preventDefault()
				const { registerUser, apiURL } = getStore()

				const { getFetch } = getActions()
				const url = `${apiURL}/api/register`
				const raw = JSON.stringify(
					registerUser
				)
				const solicitud = {
					method: "POST",
					body: raw,
					headers: {
						"Content-Type": "application/json"
					}
				}
				const request = getFetch(url, solicitud)
				request.then((response) => response.json()).then((datos) => {
					if (datos.msg) {
						toast.error(datos.msg)
					} else {
						toast.success(datos.success)
						setStore({
							registerUser: {
								name: '',
								email: '',
								password: '',
								is_active: true
							}
						})
					}
					console.log(datos)
				}).catch(error => console.log(error))
			},
			handleChangeRegister: (e) => {
				const { registerUser } = getStore()
				const { name, value } = e.target
				registerUser[name] = value
				setStore({
					registerUser: registerUser
				})
			},

			handleSubmitLogin: (e) => {
				e.preventDefault()
				const { loginUser, apiURL } = getStore()

				const { getFetch } = getActions()
				const url = `${apiURL}/api/login`
				const raw = JSON.stringify(
					loginUser
				)
				const solicitud = {
					method: "POST",
					body: raw,
					headers: {
						"Content-Type": "application/json"
					}
				}
				const request = getFetch(url, solicitud)
				request.then((response) => response.json()).then((datos) => {
					if (datos.msg) {
						toast.error(datos.msg)
					} else {
						toast.success(datos.success)
						setStore({
							loginUser: {
								email: '',
								password: '',
							},
							user: datos.user,
							access_token: datos.access_token
						})
						sessionStorage.setItem('access_token', datos.access_token)
						sessionStorage.setItem('user', JSON.stringify(datos.user))
					}
					console.log(datos)
				}).catch(error => console.log(error))
			},
			handleChangeLogin: (e) => {
				const { loginUser } = getStore()
				const { name, value } = e.target
				loginUser[name] = value
				setStore({
					loginUser: loginUser
				})
			},
			checkCurrentUser: () => {
				if (sessionStorage.getItem('access_token')) {
					setStore({
						access_token: sessionStorage.getItem('access_token'),
						user: JSON.parse(sessionStorage.getItem('user'))
					})
				}
			},
			routePrivateUser: () => {
				const { apiURL, access_token } = getStore()
				const url = `${apiURL}/api/me`
				const solicitud = {
					method: 'GET',
					headers: {
						"Content-type": "application/json",
						"Authorization": `Bearer ${access_token}`
					}
				}
				fetch(url, solicitud)
					.then(response => {
						return response.json()
					})
					.then(datos => {
						if (datos.msg) toast.error(datos.msg)
						else {
							console.log(datos)
							setStore({
								user: datos
							})
						}
					})
			},
			logOut: () => {
				setStore({
					user: null,
					access_token: null,
				})

				sessionStorage.removeItem('user')
				sessionStorage.removeItem('access_token')
			},
			getFetch: (url, solicitud) => {
				return fetch(url, solicitud)
			}
		}
	};
}




export default getState;



