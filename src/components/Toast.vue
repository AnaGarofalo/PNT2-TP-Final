<template>
  <transition name="slide-up">
    <div
      class="toast show align-items-center text-bg-danger border-0 position-fixed bottom-0 end-0 m-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      v-if="!!isOpen"
    >
      <div class="d-flex">
        <div class="toast-body">{{ message }}</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto no-focus"
          @click="close()"
        ></button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "toast",
  props: ["isOpen", "close", "message"],
  mounted() {},
  data() {
    return {};
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.close();
        }, 3000);
      }
    },
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.no-focus:focus {
  box-shadow: none !important;
}
</style>
