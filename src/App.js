import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import KidsBooksPage from "./pages/KidsBooksPage";
import AdultBooksPage from "./pages/AdultBooksPage";
import SubjectBooksPage from "./pages/SubjectBooksPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessfulPage from "./pages/PaymentSuccessfulPage";
import CartPage from "./pages/CartPage";
import AddBookPage from "./pages/AddBookPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logout from "./components/Logout";

// Utility to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem("token");

// PrivateRoute component to protect routes
const PrivateRoute = ({ children, redirectTo }) => {
  return isAuthenticated() ? children : <Navigate to={redirectTo} />;
};

// Layout component to control when to show the Header/Footer
const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Header and Footer on specific routes (login and signup)
  const hideLayout =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/subjects/:subject" element={<SubjectBooksPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-successful" element={<PaymentSuccessfulPage />} />
          <Route
            path="/kids-books"
            element={
              <PrivateRoute redirectTo="/login">
                <KidsBooksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/adult-books"
            element={
              <PrivateRoute redirectTo="/login">
                <AdultBooksPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
