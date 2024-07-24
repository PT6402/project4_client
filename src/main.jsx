import "./index.css";
import App from "./App.jsx";
import store from "./context/store.jsx";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);
