import "./styles/LoginPage.css"
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
        <h1>This is the log in page</h1>
        <div className="input_box">
            <input placeholder="email"></input>
            <input placeholder="password"></input>
        </div>
        <div className="button_box">
        <Link to="/">
            <button>Log in</button>
        </Link>
        <Link to="/signup">
            <button>Sign up</button>
        </Link>
        </div>
    </div>
  );
}
export default LoginPage;