import { Route, Routes } from "react-router-dom";
import { UserLayout } from "./common/layouts";
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
} from "./common/pages";
import "./App.scss";
import "swiper/css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />

          {/* authenticate route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
