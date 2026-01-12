import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.jpg"
import "./styles/ProfilePage.css"

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="prof_page_name">Your profile</h1>
      <div className="prof_container">
        <div>
          <img src={logo} alt="Profile" className="img_profile"/>
        </div>
        <div>
          <div className="text-sm text-gray-600">Email</div>
          <div className="font-medium">{user?.username}</div>
        </div>
      </div>
      <div className="mt-3 rounded-lg bg-white p-4 border">
      </div>
    </div>
  );
}
