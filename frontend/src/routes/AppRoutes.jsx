import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import CategoryPage from "../pages/CategoryPage";
import CalculatorPage from "../pages/CalculatorPage";

import GlobalCursor from "../components/GlobalCursor";

export default function AppRoutes() {
  return (
    <>
      <GlobalCursor />

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/category/:category"
          element={<CategoryPage />}
        />

        <Route
          path="/calculator/:type"
          element={<CalculatorPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}