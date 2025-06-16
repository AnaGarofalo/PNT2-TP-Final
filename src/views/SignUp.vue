<template>
  <section class="card m-3 col-4">
    <div class="card-header">
      <h3>Ingrese sus datos</h3>
    </div>

    <div class="card-body">
      <form @submit.prevent="onSubmit" class="container d-grid gap-3">
        <!-- email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="text"
            :class="['form-control', !!formErrors.email && 'is-invalid']"
            v-model.trim="formData.email"
            @input="
              () => {
                formDirty.email = true;
                loginError = '';
              }
            "
            placeholder="user@mail.com"
          />
          <p v-if="!!formErrors.email" class="form-text text-danger">
            {{ formErrors.email }}
          </p>
        </div>

        <!-- password -->
        <div class="form-group">
          <label for="nombre">Password</label>
          <div class="input-group">
            <input
              id="nombre"
              :type="showPassword ? 'text' : 'password'"
              :class="['form-control', !!formErrors.password && 'is-invalid']"
              v-model.trim="formData.password"
              @input="
                () => {
                  formDirty.password = true;
                  loginError = '';
                }
              "
              placeholder="************"
            />
            <button
              class="input-group-text btn btn-dark"
              id="basic-addon2"
              @click="showPassword = !showPassword"
            >
              <i
                :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye-fill'"
              ></i>
            </button>
          </div>
          <p v-if="!!formErrors.password" class="form-text text-danger">
            {{ formErrors.password }}
          </p>
        </div>

        <div
          v-if="loginError"
          class="alert alert-danger d-flex align-items-center gap-2"
          role="alert"
        >
          <i class="bi bi-exclamation-triangle"></i>
          <div>{{ loginError }}</div>
        </div>

        <!-- botón de login -->
        <button class="btn mt-3" :disabled="!isValidForm">Sign In</button>
        <p>
          Already have an account yet?<RouterLink
            class="link-opacity-50"
            :to="loginPath"
            >Log in!</RouterLink
          >
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import AuthService from "../services/AuthService.js";
import { useUserStore } from "../store/userStore.js";
import { RoutesDefinition } from "../router.js";

export default {
  name: "signup",
  props: [],
  mounted() {},
  data() {
    return {
      authService: new AuthService(),
      userStore: useUserStore(),
      loginPath: RoutesDefinition.login.path,
      formData: {
        email: "",
        password: "",
      },
      formDirty: {
        email: false,
        password: false,
      },
      showPassword: false,
      loginError: "",
    };
  },
  methods: {
    async onSubmit() {
      const response = await this.authService.login(this.formData);
      if (response.success) {
        this.userStore.setUser(response.message);
        this.$router.push(RoutesDefinition.home.path);
      } else {
        this.loginError = response.message;
      }
    },
  },
  computed: {
    formErrors() {
      return {
        email: this.formDirty.email ? this.isValidEmail.errorMessage : "",
        password: this.formDirty.password
          ? this.isValidPassword.errorMessage
          : "",
      };
    },
    isValidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let errorMessage = "";
      if (!this.formData.email) {
        errorMessage = "Email is required";
      } else if (!emailRegex.test(this.formData.email)) {
        errorMessage = "Email is invalid";
      }

      return { isValid: !errorMessage, errorMessage };
    },
    isValidPassword() {
      let errorMessage = "";

      if (!this.formData.password) {
        errorMessage = "Password is required";
      }
      return { isValid: !errorMessage, errorMessage };
    },
    isValidForm() {
      return this.isValidEmail.isValid && this.isValidPassword.isValid;
    },
  },
};
</script>
