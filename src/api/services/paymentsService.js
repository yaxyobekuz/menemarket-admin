// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const paymentService = {
  createPayment: async (data) => {
    try {
      return await api.post(endpoints.createPayment, data);
    } catch (err) {
      throw err;
    }
  },
};

export default paymentService;
