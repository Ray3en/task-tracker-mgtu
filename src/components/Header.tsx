import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { ThemeContext } from "../context/themeContext";
import { useAuth } from "../providers/AuthProvider";

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const logoutHandle = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className={`header-${theme}`}>
      <h2>Task manager</h2>
      <nav>
        <ul>
          <li><Link to="/tasks">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>

          
          <li><Link to="/profile">Profile</Link></li>
          {/* {isAuthenticated && <li><Link to="/profile">Profile</Link></li>} */}
        </ul>
      </nav>
      <div>
        <label>
          <input
            type="checkbox"
            role="switch"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          Темная тема
        </label>
        {isAuthenticated ? (
          <Button onClick={logoutHandle} disabled={isLoggingOut}>Выйти</Button>
        ) : (
          <Button component={Link} to="/login">Войти</Button>
        )}
      </div>
    </header>
  );
}

export default Header;
