import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'
import Router from '../router'

axios.defaults.baseURL = process.env.VUE_APP_API_ROOT_URL;

function responseHandler(response) {
	if (response.data && response.data.code === 3) {
		localStorage.removeItem('logged')
		Router.push('/')
		throw Error(response.message || 'Authentication failed')
	}

	return response
}

const request = {
	async get(...args) {
		const response = await axios.get(...args)
		return responseHandler(response)
	},
	async patch(...args) {
		const response = await axios.patch(...args)
		return responseHandler(response)
	},
	async post(...args) {
		const response = await axios.post(...args)
		return responseHandler(response)
	},
	async delete(...args) {
		const response = await axios.delete(...args)
		return responseHandler(response)
	},
}

function getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.access_token;
}

loadProgressBar()

export default {
	async login(data) {
		const response = await request.post('/v1/auth', data)
		return response.data
	},

	async getStudents() {
		const response = await request.get('/private/v1/student', { headers: { Authorization: `Bearer ${getLocalAccessToken()}` } })
		return response.data
	},

	async deleteStudent(id) {
		const response = await request.delete(`/private/v1/student/${id}`, { headers: { Authorization: `Bearer ${getLocalAccessToken()}` } })
		return response.data
	},
}