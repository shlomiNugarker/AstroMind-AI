import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case "coach":
        navigate("/my-trainees");
        break;
      case "super_admin":
        navigate("/admin/users");
        break;
      case "trainee":
        navigate("/trainees-dashboard");
        break;
      default:
        break;
    }
  }, [user, navigate]);

  return <h1>Welcome to Home Page</h1>;
};

export default Home;
