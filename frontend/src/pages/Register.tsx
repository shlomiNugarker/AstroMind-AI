import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("trainee"); // ✅ ברירת מחדל: מתאמן
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await register(name, email, password, role);
      toast.success(t("register_success"));
      alert("Registration successful!");
      window.location.href = "/login";
    } catch (err) {
      setError((err as Error)?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>{t("register_page")}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />

        {/* ✅ בוחר את סוג המשתמש */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="trainee">Trainee</option>
          <option value="coach">Coach</option>
        </select>

        <button type="submit">{t("register")}</button>
      </form>
    </div>
  );
};

export default Register;
