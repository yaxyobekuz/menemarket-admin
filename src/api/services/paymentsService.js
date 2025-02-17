// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const paymentService = {
  getPayments: async () => {
    try {
      return await api.get(endpoints.getPayments);
    } catch (err) {
      throw err;
    }
  },
};

export default paymentService;
