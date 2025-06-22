<template>
  <section
    class="login-background d-flex align-items-center justify-content-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="card m-3 col-4">
      <div class="card-header">
        <h3>Sign in</h3>
      </div>

      <div class="card-body">
        <form @submit.prevent="onSubmit" class="container d-grid gap-3">
          <!-- email -->
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="text"
              :class="[
                'form-control',
                'base-input',
                !!formErrors.email && 'is-invalid',
              ]"
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
            <label for="nombre" class="form-label">Password</label>
            <div class="input-group">
              <input
                id="nombre"
                :type="showPassword ? 'text' : 'password'"
                :class="[
                  'form-control',
                  'base-input',
                  !!formErrors.password && 'is-invalid',
                ]"
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
                class="input-group-text btn medium-purple-button"
                id="basic-addon2"
                @click="showPassword = !showPassword"
                type="button"
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

          <!-- botón de login -->
          <button
            class="btn mt-3 medium-purple-button"
            :disabled="!isValidForm"
          >
            Sign In
          </button>

          <div class="d-flex justify-content-center gap-2">
            <p>Don't have an account yet?</p>
            <RouterLink class="link-opacity-50 text-button" :to="signUpPath"
              >Sign up!</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
    <Toast
      :isOpen="!!loginError"
      :close="
        () => {
          loginError = '';
        }
      "
      :message="loginError"
    />
  </section>
</template>

<script>
import AuthService from "../services/AuthService.js";
import { useUserStore } from "../store/userStore.js";
import { RoutesDefinition } from "../router.js";
import backgroundImage from "@/assets/background-image-2.png";
import StringUtils from "../utils/StringUtils.js";
import Toast from "../components/Toast.vue";

export default {
  name: "login",
  props: [],
  components: {
    Toast,
  },
  mounted() {},
  data() {
    return {
      authService: new AuthService(),
      userStore: useUserStore(),
      backgroundImage,
      signUpPath: RoutesDefinition.signup.path,
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
        this.loginError = StringUtils.capitalize(response.message);
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

<style scoped>
.login-background {
  background-position: center;
  background-size: cover;
}

.card {
  background-color: var(--accent-green);
  border: 2px solid var(--purple-dark);
  border-radius: 8px;
}

.card-header {
  background-color: var(--purple-dark);
  color: var(--accent-green);
}

.form-label {
  color: var(--purple-medium);
}
</style>
