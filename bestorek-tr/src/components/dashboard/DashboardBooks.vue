<template>
  <div>
    <!-- Button -->
    <div class="row mb-3">
      <div class="col text-end">
        <button type="button" class="btn btn-primary" @click="modal.show()">
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
            <tr v-for="book in userBooks" :key="book._id">
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

    <!-- Add Book Modal -->
    <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalLabel">Add Book</h5>
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
                v-model="newBook.title"
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
                v-model="newBook.author"
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
                rows="10"
                v-model="newBook.description"
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
                v-model="newBook.pageNumber"
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
              <button @click="addBook" type="button" class="btn btn-primary">
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
import { useBookStore } from "@/stores/bookStore.js";
import { mapActions, mapState } from "pinia";
import { Modal } from "bootstrap";
import { useToast } from "vue-toastification";
export default {
  name: "DashboardBooks",
  data() {
    return {
      modal: null,
      newBook: {
        title: "",
        author: "",
        description: "",
        pageNumber: null,
      },
    };
  },
  created() {
    this.fetchBooksByUploader();
  },
  computed: {
    ...mapState(useBookStore, ["userUploadedBooks"]),
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
    ]),
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
        await this.addNewBook(this.newBook);
        this.modal.hide();
        this.newBook = {
          title: "",
          author: "",
          description: "",
          pageNumber: null,
        };

        await this.fetchBooksByUploader();

        // const toast = useToast();
        // toast.success("New book added successfully!", {
        //   position: "top-right",
        //   timeout: 1000,
        //   closeButton: "button",
        //   icon: true,
        //   rtl: false,
        // });

        this.showToast("New book added successfully!", {type: "success", timeout: 1500})
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBook(bookId, bookTitle) {
      try {
        await this.deleteTheBook(bookId);

        await this.fetchBooksByUploader();

        // const toast = useToast();

        // toast.warning(`${bookTitle} deleted successfully`, {
        //   position: "top-right",
        //   timeout: 2500,
        //   closeButton: "button",
        //   icon: true,
        //   rtl: false,
        // });

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
