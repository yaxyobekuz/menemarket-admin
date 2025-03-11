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

  updatePaymentStatus: async (paymentId, status) => {
    try {
      return await api.put(endpoints.updatePaymentStatus(paymentId, status));
    } catch (err) {
      throw err;
    }
  },
};

export default paymentService;
