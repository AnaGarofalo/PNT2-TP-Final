<template>
  <section class="row m-0 fluid-container">
    <button class="btn" data-bs-toggle="modal" data-bs-target="#addReviewModal">
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addReviewModalLabel">
              Modal title
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "addReviewModal",
  components: {},
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
