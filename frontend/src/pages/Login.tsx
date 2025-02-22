import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaLock, FaEnvelope } from "react-icons/fa";
import Logo from "@/components/Logo";

const Login: React.FC = () => {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      toast.success(t("login_success"));
      navigate("/");
    } catch (err) {
      setError((err as Error)?.message || t("login_failed"));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="p-6 bg-card shadow-lg rounded-xl w-full max-w-sm animate-fade-in border border-border">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          {t("login_page")}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">
              {t("email")}
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-muted-foreground" />
              <input
                dir="ltr"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 pl-10 w-full bg-input border border-border rounded-md focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">
              {t("password")}
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 pl-10 w-full bg-input border border-border rounded-md focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition font-medium shadow-md"
          >
            {t("login")}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              {t("no_account")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
