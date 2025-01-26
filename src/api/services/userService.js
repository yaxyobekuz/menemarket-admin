// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const userService = {
  createUser: async (data) => {
    try {
      return await api.post(endpoints.createUser, data);
    } catch (err) {
      throw err;
    }
  },

  logout: async () => {
    try {
      return await api.post(endpoints.logout);
    } catch (err) {
      throw err;
    }
  },

  loginUser: async (data) => {
    try {
      return await api.post(endpoints.loginUser, data);
    } catch (err) {
      throw err;
    }
  },

  getUserData: async () => {
    try {
      return await api.get(endpoints.getUserData);
    } catch (err) {
      throw err;
    }
  },

  verifyOtp: async (data) => {
    try {
      return await api.post(endpoints.verifyOtp, data);
    } catch (err) {
      throw err;
    }
  },

  resendOtp: async (data) => {
    try {
      return await api.post(endpoints.resendOtp, data);
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
