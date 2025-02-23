import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { httpService } from "@/services/http.service";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const AdminUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/unauthorized");
    }
    fetchUsers();
  }, [navigate, user]);

  const fetchUsers = async () => {
    try {
      const data = await httpService.get("/api/users/all", true);
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm(t("confirm_delete_user"))) return;
    try {
      await httpService.del(`/api/users/${userId}`, true);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-76px)] bg-background">
        <p className="text-lg font-medium text-foreground animate-fadeIn">
          {t("loading")}
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-76px)] bg-background">
        <p className="text-lg font-medium text-destructive">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-6 bg-background h-[calc(100vh-76px)]">
      <div className="bg-card text-card-foreground shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">{t("user_management")}</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 border border-border text-left text-foreground">
                  {t("name")}
                </th>
                <th className="px-4 py-2 border border-border text-left text-foreground">
                  {t("email")}
                </th>
                <th className="px-4 py-2 border border-border text-left text-foreground">
                  {t("role")}
                </th>
                <th className="px-4 py-2 border border-border text-center text-foreground">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-2 border border-border text-foreground">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 border border-border text-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border border-border text-foreground">
                    {t(user.role)}
                  </td>
                  <td className="px-4 py-2 border border-border text-center">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold px-4 py-2 rounded transition-colors"
                      >
                        {t("delete")}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-center text-muted-foreground"
                  >
                    {t("no_users_found")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
