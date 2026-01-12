import "./styles/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("StRoNgPaSs123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container_login">
      <h1>This is the log in page</h1>

      <form onSubmit={handleSubmit}>
        <div className="input_box">
          <input
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input 
            name="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="button_box">
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>

          <Link to="/signup">
            <button type="button">Sign up</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
