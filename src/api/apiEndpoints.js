const apiEndpoints = {
  logout: "logout",
  loginUser: "login",
  getUserData: "profile",
  createUser: "api/users",
  verifyOtp: "api/users/verifyOTP",
  resendOtp: "api/users/resendOTP",

  getProducts: "api/products",
  getProduct: (id) => `api/products/${id}`,
  deleteProduct: (id) => `api/products/${id}`,
  getProductComments: (id) => `api/comments/product/${id}`,

  getNews: "api/news",
  getNewsById: (id) => `api/news/${id}`,

  getBlogs: "api/blogs",
  getBlogById: (id) => `api/blogs/${id}`,

  getStream: (id) => `api/oqim/${id}`,
  createStream: (id) => `api/oqim/${id}`,

  createOrder: (id) => `api/orders/${id}`,

  createPayment: "api/payments",

  createComment: (id) => `api/comments/${id}`,
};

export default apiEndpoints;
