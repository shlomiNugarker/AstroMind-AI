import { useEffect } from "react";
import Chat from "@/components/Chat";

const Home = () => {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div
      className="flex flex-col gap-4 items-center justify-center"
      style={{ height: `calc(var(--vh, 1vh) * 100 - 72px)` }}
    >
      <Chat />
    </div>
  );
};

export default Home;
