const apiEndpoints = {
  // Payments
  createPayment: "api/payments",

  // Auth
  login: "login",
  logout: "logout",
  getUserProfile: "profile",
  verifyOtp: "api/users/verifyOTP",

  // Users
  getUsers: "api/users",
  createWorker: "api/users/worker",
  deleteUser: (id) => `api/users/${id}`,

  // News
  getNews: "api/news",
  deleteNews: (id) => `api/news/${id}`,
  getNewsById: (id) => `api/news/${id}`,

  // Streams
  getStream: (id) => `api/oqim/${id}`,
  createStream: (id) => `api/oqim/${id}`,

  // Blogs
  getBlogs: "api/blogs",
  deleteBlogs: (id) => `api/blogs/${id}`,
  getBlogById: (id) => `api/blogs/${id}`,

  // Orders
  getOrders: "api/orders",
  createOrder: (id) => `api/orders/${id}`,

  // Images
  deleteImage: (id) => `files/${id}`,
  uploadProductImage: "files/upload/product",

  // Comments
  getComments: "api/comments",
  deleteComment: (id) => `api/comments/${id}`,
  createComment: (id) => `api/comments/${id}`,

  // Products
  getProducts: "api/products",
  createProduct: "api/products",
  getProduct: (id) => `api/products/${id}`,
  deleteProduct: (id) => `api/products/${id}`,
  getProductComments: (id) => `api/comments/product/${id}`,
};

export default apiEndpoints;
