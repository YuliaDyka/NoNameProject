import { useAuth } from "../auth/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-xl font-semibold">Особистий кабінет</h1>
      <div className="mt-3 rounded-lg bg-white p-4 border">
        <div className="text-sm text-gray-600">Email</div>
        <div className="font-medium">{user?.email}</div>
      </div>
    </div>
  );
}
