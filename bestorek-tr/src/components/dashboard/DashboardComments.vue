<template>
  <div class="row">
    <div class="row">
      <table class="table">
        <thead>
          <tr>
            <th>Content</th>
            <th>Book</th>
            <th class="text-center">Edit</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in commentsByUser" :key="comment._id">
            <td>{{ comment.content }}</td>
            <td>{{ comment.book ? comment.book.title : 'There in no title in your book' }}</td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['far', 'pen-to-square']"
                class="text-warning"
                style="cursor: pointer"
                @click="openEditModal(comment)"
              />
            </td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['fas', 'trash']"
                class="text-danger"
                style="cursor: pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
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
              <label for="author" class="form-label"
                >Comment
                <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="comment"
                name="comment"
                cols="30"
                rows="4"
                v-model="commentData.comment"
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
import { useCommentStore } from "@/stores/commentStore.js";
import { useAuthStore } from "@/stores/authStore.js";
import { mapActions, mapState } from "pinia";
import { Modal } from "bootstrap";
import { useToast } from "vue-toastification";
export default {
  name: "DashboardComments",
  data() {
    return {
      modal: null,
      modalTitle: "",
      commentData: {
        comment: "",
        editedCommentId: null,
      },
    };
  },
  methods: {
    ...mapActions(useCommentStore, ["fetchCommentByUser", "editTheComment"]),
    openEditModal(existingBookComment) {
      console.log(existingBookComment);

      this.modalTitle = "Edit Book Comment";
      this.editedCommentId = existingBookComment._id;

      this.commentData = {
        comment: existingBookComment.content,
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
    saveBook() {
      if (this.modalTitle === "Edit Book Comment") {
        this.editBookComment();
      }
    },
    async editBookComment() {
      try {
        await this.editTheComment(this.editedCommentId, this.commentData);

        await this.fetchCommentByUser(this.user._id);

        this.modal.hide();
        this.showToast(`The book comment edited successfully`, {
          type: "success",
          timeout: 2000,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    ...mapState(useCommentStore, ["commentsByUser"]),
    ...mapState(useAuthStore, ["user"]),
  },
  created() {
    this.fetchCommentByUser(this.user._id).then(() => {
    });
  },
  mounted() {
    this.modal = new Modal(this.$refs.addEditModal);
  },
};
</script>
