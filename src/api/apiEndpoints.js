const apiEndpoints = {
  logout: "logout",
  loginUser: "login",
  getUserData: "profile",
  createUser: "api/users",
  verifyOtp: "api/users/verifyOTP",
  resendOtp: "api/users/resendOTP",

  getUsers: "api/users",
  deleteUser: (id) => `api/users/${id}`,

  getProducts: "api/products",
  getProduct: (id) => `api/products/${id}`,
  deleteProduct: (id) => `api/products/${id}`,
  getProductComments: (id) => `api/comments/product/${id}`,

  getNews: "api/news",
  deleteNews: (id) => `api/news/${id}`,
  getNewsById: (id) => `api/news/${id}`,

  getBlogs: "api/blogs",
  getBlogById: (id) => `api/blogs/${id}`,

  getStream: (id) => `api/oqim/${id}`,
  createStream: (id) => `api/oqim/${id}`,

  createOrder: (id) => `api/orders/${id}`,

  createPayment: "api/payments",

  getComments: "api/comments",
  deleteComment: (id) => `api/comments/${id}`,
  createComment: (id) => `api/comments/${id}`,

  getOrders: "api/orders",
};

export default apiEndpoints;
