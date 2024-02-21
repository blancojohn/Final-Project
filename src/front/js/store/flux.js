import { ToastContainer } from 'react-toastify'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},

			],
			/*CÓDGIO NUESTRO A PARTIR DE ACÁ PARA EL STORE*/
			registerUser: {
				name: '',
				email: '',
				password: '',
				is_active: true,
			},
			apiURL: "http://127.0.0.1:3001"
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			/*CÓDIGO NUESTRO A PARTIR DE ACÁ PARA LAS ACTIONS*/
			handleSubmit: (e) => {
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
					toast.success(datos.success)
					setStore({registerUser})
					console.log(datos)
				}).catch(error => console.log(error))
			},
			handleChange: (e) => {
				const { registerUser } = getStore()
				const { name, value } = e.target
				registerUser[name] = value
				setStore({
					registerUser: registerUser
				})
			},
			getFetch: (url, solicitud) => {
				return fetch(url, solicitud)
			}
		}
	}
};


export default getState;









