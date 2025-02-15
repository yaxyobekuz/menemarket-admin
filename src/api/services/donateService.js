// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const donateService = {
  getDonates: async () => {
    try {
      return await api.get(endpoints.getDonates);
    } catch (err) {
      throw err;
    }
  },
};

export default donateService;
