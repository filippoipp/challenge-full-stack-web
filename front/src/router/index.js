import Vue from 'vue'
import Router from 'vue-router'

// DON'T use lazy loading here, it would break application running behind a proxy
import Template from '@/views/Template'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'
import Students from '@/views/Students'

import store from '@/store'
import ConfigApis from '../apis/configApis'

Vue.use(Router)

export const Routes = {
	login: '/',
	dashboard: '/error',
    students: '/students',
}

Routes.main = Routes.dashboard

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: Routes.login,
			name: 'Login',
			component: Login,
		},
        {
			path: Routes.dashboard,
			name: 'Dashboard',
			component: Dashboard,
			props: true,
			template: Template,
		},
		{
			path: Routes.students,
			name: 'Estudantes',
			component: Students,
			props: true,
			template: Template,
		},
	],
})

router.beforeEach(async (to, from, next) => {

	if (store.state.auth === undefined && to.path !== Routes.login) {
		localStorage.setItem('nextUrl', to.path)
	}

	if (store.state.auth === false) {
		if (to.path === Routes.login) {
			next({
				path: Routes.main,
			})
		} else {
			next()
		}
		return
	}

	// permissions required by the requested route
	const route = {
		auth: to.matched.some((record) => record.meta.requiresAuth),
	}

	let user = store.state.user
	let logged = !!localStorage.getItem('logged')

	if (!user || Object.keys(user).length === 0) {
		// check if there is a valid user in localstorage
		try {
			user = JSON.parse(localStorage.getItem('user'))
			if (user && logged) {
				// used found in local storage, login
				const response = await ConfigApis.login(user)
				if (!response.success) {
					logged = false
					localStorage.removeItem('logged')
				} else {
					store.commit('setUser', response.user)
				}
			} else user = {}
		} catch (error) {
			user = {}
		}
	}

	// permission of the user
	user.notLogged = Object.keys(user).length === 0 || !logged

	if (route.auth) {
		if (user.notLogged) {
			// user not logged redirect to login page
			next({
				path: Routes.login,
				params: { nextUrl: to.fullPath },
			})
		} else {
			// user logged, let it go
			next()
		}
	} else if (user.notLogged) {
		// doesn't require auth and user is not logged
		next()
	} else {
		// user is logged
		next({
			path: Routes.main,
			params: { nextUrl: to.fullPath },
		})
	}
})

export default router