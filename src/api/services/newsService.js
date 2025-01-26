// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const newsService = {
  getNews: async () => {
    try {
      return await api.get(endpoints.getNews);
    } catch (err) {
      throw err;
    }
  },

  getNewsById: async (id) => {
    try {
      return await api.get(endpoints.getNewsById(id));
    } catch (err) {
      throw err;
    }
  },
};

export default newsService;
