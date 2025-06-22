<template>
  <section
    class="login-background d-flex align-items-center justify-content-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="card m-3 col-4">
      <div class="card-header">
        <h3>Sign up</h3>
      </div>

      <div class="card-body">
        <form @submit.prevent="onSubmit" class="container d-grid gap-3">
          <!-- name -->
          <div class="form-group">
            <label for="name" class="form-label">Username</label>
            <input
              id="name"
              type="text"
              :class="[
                'form-control',
                'base-input',
                !!formErrors.name && 'is-invalid',
              ]"
              v-model.trim="formData.name"
              @input="
                () => {
                  formDirty.name = true;
                  loginError = '';
                }
              "
              placeholder="Dr Minigame"
            />
            <p v-if="!!formErrors.name" class="form-text text-danger">
              {{ formErrors.name }}
            </p>
          </div>

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

          <!-- password -->
          <div class="form-group">
            <label for="nombre" class="form-label">Repeat password</label>
            <div class="input-group">
              <input
                id="nombre"
                :type="showPassword ? 'text' : 'password'"
                :class="[
                  'form-control',
                  'base-input',
                  !!formErrors.password && 'is-invalid',
                ]"
                v-model.trim="formData.password2"
                @input="
                  () => {
                    formDirty.password2 = true;
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
            <p v-if="!!formErrors.password2" class="form-text text-danger">
              {{ formErrors.password2 }}
            </p>
          </div>

          <!-- botón de login -->
          <button
            class="btn mt-3 medium-purple-button"
            :disabled="!isValidForm"
          >
            Sign Up
          </button>

          <div class="d-flex justify-content-center gap-2">
            <p>Already have an account?</p>
            <RouterLink class="link-opacity-50 text-button" :to="loginPath"
              >Sign in!</RouterLink
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
      loginPath: RoutesDefinition.login.path,
      formData: {
        email: "",
        name: "",
        password: "",
        password2: "",
      },
      formDirty: {
        email: false,
        name: false,
        password: false,
        password2: false,
      },
      showPassword: false,
      loginError: "",
    };
  },
  methods: {
    async onSubmit() {
      const response = await this.authService.createAndLogin(this.formData);
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
        name: this.formDirty.name ? this.isValidName.errorMessage : "",
        password: this.formDirty.password
          ? this.isValidPassword.errorMessage
          : "",
        password2: this.formDirty.password2
          ? this.isValidPassword2.errorMessage
          : "",
      };
    },
    isValidName() {
      let errorMessage = "";
      if (!this.formData.name) {
        errorMessage = "Username is required";
      } else if (this.formData.name.length < 8) {
        errorMessage = "Username must have at least 8 characters";
      }
      return { isValid: !errorMessage, errorMessage };
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
      } else if (this.formData.password.length < 8) {
        errorMessage = "Password must have at least 8 characters";
      }
      return { isValid: !errorMessage, errorMessage };
    },
    isValidPassword2() {
      let errorMessage = "";

      if (!this.formData.password2) {
        errorMessage = "Password is required";
      } else if (this.formData.password2.length < 8) {
        errorMessage = "Password must have at least 8 characters";
      }
      if (this.formData.password2 !== this.formData.password) {
        errorMessage = "Passwords don't match";
      }
      return { isValid: !errorMessage, errorMessage };
    },
    isValidForm() {
      const conditions = [
        this.isValidEmail,
        this.isValidPassword,
        this.isValidPassword2,
        this.isValidName,
      ];
      return conditions.every((condition) => condition.isValid);
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
