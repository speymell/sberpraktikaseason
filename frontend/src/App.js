import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Company from "./pages/Company";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Estate from "./pages/Estate";
import EstateSale from "./components/estate/EstateSale";
import Finances from "./pages/Finances";
import Clients from "./pages/Clients";

function App() {
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  };
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = checkAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // маршрут /test использовался для ручного добавленя данных в localstorage, когда работал без backend'а

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/company"
            element={
              <ProtectedRoute>
                <Company />
              </ProtectedRoute>
            }
          />
          <Route
            path="/realty"
            element={
              <ProtectedRoute>
                <Estate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <Clients>
                <Finances />
              </Clients>
            }
          />
          <Route
            path="/finances"
            element={
              <ProtectedRoute>
                <Finances />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
