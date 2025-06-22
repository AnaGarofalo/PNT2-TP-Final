<template>
  <section class="row m-0 fluid-container">
    <button
      class="btn medium-purple-button"
      data-bs-toggle="modal"
      data-bs-target="#addReviewModal"
    >
      Add Review
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addReviewModal"
      tabindex="-1"
      aria-labelledby="addReviewModalLabel"
      aria-hidden="true"
    >
      <form @submit.prevent="onSubmit" class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addReviewModalLabel">
              Write your own review
            </h1>
            <button
              @click="clearForm"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <div class="d-flex gap-2">
              <h5>Score:</h5>
              <StarsSelectable
                :selectedScore="formData.score"
                :setSelectedScore="(score) => (this.formData.score = score)"
              />
            </div>

            <div class="form-floating mt-3">
              <textarea
                class="form-control"
                id="floatingTextarea2"
                style="height: 100px"
                v-model="formData.comment"
              ></textarea>
              <label for="floatingTextarea2">Leave a comment here</label>
            </div>
          </div>

          <div class="modal-footer">
            <button
              @click="clearForm"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              :disabled="!isValidForm"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
    <Toast
      :isOpen="!!reviewError"
      :close="
        () => {
          reviewError = '';
        }
      "
      :message="reviewError"
    />
  </section>
</template>

<script>
import StarsSelectable from "./StarsSelectable.vue";
import { useUserStore } from "../store/userStore.js";
import ReviewService from "../services/ReviewService.js";
import Toast from "./Toast.vue";

export default {
  name: "addReviewModal",
  components: {
    StarsSelectable,
    Toast,
  },
  props: ["gameId", "addReview"],
  mounted() {
    const user = this.userStore.getUser;
    this.formData.UserId = user.id;
  },
  data() {
    return {
      userStore: useUserStore(),
      reviewService: new ReviewService(),
      reviewError: "",
      formData: {
        UserId: null,
        GameId: this.gameId,
        score: 0,
        comment: "",
      },
      formDirty: {
        score: false,
        comment: false,
      },
    };
  },
  methods: {
    async onSubmit() {
      const response = await this.reviewService.create(this.formData);
      if (response.success) {
        this.addReview(response.message);
        this.clearForm();
      } else {
        this.reviewError = response.message;
      }
    },
    clearForm() {
      this.formData.score = 0;
      this.formData.comment = "";
    },
  },
  computed: {
    isValidScore() {
      return {
        isValid: !!this.formData.score,
        errorMessage: !this.formData.score ? "Score is Required" : "",
      };
    },
    isValidComment() {
      let errorMessage;
      if (!this.formData.comment) {
        errorMessage = "Comment is Required";
      } else if (this.formData.comment.length < 10) {
        errorMessage = "Comment must have at least 10 characters";
      }
      return { isValid: !errorMessage, errorMessage };
    },
    isValidForm() {
      return this.isValidComment.isValid && this.isValidScore.isValid;
    },
  },
};
</script>

<style scoped></style>
