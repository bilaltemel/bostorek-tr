<template>
  <div>
    <!-- Button -->
    <div class="row mb-3">
      <div class="col text-end">
        <button type="button" class="btn btn-primary" @click="openAddModal()">
          <font-awesome-icon :icon="['fas', 'plus']" />
          Add Book
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Page</th>
              <th class="text-center">Edit</th>
              <th class="text-center">Delete</th>
            </tr>
          </thead>
          <TransitionGroup name="list" tag="tbody">
            <tr v-for="book in paginatedBooks" :key="book._id">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td style="max-width: 250px">
                {{ book.description }}
              </td>
              <td>{{ book.pageNumber }}</td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['far', 'pen-to-square']"
                  class="text-warning"
                  style="cursor: pointer"
                  @click="openEditModal(book)"
                />
              </td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="text-danger"
                  style="cursor: pointer"
                  @click="deleteBook(book._id, book.title)"
                />
              </td>
            </tr>
          </TransitionGroup>
        </table>
      </div>
    </div>

    <div class="row">
      <PaginationWidget
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-changed="updatePage"
      />
    </div>
    <!-- Add Book Modal -->
    <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalLabel">{{ modalTitle }}</h5>
            <button
              type="button"
              @click="modal.hide()"
              class="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-5">
            <div class="col mb-3">
              <label for="title" class="form-label"
                >Title
                <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                v-model="bookData.title"
                required
              />
            </div>
            <div class="col mb-3">
              <label for="author" class="form-label"
                >Author
                <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="author"
                name="author"
                v-model="bookData.author"
                required
              />
            </div>
            <div class="col mb-3">
              <label for="author" class="form-label"
                >Description
                <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="description"
                name="description"
                cols="30"
                rows="4"
                v-model="bookData.description"
              />
            </div>
            <div class="col mb-3">
              <label for="author" class="form-label"
                >Number of Pages
                <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                id="numOfPages"
                name="numOfPages"
                v-model="bookData.pageNumber"
                required
              />
            </div>
            <div class="text-end mb-4">
              <button
                type="button"
                @click="modal.hide()"
                class="btn btn-outline-secondary"
              >
                Close
              </button>
              <button @click="saveBook()" type="button" class="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationWidget from "../widgets/PaginationWidget.vue";
import { useBookStore } from "@/stores/bookStore.js";
import { mapActions, mapState } from "pinia";
import { Modal } from "bootstrap";
import { useToast } from "vue-toastification";
export default {
  name: "DashboardBooks",
  components: {
    PaginationWidget,
  },
  data() {
    return {
      modal: null,
      modalTitle: "",
      bookData: {
        title: "",
        author: "",
        description: "",
        pageNumber: null,
        editedBookId: null,
      },
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  created() {
    this.fetchBooksByUploader();
  },
  computed: {
    ...mapState(useBookStore, ["userUploadedBooks"]),
    totalPages() {
      return Math.ceil(this.userBooks.length / this.itemsPerPage);
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage; // current Page bulunduğu sayfa
      const endIndex = startIndex + this.itemsPerPage;
      return this.userBooks.slice(startIndex, endIndex);
    },
    userBooks() {
      return this.userUploadedBooks
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    ...mapActions(useBookStore, [
      "addNewBook",
      "fetchBooksByUploader",
      "deleteTheBook",
      "editTheBook",
    ]),
    updatePage(page) {
      this.currentPage = page;
    },
    saveBook() {
      if (this.modalTitle === "Add Book") {
        this.addBook();
      } else if (this.modalTitle === "Edit Book") {
        this.editBook();
      }
    },
    openAddModal() {
      this.modalTitle = "Add Book";
      this.bookData = {
        title: "",
        author: "",
        description: "",
        pageNumber: null,
      };
      this.modal.show();
    },
    openEditModal(existingBook) {
      this.modalTitle = "Edit Book";
      this.editedBookId = existingBook._id;
      this.bookData = {
        title: existingBook.title,
        author: existingBook.author,
        description: existingBook.description,
        pageNumber: existingBook.pageNumber,
      };
      this.modal.show();
    },
    showToast(message, options) {
      const toast = useToast();

      toast(message, {
        position: "top-right",
        closeButton: "button",
        icon: true,
        rtl: false,
        ...options,
      });
    },
    async addBook() {
      try {
        await this.addNewBook(this.bookData);
        this.currentPage = 1;
        this.modal.hide();
        this.bookData = {
          title: "",
          author: "",
          description: "",
          pageNumber: null,
        };

        await this.fetchBooksByUploader();

        this.showToast("New book added successfully!", {
          type: "success",
          timeout: 1500,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async editBook() {
      try {
        await this.editTheBook(this.editedBookId, this.bookData);

        await this.fetchBooksByUploader();

        this.modal.hide();

        this.showToast(`The book edited successfully`, {
          type: "success",
          timeout: 2000,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBook(bookId, bookTitle) {
      try {
        await this.deleteTheBook(bookId);

        await this.fetchBooksByUploader();

        this.showToast(`${bookTitle} deleted successfully`, {
          type: "success",
          timeout: 2000,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.addEditModal);
  },
};
</script>
<style>
.btn-outline-secondary {
  border-radius: 25px;
  height: 48px;
  margin-right: 20px;
  min-width: 120px;
}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 1.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
