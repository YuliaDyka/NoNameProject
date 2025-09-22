import "./styles/HomePage.css"
import { Link } from "react-router-dom";

function HomePage() {
  return  (
    <div>
        <h1>This is the home page</h1>
        <Link to="/login">
            <button>Log out</button>
        </Link>
    </div>
  );
}
export default HomePage;