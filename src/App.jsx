import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseListingPage from "./pages/CourseListingPage";
import PlanSelectionPage from "./pages/PlanSelectionPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseListingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <PlanSelectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
