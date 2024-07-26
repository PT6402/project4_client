/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import { AdminLayout, UserLayout } from "./layouts";
import {
  AccountPage,
  AuthorPage,
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
import { useEffect, useState } from "react";
import { Loader } from "./components";
import { admin_routes } from "./routes";
import AddCategory from "./pages/admin/categories_page/AddCategory";
import EditCategory from "./pages/admin/categories_page/EditCategory";
import { useLoadFirst } from "./hooks";
import AddAuthor from "./pages/admin/authors_page/AddAuthor";
import AddPackage from "./pages/admin/packages_page/AddPackage";
import RoutePaymentSuccess from "./routes/RoutePaymentSuccess";
import OrderDetailPage from "./pages/admin/orders_page/OrderDetailPage";
import AddPublisher from "./pages/admin/publishers_page/AddPublisher";
import EditPublisher from "./pages/admin/publishers_page/EditPublisher";

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const { load, isLoading } = useLoadFirst();
  useEffect(() => {
    (async () => await load())();
  }, []);
  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
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
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product-overview/:id" element={<ProductOverviewPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="thank-you" element={<ThankYouPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="author" element={<AuthorPage />} />
        <Route
          path="/payment/success/:idOrder/:tokenPayment"
          Component={RoutePaymentSuccess}
        />
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
        <Route path="/admin/author/create" element={<AddAuthor />} />
        <Route path="/admin/category/create" element={<AddCategory />} />
        <Route path="/admin/category/edit/:id" element={<EditCategory />} />
        <Route path="/admin/package/create" element={<AddPackage />} />
        <Route path="/admin/order/:id" element={<OrderDetailPage />} />
        <Route path="/admin/publisher/create" element={<AddPublisher />} />
        <Route path="/admin/publisher/edit/:id" element={<EditPublisher />} />
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
