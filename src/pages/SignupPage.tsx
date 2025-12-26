import "./styles/SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(name, email, password);
      // якщо signup не повертає токен — просто перекидаємо на логін
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="e">
      <h1>This is the sign up page</h1>

      <form onSubmit={handleSubmit}>
        <div className="input_boxs">
          <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="button_box">
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>

          <Link to="/login">
            <button type="button">Go to log in</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
