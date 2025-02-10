// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const productService = {
  getProducts: async () => {
    try {
      return await api.get(endpoints.getProducts);
    } catch (err) {
      throw err;
    }
  },

  createProduct: async (data) => {
    try {
      return await api.post(endpoints.createProduct, data);
    } catch (err) {
      throw err;
    }
  },

  getProduct: async (id) => {
    try {
      return await api.get(endpoints.getProduct(id));
    } catch (err) {
      throw err;
    }
  },

  getProductComments: async (id) => {
    try {
      return await api.get(endpoints.getProductComments(id));
    } catch (err) {
      throw err;
    }
  },

  deleteProduct: async (id) => {
    try {
      return await api.delete(endpoints.deleteProduct(id));
    } catch (err) {
      throw err;
    }
  },
};

export default productService;
