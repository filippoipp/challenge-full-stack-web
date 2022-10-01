<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 offset-xs4>
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
                v-model.trim="email"
                autocomplete
                prepend-icon="person"
                name="email"
                label="Email"
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
                :append-icon="showPsw ? 'visibility' : 'visibility_off'"
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
      </v-flex>
    </v-layout>
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
import ConfigApis from "@/apis/configApis";
import { Routes } from "@/router";
import store from "../store/index";
export default {
  data() {
    return {
      email: "",
      password: "",
      error_text: "",
      error_type: "error",
      showPsw: false,
      error: false,
      valid_login: true,
      rules: {
        required(value) {
          return !!value || "Campo obrigatório.";
        },
      },
    };
  },
  watch: {
    error: function (newValue) {
      if (newValue) {
        setTimeout(function () {
          this.error = false;
        }, 5000);
      }
    },
  },

  methods: {
    showSnackbar(text) {
      this.$emit("showSnackbar", text);
    },
    async login(forced) {
      if (forced === true || this.$refs.form.validate()) {
        try {
          let user = {
            email: this.email,
            password: this.password,
          };
          const response = await ConfigApis.login(user);
          if (!response.access_token) {
            if (response.message) this.error = true;
            this.error_type = "error";
            this.error_text = response.message;
          } else {
            user = Object.assign(user, response);
            delete user.password;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("logged", "true");
            store.dispatch("setUser", user);
            this.$router.push(Routes.main);
          }
        } catch (error) {
          this.error = true;
          this.error_type = "error";
          this.error_text = error.message;
        }
      }
    },
  },
};
</script>
