import { useEffect, useState } from "react";
import { httpService } from "@/services/http.service";
import { useAuth } from "@/context/AuthContext";
import { t } from "i18next";
import { isHebrew } from "@/services/utils";

const Chat = () => {
  const userId = useAuth().user?._id;

  const [messages, setMessages] = useState<
    { role: string; text: string; updatedAt: Date }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId || messages.length > 0) return;
      try {
        const response = await httpService.get(`/api/chat/history`, true);
        setMessages(response.messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchHistory();
  }, [messages.length, userId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input, updatedAt: new Date() };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const botResponse = await httpService.post(
        "/api/chat",
        { message: input },
        true
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: botResponse?.massege || "Error fetching response",
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 max-h-[80vh] w-full max-w-md rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-semibold py-4">
        <span className="text-blue-500">{t("chat")}</span>{" "}
        {t("with_the_assistant")}
      </h1>
      <hr className="my-2" />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse scroll-smooth space-y-2">
        {loading && (
          <div className="mb-2 p-2 rounded-xl max-w-xs mr-auto bg-gray-300 text-black">
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-black"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <span>{t("loading")}</span>
            </div>
          </div>
        )}
        {messages
          .slice()
          .reverse()
          .map((msg, index) => (
            <div
              dir={isHebrew(msg.text) ? "rtl" : "ltr"}
              key={index}
              className={`mb-2 p-3 rounded-xl max-w-xs ${
                msg.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-300 text-black"
              } shadow-md`}
            >
              {msg.text}
            </div>
          ))}
      </div>
      <div className="p-4 bg-white shadow-lg flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
          placeholder={t("type_your_message_here")}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          {t("send")}
        </button>
      </div>
    </div>
  );
};

export default Chat;
