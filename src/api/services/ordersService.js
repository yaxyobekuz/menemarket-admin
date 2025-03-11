// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const ordersService = {
  getOrders: async () => {
    try {
      return await api.get(endpoints.getOrders);
    } catch (err) {
      throw err;
    }
  },

  getOrder: async (id) => {
    try {
      return await api.get(endpoints.getOrder(id));
    } catch (err) {
      throw err;
    }
  },

  distributeOrder: async (id, data) => {
    try {
      return await api.put(endpoints.distributeOrder(id), data);
    } catch (err) {
      throw err;
    }
  },
};

export default ordersService;
