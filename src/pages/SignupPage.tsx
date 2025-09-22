import "./styles/SignupPage.css"
import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div>
        <div className="e">
        <h1>This is the sign up page</h1>
            <div className="input_boxs">
                <input placeholder="name"></input>
                <input placeholder="email"></input>
                <input placeholder="password"></input>
            </div>
            <div className="button_box">
                 <Link to="/">
                    <button>Sign up</button>
                </Link>
                 <Link to="/login">
                    <button>Go to log in</button>
                </Link>
            </div>
    </div>
        </div>
  );
}
export default SignupPage;<h1>This is the sign up page</h1>