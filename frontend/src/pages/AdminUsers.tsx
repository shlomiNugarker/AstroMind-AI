import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { httpService } from "@/services/http.service";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import AddCoachForm from "@/components/AddCoachForm";
import { coachService } from "@/services/coach.service";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "super_admin" | "coach" | "trainee";
}

const AdminUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "super_admin") {
      navigate("/unauthorized"); // 🔒 רק סופר אדמין יכול לגשת
    }
    fetchUsers();
  }, [navigate, user]);

  const fetchUsers = async () => {
    try {
      const data = await coachService.getCoaches();
      setUsers(data.filter((u: User) => u.role !== "trainee")); // ❌ מסנן חניכים מהרשימה
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await httpService.del(`/api/users/${userId}`, true);
      setUsers(users.filter((u) => u._id !== userId));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const handleCoachAdded = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // ✅ מעדכן את הרשימה אחרי הוספה
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t("coach_management")}</h1>

      {/* ✅ הוספת טופס רק למאמנים */}
      <AddCoachForm onCoachAdded={handleCoachAdded} />

      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">{t("name")}</th>
            <th className="border p-2">{t("email")}</th>
            <th className="border p-2">{t("role")}</th>
            <th className="border p-2">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{t(user.role)}</td>
              <td className="border p-2">
                {user.role !== "super_admin" && (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    {t("delete")}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
