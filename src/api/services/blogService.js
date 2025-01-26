// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const blogService = {
  getBlogs: async () => {
    try {
      return await api.get(endpoints.getBlogs);
    } catch (err) {
      throw err;
    }
  },

  getBlogsById: async (id) => {
    try {
      return await api.get(endpoints.getBlogById(id));
    } catch (err) {
      throw err;
    }
  },
};

export default blogService;
