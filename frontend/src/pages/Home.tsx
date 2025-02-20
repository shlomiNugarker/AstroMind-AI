import Chat from "@/components/Chat";
import PredictionForm from "@/components/PredictionForm";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-80px)]">
      <PredictionForm />
      <Chat />
    </div>
  );
};

export default Home;
