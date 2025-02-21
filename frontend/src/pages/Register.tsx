import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("passwords_do_not_match"));
      return;
    }

    try {
      await register(name, email, password);
      toast.success(t("register_success"));
      window.location.href = "/login";
    } catch (err) {
      setError((err as Error)?.message || t("register_failed"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-md bg-card p-6 rounded-lg shadow-lg border border-border animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-4">
          {t("register_page")}
        </h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("name")}
              required
              className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("email")}
              required
              className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("password")}
              required
              className="w-full p-3 pl-10 pr-10 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-muted-foreground"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("confirm_password")}
              required
              className="w-full p-3 pl-10 pr-10 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-medium shadow-md"
          >
            {t("register")}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              {t("have_account")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
