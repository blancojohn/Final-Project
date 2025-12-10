import { number } from 'prop-types';
import { toast } from 'react-toastify';


const backendUrl = process.env.BACKEND_URL

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
			cartItems: [], // aqui guardamos los productos en el carrito

			registerUser: {
				name: '',
				email: '',
				password: '',
				is_active: false,
			},
			loginUser: {
				email: '',
				password: '',
			},
			forgotPasswordUser: {
				email: '',
				password: '',
			},
			user: null,
			access_token: null,
			isLoggedIn: false,  // esto revisa si el usuario esta logeado se cambia con un state
			currentUser: null,  // esto es para saber que usuario es el que esta logeado actualmente, aun nose como usarlo para el carrito pero ya veremos xd
			apiURL: backendUrl,
		},
		actions: {
			/* ACCIONES */
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.a_URL + "/api/hello");
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

			handleSetIs_active: () => {
				setStore({
					registerUser: {
						is_active: false
					}
				});
			},

			handleSubmitRegister: (e) => {
				e.preventDefault()
				const { registerUser, apiURL } = getStore()

				const { getFetch, handleSetIs_active } = getActions()
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
						getActions().getCart(); // obtener carrito
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
			handleSubmitForgotPassword: (e) => {
				e.preventDefault()
				const { forgotPasswordUser, apiURL } = getStore()
				const { getFetch } = getActions()

				const url = `${apiURL}/api/forgotpassword/${forgotPasswordUser.email}`
				const raw = JSON.stringify(
					forgotPasswordUser
				)
				const solicitud = {
					method: "PUT",
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
							forgotPasswordUser: {
								email: '',
								password: '',
							}

						})
					}
					console.log(datos)
				}).catch(error => console.log(error))
			},
			handleChangeForgotPassword: (e) => {
				const { forgotPasswordUser } = getStore()
				const { name, value } = e.target
				forgotPasswordUser[name] = value
				setStore({
					forgotPasswordUser: forgotPasswordUser
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
			addToCart: (product, quantity = 1) => {
				const { apiURL, access_token, cartItems } = getStore();
				// verifica si esque el usuario esta logeado a traves del access token
				if (!access_token) {
					toast.info("Por favor inicia sesión para añadir productos al carrito.");
					return;
				}

				// Check if product already exists in cart
				const existingCartItemIndex = cartItems.findIndex(item => item.product_id === product.id);
				if (existingCartItemIndex !== -1) {
					// Producto ya existe en el carrito, actualizar cantidad
					const url = `${apiURL}/api/cart/${cartItems[existingCartItemIndex].id}`; // Asumiendo que cada item tiene un ID único en el carrito
					const body = {
						quantity: cartItems[existingCartItemIndex].quantity + quantity,
					};

					const requestOptions = {
						method: "PUT", // Cambiar método a PUT para actualizar
						body: JSON.stringify(body),
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${access_token}`,
						},
					};

					getActions().getFetch(url, requestOptions)
						.then(response => {
							if (!response.ok) {
								throw new Error('Error al actualizar cantidad en el carrito');
							}
							return response.json();
						})
						.then(updatedCartItem => {
							getActions().getCart(); // Actualizar estado del carrito
							toast.success("Cantidad del producto actualizada en el carrito.");
						})
						.catch(error => {
							toast.error("Error al actualizar producto en el carrito.");
							console.error(error);
						});
				} else {
					// Producto no existe en el carrito, agregar como nuevo
					const url = `${apiURL}/api/cart`;
					const body = {
						product_id: product.id,
						quantity,
					};

					const requestOptions = {
						method: "POST",
						body: JSON.stringify(body),
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${access_token}`,
						},
					};

					getActions().getFetch(url, requestOptions)
						.then(response => {
							if (!response.ok) {
								throw new Error('Error al añadir al carrito');
							}
							return response.json();
						})
						.then(newCartItem => {
							getActions().getCart(); // Actualizar estado del carrito
							toast.success("Producto añadido al carrito.");
						})
						.catch(error => {
							toast.error("Error al añadir producto al carrito.");
							console.error(error);
						});
				}
			},
			// un get para obtener los articulos dentor del carrito
			getCart: () => {
				const { apiURL, access_token } = getStore();
				// primero se ve si el usuario esta lgeado
				if (!access_token) {
					// si no retornamos nada
					return;
				}

				// url del endpoint
				const url = `${apiURL}/api/cart`;
				const requestOptions = {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${access_token}`, // denuevo usamos bearer para revisar quien esta logeado
					},

				};

				// usamos la funcion getfetch de john
				getActions().getFetch(url, requestOptions)
					.then(response => {
						if (!response.ok) {
							throw new Error('Error al obtener el carrito');
						}
						return response.json();
					})
					.then(cartItems => {
						setStore({
							...getStore(), // mantener lo q ya esta dentro del carrito
							cartItems: cartItems // actualizar items del carrito
						});
					})
					.catch(error => {
						// si hay error al obtener los productos hacemos un console log para poder hacer debugging
						console.error("Error al obtener los productos del carrito.", error);
					});
			},
			// accion para eliminar cosas del carro
			removeFromCart: (itemId) => {
				const { apiURL, access_token } = getStore();
				// url endpoint
				const url = `${apiURL}/api/cart/${itemId}`;

				const requestOptions = {
					method: "DELETE",
					headers: {
						"Authorization": `Bearer ${access_token}`, // nuevamente usamos bearer
					},
				};

				// usamos la funcion getfetch de john
				getActions().getFetch(url, requestOptions)
					.then(response => {
						if (!response.ok) {
							throw new Error('Error al eliminar del carrito');
						}
						return response.json();
					})
					.then(() => {
						// Llamada a getCart para actualizar el estado global del carrito
						getActions().getCart();
						toast.success("Producto eliminado del carrito.");
					})
					.catch(error => {
						toast.error("Error al eliminar producto del carrito.");
						console.error(error);
					});
			},
			//funcion de getfetch de john
			getFetch: (url, solicitud) => {
				return fetch(url, solicitud)
			}
		}
	};
}




export default getState;





