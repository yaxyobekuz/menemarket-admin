// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const streamService = {
  getStream: async (id) => {
    try {
      return await api.get(endpoints.getStream(id));
    } catch (err) {
      throw err;
    }
  },
};

export default streamService;
