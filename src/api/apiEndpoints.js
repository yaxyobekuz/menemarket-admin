const apiEndpoints = {
  // Donates
  getDonates: "api/donate/all",

  // Auth
  login: "login",
  logout: "logout",
  getUserProfile: "profile",
  verifyOtp: "api/users/verifyOTP",

  // Payments
  createPayment: "api/payments",
  getPayments: "api/payments/admin",

  // Users
  getUsers: "api/users",
  createWorker: "api/users/worker",
  getWorkers: "api/users/workers/all",
  deleteUser: (id) => `api/users/${id}`,

  // News
  getNews: "api/news",
  createNews: "api/news",
  deleteNews: (id) => `api/news/${id}`,
  getNewsById: (id) => `api/news/${id}`,

  // Streams
  getStream: (id) => `api/oqim/${id}`,
  createStream: (id) => `api/oqim/${id}`,

  // Blogs
  getBlogs: "api/blogs",
  createBlog: "api/blogs",
  deleteBlogs: (id) => `api/blogs/${id}`,
  getBlogById: (id) => `api/blogs/${id}`,

  // Orders
  getOrders: "api/orders",
  getOrder: (id) => `api/orders/${id}`,
  distributeOrder: (id) => `api/orders/${id}/send`,

  // Images
  deleteImage: "files/delete",
  uploadImage: "files/upload/media",
  uploadProductImage: "files/upload/product",

  // Comments
  getComments: "api/comments",
  deleteComment: (id) => `api/comments/${id}`,
  createComment: (id) => `api/comments/${id}`,

  // Products
  getProducts: "api/products",
  createProduct: "api/products",
  getProduct: (id) => `api/products/${id}`,
  updateProduct: (id) => `api/products/${id}`,
  deleteProduct: (id) => `api/products/${id}`,
  getProductComments: (id) => `api/comments/product/${id}`,
};

export default apiEndpoints;
