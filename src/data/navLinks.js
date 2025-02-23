export default {
  main: [
    {
      path: "/",
      label: "Bosh sahifa",
    },
    {
      path: "/products",
      label: "Mahsulotlar",
    },
    {
      path: "/streams",
      label: "Oqimlar",
    },
    {
      path: "/orders",
      label: "Buyurtmalar",
    },
    {
      path: "/users",
      label: "Foydalanuvchilar",
    },
    {
      path: "/comments",
      label: "Izohlar",
    },
    {
      path: "/payments",
      label: "To'lovlar",
    },
    {
      path: "/contests",
      label: "Konkurslar",
    },
    {
      path: "/donation-box",
      label: "Hayriya qutisi",
    },
    {
      path: "/news",
      label: "Yangiliklar",
    },
    {
      path: "/blogs",
      label: "Bloglar",
    },
    {
      path: "/profile",
      label: "Profil",
    },
    {
      path: "/settings",
      label: "Sozlamalar",
    },
  ],

  users: [
    {
      end: true,
      path: "/users",
      label: "Asosiy",
    },
    {
      path: "/users/create-worker",
      label: "Ishchi yaratish",
    },
  ],

  products: [
    {
      end: true,
      path: "/products",
      label: "Asosiy",
    },
    {
      path: "/products/create",
      label: "Yaratish",
    },
    {
      path: "/products/edit",
      label: "Tahrirlash",
    },
  ],

  streams: [
    {
      end: true,
      disabled: true,
      path: "/streams",
      label: "Asosiy",
    },
    {
      path: "/streams",
      label: "Qidirish",
    },
  ],

  orders: [
    {
      end: true,
      path: "/orders",
      label: "Asosiy",
    },
  ],

  comments: [
    {
      end: true,
      path: "/comments",
      label: "Asosiy",
    },
  ],

  news: [
    {
      end: true,
      path: "/news",
      label: "Asosiy",
    },
    {
      path: "/news/create",
      label: "Yaratish",
    },
  ],

  blogs: [
    {
      end: true,
      path: "/blogs",
      label: "Asosiy",
    },
    {
      path: "/blogs/create",
      label: "Yaratish",
    },
  ],

  donate: [
    {
      end: true,
      path: "/donation-box",
      label: "Asosiy",
    },
    {
      disabled: true,
      path: "/donation-box/withdraw",
      label: "Mablag' yechish",
    },
  ],

  payments: [
    {
      end: true,
      path: "/payments",
      label: "Asosiy",
    },
    {
      disabled: true,
      path: "/payments/history",
      label: "Tarix",
    },
  ],

  profile: [
    {
      end: true,
      path: "/profile",
      label: "Asosiy",
    },
    {
      disabled: true,
      path: "/profile/edit",
      label: "Tahrirlash",
    },
  ],
};
