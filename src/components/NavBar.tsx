import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./styles/NavBar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* LEFT */}
        <div className="navbar__left">
          <span className="navbar__logo">NoName</span>

          <nav className="navbar__nav">
            <NavLink to="/" className="navbar__link">
              Головна
            </NavLink>
            <NavLink to="/profile" className="navbar__link">
              Кабінет
            </NavLink>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="navbar__right">
          {user ? (
            <button className="navbar__button" onClick={handleLogout}>
              Вийти
            </button>
          ) : (
            <NavLink to="/login" className="navbar__link">
              Увійти
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
