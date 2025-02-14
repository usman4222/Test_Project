import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

function App() {
  const location = useLocation();
  const hideLayout = ["/login", "/register"];

  const shouldHideLayout = hideLayout.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <Suspense fallback={<p className="py-20 text-center">Loading...</p>}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
