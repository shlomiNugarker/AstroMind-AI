import { useState } from "react";
import { httpService } from "@/services/http.service";

const PredictionForm = () => {
  const [birthdate, setBirthdate] = useState("");
  const [lang, setLang] = useState("en");
  const [prediction, setPrediction] = useState<{
    prediction: string;
    zodiac: string;
  }>();
  const [error, setError] = useState("");

  const fetchPrediction = async () => {
    setError("");
    setPrediction(undefined);

    if (!birthdate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      setError("Invalid birthdate. Please use format YYYY-MM-DD");
      return;
    }

    try {
      const response = await httpService.get(
        `/api/predictions?birthdate=${birthdate}&lang=${lang}`
      );

      console.log("Prediction response:", response);

      setPrediction(response);
    } catch (err) {
      setError("Failed to fetch prediction. Please try again.");
      console.error("Error fetching prediction:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Get Your Prediction</h2>
      <input
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      >
        <option value="en">English</option>
        <option value="he">Hebrew</option>
      </select>
      <button
        onClick={fetchPrediction}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Get Prediction
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {prediction && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Prediction:</h3>
          <h1>
            {prediction.zodiac} - {birthdate}
          </h1>
          <p>{prediction.prediction}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
