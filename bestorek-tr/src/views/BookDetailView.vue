<template>
  <section>
    <div class="container" v-if="!loading">
      <SectionHeader :title="book.title" :text="book.author" />
      <font-awesome-icon
        :icon="['fas', 'arrow-left']"
        size="2xl"
        class="mb-2"
        style="cursor: pointer; color: var(--primary-color)"
        @click="goToBackBooks"
      />
      <div class="row mb-4">
        <div class="col-lg-6">
          <img class="card-img-top" src="../../template/images/b_detail.jpg" />
        </div>
        <div class="col-lg-6 details-wrapper">
          <p class="lead description">
            {{ book.description }}
          </p>
          <div class="mb-4">
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Page</strong></div>
              <div class="col-lg-6">{{ book.pageNumber }}</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Category</strong></div>
              <div class="col-lg-6">Fiction</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Rating</strong></div>
              <div class="col-lg-6">{{ book.rating }}</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Upload Date</strong></div>
              <div class="col-lg-6">{{ book.updatedAt }}</div>
            </div>
          </div>
          <div class="comments-section">
            <h3 class="display-6 mb-2">Comments</h3>
            <div class="card mb-4">
              <div class="card-body">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, enim.
                </p>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold fst-italic">John Doe</p>
                  <div class="d-flex align-items-center">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    <p class="ps-2 mb-0"><strong>8</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-body">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, enim.
                </p>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold fst-italic">John Doe</p>
                  <div class="d-flex align-items-center">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    <p class="ps-2 mb-0"><strong>8</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-body">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, enim.
                </p>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold fst-italic">John Doe</p>
                  <div class="d-flex align-items-center">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    <p class="ps-2 mb-0"><strong>8</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-body">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, enim.
                </p>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold fst-italic">John Doe</p>
                  <div class="d-flex align-items-center">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    <p class="ps-2 mb-0"><strong>8</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-body">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, enim.
                </p>
                <div class="d-flex justify-content-between">
                  <p class="fw-bold fst-italic">John Doe</p>
                  <div class="d-flex align-items-center">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    <p class="ps-2 mb-0"><strong>8</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <p>Book Detail Loading...</p>
    </div>
  </section>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";
import { useBookStore } from "@/stores/bookStore.js";
import { mapState } from "pinia";
export default {
  name: "BookDetailView",
  components: {
    SectionHeader,
  },
  data() {
    return {
      book: null,
      loading: true,
    };
  },
  created() {
    this.selectBook();
  },
  methods: {
    goToBackBooks() {
      this.$router.push({ name: "books" });
    },
    selectBook() {
      const bookId = this.$route.params.id;
      this.book = this.selectedBook(bookId);
      this.loading = false;
    },
    // async fetchABook() {
    //   const bookId = this.$route.params.id;
    //   try {
    //     const response = await fetch(
    //       `http://localhost:3000/api/v1/books/${bookId}`
    //     );
    //     const data = await response.json();
    //     this.book = data;
    //     this.loading = false
    //   } catch (error) {}
    // },
  },
  computed: {
    ...mapState(useBookStore, ["selectedBook"]),
  },
};
</script>

<style scoped>
.details-wrapper {
  max-height: 740px;
  display: flex;
  flex-direction: column;
}

.comments-section {
  flex-grow: 1;
  overflow-y: auto;
}

.description {
  min-height: 150px;
  max-height: 250px;
  overflow-y: auto;
}
</style>
