// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const streamService = {
  createStream: async (id, data) => {
    try {
      return await api.post(endpoints.createStream(id), data);
    } catch (err) {
      throw err;
    }
  },

  getStreams: async () => {
    try {
      return await api.get(endpoints.getStreams);
    } catch (err) {
      throw err;
    }
  },
};

export default streamService;
