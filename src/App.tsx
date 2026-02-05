import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import {MoviesPage} from "./pages/MoviesPage";
import Profile from "./pages/ProfilePage";

import { AuthProvider } from "./auth/AuthContext";
import  ProtectedRoute  from './auth/ProtectedRoute'

import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Публічні сторінки без Layout (або зроби окремий AuthLayout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Все інше — з Navbar через Layout */}
          <Route element={<Layout />}>
            <Route path="/movies" element={<MoviesPage />} />

            {/* Protected група */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
