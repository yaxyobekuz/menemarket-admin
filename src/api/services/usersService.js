// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const userService = {
  createWorker: async (data) => {
    try {
      return await api.post(endpoints.createWorker, data);
    } catch (err) {
      throw err;
    }
  },

  getUsers: async () => {
    try {
      return await api.get(endpoints.getUsers);
    } catch (err) {
      throw err;
    }
  },

  getUserById: async (id) => {
    try {
      return await api.get(endpoints.getUserById(id));
    } catch (err) {
      throw err;
    }
  },

  getWorkers: async () => {
    try {
      return await api.get(endpoints.getWorkers);
    } catch (err) {
      throw err;
    }
  },

  deleteUser: async (id) => {
    try {
      return await api.delete(endpoints.deleteUser(id));
    } catch (err) {
      throw err;
    }
  },

  deleteUser: async (id) => {
    try {
      return await api.delete(endpoints.deleteUser(id));
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
