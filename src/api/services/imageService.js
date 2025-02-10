// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const imageService = {
  logout: async () => {
    try {
      return await api.post(endpoints.logout);
    } catch (err) {
      throw err;
    }
  },
};

export default imageService;
