import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  actions: {
    async updateUserDetails(updatedUserData) {
      try {
        const response = await axios.put(
          "https://bostorek-tr-production.up.railway.app/api/v1/user/updateUser",
          updatedUserData
        );
        return response.data;
      } catch (error) {
        console.error("Error at updating user details", error);
        throw error.response.data;
      }
    },
  },
});
