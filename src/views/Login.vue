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
            :class="['form-control', formErrors.email && 'is-invalid']"
            v-model.trim="formData.email"
            @input="formDirty.email = true"
            placeholder="user@mail.com"
          />
        </div>

        <!-- password -->
        <div class="form-group">
          <label for="nombre">Password</label>
          <div class="input-group mb-3">
            <input
              id="nombre"
              :type="showPassword ? 'text' : 'password'"
              :class="['form-control', formErrors.password && 'is-invalid']"
              v-model.trim="formData.password"
              @input="formDirty.password = true"
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
        </div>

        <!-- botón de login -->
        <button class="btn mt-3" :disabled="!isValidForm">Sign In</button>
      </form>
    </div>
  </section>
</template>

<script>
import AuthService from "../services/AuthService.js";
export default {
  name: "login",
  props: [],
  mounted() {},
  data() {
    return {
      authService: new AuthService(),
      formData: {
        email: "",
        password: "",
      },
      formDirty: {
        email: false,
        password: false,
      },
      showPassword: false,
    };
  },
  methods: {
    async onSubmit() {
      await this.authService.login(this.formData);
    },
  },
  computed: {
    formErrors() {
      return {
        email: !this.isValidEmail && this.formDirty.email,
        password: !this.isValidPassword && this.formDirty.password,
      };
    },
    isValidEmail() {
      return !!this.formData.email;
    },
    isValidPassword() {
      return !!this.formData.password;
    },
    isValidForm() {
      return this.isValidEmail && this.isValidPassword;
    },
  },
};
</script>
