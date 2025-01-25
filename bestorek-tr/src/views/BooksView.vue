<template>
  <section class="full-section-height">
    <div class="container">
      <SectionHeader
        title="Books"
        text="We declare long prop names using camelCase because this avoids"
      />
      <BookList :books="paginatedBooks" />
      <PaginationWidget
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-changed="updatePage"
      />
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "@/components/SectionHeader.vue";
import BookList from "@/components/BookList.vue";
import PaginationWidget from "@/components/widgets/PaginationWidget.vue";
import { useBookStore } from "@/stores/bookStore.js";
import { computed } from "vue";

const currentPage = 1;
const itemsPerPage = 8;

const bookStore = useBookStore();
const totalPages = computed(() => Math.ceil(bookStore.books.length / itemsPerPage));
const paginatedBooks = computed(() => {
  const startIndex = (currentPage - 1) * itemsPerPage; // current Page bulunduğu sayfa
  const endIndex = startIndex + itemsPerPage;
  return bookStore.books.slice(startIndex, endIndex);
});

const updatePage = (page) => {
  currentPage = page;
};
</script>

<!-- <script>
import { useBookStore } from "@/stores/bookStore.js";
import { mapState } from "pinia";
export default {
  computed: {
    ...mapState(useBookStore, ["books"]),
    totalPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage; // current Page bulunduğu sayfa
      const endIndex = startIndex + this.itemsPerPage;
      return this.books.slice(startIndex, endIndex);
    },
  },
  methods: {
    updatePage(page) {
      this.currentPage = page;
    },
  },
};
</script> -->

<style scoped>
.auth-box {
  margin-top: -30px;
}
</style>
