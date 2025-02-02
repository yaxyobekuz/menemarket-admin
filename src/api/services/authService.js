// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const authService = {
  logout: async () => {
    try {
      return await api.post(endpoints.logout);
    } catch (err) {
      throw err;
    }
  },

  login: async (data) => {
    try {
      return await api.post(endpoints.login, data);
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

  getUserProfile: async () => {
    try {
      return await api.get(endpoints.getUserProfile);
    } catch (err) {
      throw err;
    }
  },
};

export default authService;
