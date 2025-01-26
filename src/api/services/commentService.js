// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const commentService = {
  createComment: async (id, data) => {
    try {
      return await api.post(endpoints.createComment(id), data);
    } catch (err) {
      throw err;
    }
  },
};

export default commentService;
