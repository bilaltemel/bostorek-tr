import { defineStore } from "pinia";
import axios from "axios";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    comments: [],
    commentsForBook: [],
    commentsByUser: [],
  }),
  actions: {
    async addNewComment(newComment) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/comments",
          newComment
        );

        this.comments.push(response.data.comment);
      } catch (error) {
        throw error.response.data;
      }
    },
    async fetchCommentsForBook(bookId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/comments/book/${bookId}`
        );

        this.commentsForBook = response.data.comments;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCommentByUser(userId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/comments/user/${userId}`
        );
        // console.log(response.data);

        this.commentsByUser = response.data.comments;
      } catch (error) {
        console.log(error);
      }
    },
    async editTheComment(commentId, commentData) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/comments/${commentId}`,
          commentData
        );

        const updatedCommentData = response.data.comment;
        console.log("updatedCommentData :>> ", updatedCommentData);

        const commentIndex = this.comments.findIndex(
          (comment) => comment._id === this.commentId
        );
        console.log("commentIndex :>> ", commentIndex);

        if (commentIndex !== -1) {
          this.commentsByUser[commentIndex] = updatedCommentData;
        }

        this.comments.splice(commentIndex, 1, updatedCommentData);
      } catch (error) {
        throw error.response.data;
      }
    },
  },
});
