/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminLayout, UserLayout } from "./layouts";
import {
  AccountPage,
  CartPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProductOverviewPage,
  ProductPage,
  RegisterPage,
  ResetPasswordPage,
  SearchPage,
  ThankYouPage,
  WishlistPage,
} from "./pages";
import useBook from "./hooks/useBook";
import { useEffect, useState } from "react";
import { Loader } from "./components";
import { admin_routes } from "./routes";
import AddCategory from "./pages/admin/categories_page/AddCategory";

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const { getFirstBooks, isLoading } = useBook();
  useEffect(() => {
    getFirstBooks().then(() => setShowLoader());
  }, [isLoading]);
  if (showLoader) return <Loader />;
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        {/* auth route */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />

        <Route path="products" element={<ProductPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product-overview" element={<ProductOverviewPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="thank-you" element={<ThankYouPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        {admin_routes.map(
          ({ layout, pages }) =>
            layout === "admin" &&
            pages.map(({ path, element, index }, i) => {
              if (index) {
                return <Route key={i} index element={element} />;
              } else {
                return <Route key={i} path={path} element={element} />;
              }
            })
        )}
        <Route path="/admin/category/create" element={<AddCategory />} />
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
