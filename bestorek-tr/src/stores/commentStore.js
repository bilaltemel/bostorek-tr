import { defineStore } from "pinia";
import axios from "axios";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    comments: [],
    commentsForBook: [],
    commentsByUser: [],
  }),
  actions: {
    async fetchComments() {
      try {
        const response = await axios.get(
          "https://bostorek-tr-production.up.railway.app/api/v1/comments"
        );
        // console.log("response.data.comments", response.data.comments);
        this.comments = response.data.comments;
      } catch (error) {
        console.error("Error at fetching comments", error);
      }
    },
    async addNewComment(newComment) {
      try {
        await axios.post("https://bostorek-tr-production.up.railway.app/api/v1/comments", newComment);

        await this.fetchComments();
      } catch (error) {
        throw error.response.data;
      }
    },
    async fetchCommentsForBook(bookId) {
      try {
        const response = await axios.get(
          `https://bostorek-tr-production.up.railway.app/v1/comments/book/${bookId}`
        );

        this.commentsForBook = response.data.comments;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCommentByUser(userId) {
      try {
        const response = await axios.get(
          `https://bostorek-tr-production.up.railway.app/v1/comments/user/${userId}`
        );

        this.commentsByUser = response.data.comments;
      } catch (error) {
        console.log(error);
      }
    },
    async editTheComment(commentId, commentData) {
      try {
        const response = await axios.put(
          `https://bostorek-tr-production.up.railway.app/v1/comments/${commentId}`,
          commentData
        );

        const updatedCommentData = response.data.comment;

        const commentIndex = this.comments.findIndex(
          (comment) => comment._id === this.commentId
        );

        if (commentIndex !== -1) {
          this.commentsByUser[commentIndex] = updatedCommentData;
        }

        this.comments.splice(commentIndex, 1, updatedCommentData);
      } catch (error) {
        throw error.response.data;
      }
    },
    async upvoteComment(commentId) {
      
      try {
        const response = await axios.post(
          `https://bostorek-tr-production.up.railway.app/v1/comments/${commentId}/upvote`
        );

        const upvotedComment = response.data.comment;

        const commentIndex = this.comments.findIndex(
          (comment) => comment._id === upvotedComment._id
        );

        if (commentIndex !== -1) {
          this.comments[commentIndex] = upvotedComment;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async downvoteComment(commentId) {
      try {
        const response = await axios.post(
          `https://bostorek-tr-production.up.railway.app/v1/comments/${commentId}/downvote`
        );

        const updatedComment = response.data.comment;

        const commentIndex = this.comments.findIndex(
          (comment) => comment._id === upvotedComment._id
        );

        if (commentIndex !== -1) {
          this.comments[commentIndex] = upvotedComment;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
