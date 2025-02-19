import { useState } from "react";
import { t } from "i18next";
import { traineeService } from "@/services/traineeService";
import { Trainee } from "../pages/MyTrainees";

interface AddTraineeFormProps {
  onTraineeAdded: (newTrainee: Trainee) => void;
}

const AddTraineeForm = ({ onTraineeAdded }: AddTraineeFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const newTrainee = await traineeService.addTrainee(name, email, "123456"); // defoult password for new trainee - change it later

      onTraineeAdded(newTrainee.user);
      setName("");
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to add trainee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">{t("add_trainee")}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-2">
        <label className="block font-semibold">{t("name")}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block font-semibold">{t("email")}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? t("adding") : t("add_trainee")}
      </button>
    </form>
  );
};

export default AddTraineeForm;
