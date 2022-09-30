import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'
import Router from '../router'

function getBasePath(path) {
	return document.baseURI.replace(/\/$/, '') + (path || '')
}

axios.defaults.socketUrl = getBasePath()
axios.defaults.baseURL = `${axios.defaults.socketUrl}/api`

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

loadProgressBar()

export default {
	// ---- LOGIN/LOGOUT ------
	async login(data) {
		const response = await request.post('/authenticate', data)
		return response.data
	},
	logout() {
		return request.get('/logout')
	},
}