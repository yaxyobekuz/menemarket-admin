// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const blogsService = {
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

  deleteBlogs: async (id) => {
    try {
      return await api.delete(endpoints.deleteBlogs(id));
    } catch (err) {
      throw err;
    }
  },
};

export default blogsService;
