import { Route, Routes } from "react-router-dom";
import { UserLayout } from "./common/layouts";
import { HomePage } from "./common/pages";
import "./App.scss";
import "swiper/css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
