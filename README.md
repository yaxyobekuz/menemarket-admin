# 💼 Mene Market Admin V2

This project is built with **React**, **Vite**, and **TailwindCSS** to deliver a fast and responsive web application with a streamlined development experience.

![Project Preview](https://menemarketadmin.uz/preview.jpg)

---

### 🚀 **Live Demo**

🔗 [View Live](https://menemarketadmin.uz)

## 📌 Features

- **Vite**: A fast development build tool with Hot Module Replacement (HMR).
- **React**: A JavaScript library for building dynamic user interfaces.
- **TailwindCSS**: A utility-first CSS framework that provides pre-configured styling for rapid UI development.
- **ESLint**: Configured for linting JavaScript/JSX files for code quality.

## 🔥 Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or Yarn (optional)

### 📥 Installation

1️⃣ Clone the repository:

```bash
git clone https://github.com/yaxyobekuz/menemarket-admin.git
cd menemarket-admin
```

2️⃣ Install dependencies:

```bash
npm install
# or
yarn install
```

### 💾 Development Server

To start the development server with HMR:

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 🏗 Build for Production

To create a production build of your app:

```bash
npm run build
# or
yarn build
```

The production-ready files will be in the `dist/` directory.

### 👁‍🗨 Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

### ⛓️ Linting

To lint your files:

```bash
npm run lint
# or
yarn lint
```

## 🔑 Api Configuration

Ensure you have a `.env` file in the root directory with the following Api credentials:

```sh
VITE_API_BASE_URL=YOUR_API_BASE_URL
```
## 📂 Project Structure

```bash
├── public/              # Public assets (favicon, etc.)
├── src/                 # Source files
│   ├── assets/          # Static assets (images, icons, etc.)
│   ├── components/      # Reusable React components
│   ├── pages/           # Page components
│   ├── layouts/         # Layout components
│   ├── index.css        # Tailwind CSS configuration and global styles
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point for the app
│   └── ...              # Others...
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # TailwindCSS configuration
├── vite.config.js       # Vite configuration
├── index.html           # Main HTML file
└── package.json         # Project metadata and dependencies
```

## ⚙️ Customizing TailwindCSS

TailwindCSS is already configured, but you can modify the `tailwind.config.js` file to extend or customize the theme, such as adding new colors, fonts, or spacing values.

Example:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#39965F",
        // ... More colors
      },
    },
  },
};
```

## 🏃 Scripts

- **`dev`**: Starts the development server with HMR.
- **`build`**: Builds the application for production.
- **`preview`**: Previews the production build.
- **`lint`**: Lints your code with ESLint.

## 🛠 Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A modern front-end build tool for blazing-fast development.
- **TailwindCSS**: Utility-first CSS for styling and layout.
- **PostCSS**: CSS tool for transforming styles with plugins like TailwindCSS.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.

## 🔍 Learn More

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)

---

## 📞 **Contact**

If you have any questions or feedback, feel free to reach out:  
📧 Email: [pubgn9642@gmail.com](mailto:pubgn9642@gmail.com)  
🔗 Website: [yaxyobekk.uz](https://yaxyobekk.uz/en)
