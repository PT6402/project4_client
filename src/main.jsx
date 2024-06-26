import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./context/store.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="522149207280-0besags21pb05hdp0c8juu2vmg0hc1be.apps.googleusercontent.com">
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </GoogleOAuthProvider>
);
