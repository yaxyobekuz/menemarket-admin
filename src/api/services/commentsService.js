// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const commentsService = {
  createComment: async (id, data) => {
    try {
      return await api.post(endpoints.createComment(id), data);
    } catch (err) {
      throw err;
    }
  },

  getComments: async () => {
    try {
      return await api.get(endpoints.getComments);
    } catch (err) {
      throw err;
    }
  },

  deleteComment: async (id) => {
    try {
      return await api.delete(endpoints.deleteComment(id));
    } catch (err) {
      throw err;
    }
  },
};

export default commentsService;
