<template>
	<v-container class="pa-0 background" fluid fill-height>
		<v-col elevation="12" cols="12" class="pa-0 fill-height">
			<v-card
				class="mx-auto"
				:class="$vuetify.breakpoint.smAndDown ? '' : 'ml-10'"
				:width="$vuetify.breakpoint.smAndDown ? '100%' : '500'"
				height="100%"
				tile
			>
				<v-card-text>
					<v-form
						v-model="valid_login"
						id="login-form"
						@submit.prevent="login"
						ref="form"
						lazy-validation
					>
						<v-text-field
							required
							:rules="[rules.required]"
							v-model.trim="username"
							autocomplete
							prepend-icon="person"
							name="username"
							label="Username"
							type="text"
						></v-text-field>
						<v-text-field
							required
							:rules="[rules.required]"
							v-model="password"
							prepend-icon="lock"
							name="current-password"
							label="Password"
							autocomplete
							:type="showPsw ? 'text' : 'password'"
							:append-icon="
								showPsw ? 'visibility' : 'visibility_off'
							"
							@click:append="showPsw = !showPsw"
						></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						style="min-width: 150px; margin: 10px"
						rounded
						type="submit"
						form="login-form"
						>Login</v-btn
					>
				</v-card-actions>
				<v-alert dismissible :type="error_type" v-model="error">{{
					error_text
				}}</v-alert>
			</v-card>
		</v-col>
	</v-container>
</template>

<style scoped>
.background {
	height: 100%;
	width: 100%;
	background-repeat: repeat;
}
</style>

<script>
import ConfigApis from '@/apis/configApis'
import { Routes } from '@/router'
export default {
	data() {
		return {
			username: '',
			password: '',
			error_text: '',
			error_type: 'error',
			showPsw: false,
			error: false,
			valid_login: true,
			rules: {
				required(value) {
					return !!value || 'Campo obrigatório.'
				},
			},
		}
	},
	watch: {
		error: function (newValue) {
			if (newValue) {
				setTimeout(function () {
					this.error = false
				}, 5000)
			}
		},
	},
	mounted() {
		if (this.isLocalStorageSupported()) {
			const user = localStorage.getItem('user')
				? JSON.parse(localStorage.getItem('user'))
				: null
			const logged = !!localStorage.getItem('logged')
			if (user && user.rememberMe) {
				this.username = user.username || this.username
				this.password = user.password || this.password
				this.rememberMe = user.rememberMe
				if (logged) this.login(true)
			} else {
				localStorage.removeItem('user')
			}
		} else {
			this.error = true
			this.error_type = 'error'
			this.error_text = 'Local storage not supported'
		}
	},
	methods: {
		isLocalStorageSupported() {
			const testKey = 'test'
			const storage = window.localStorage
			try {
				storage.setItem(testKey, '1')
				storage.removeItem(testKey)
				return true
			} catch (error) {
				return false
			}
		},
		showSnackbar(text) {
			this.$emit('showSnackbar', text)
		},
		async login(forced) {
			if (!this.isLocalStorageSupported()) {
				this.error = true
				this.error_type = 'error'
				this.error_text = 'Local storage not supported'
				return
			}
			if (forced === true || this.$refs.form.validate()) {
				try {
					let user = {
						username: this.username,
						password: this.password,
					}
					const response = await ConfigApis.login(user)
					if (!response.success) {
						if (response.message) this.error = true
						this.error_type = 'error'
						this.error_text = response.message
					} else {
						user = Object.assign(user, response.user)
						user.rememberMe = this.rememberMe
						localStorage.setItem('user', JSON.stringify(user))
						localStorage.setItem('logged', 'true')
						this.$store.dispatch('setUser', user)
						if (this.$route.params.nextUrl != null) {
							this.$router.push(this.$route.params.nextUrl)
						} else {
							this.$router.push(Routes.main)
						}
					}
				} catch (error) {
					console.log(error)
					this.error = true
					this.error_type = 'error'
					this.error_text = error.message
				}
			}
		},
	},
}
</script>