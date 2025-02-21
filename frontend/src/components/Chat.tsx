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
    <div className="flex flex-col bg-background max-h-[80vh] w-full md:max-w-md xl:max-w-xl rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-semibold py-4">
        <span className="text-primary">{t("chat")}</span>{" "}
        <span className="text-foreground">{t("with_the_assistant")}</span>
      </h1>
      <hr className="my-2 border-border" />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse scroll-smooth space-y-2">
        {loading && (
          <div className="mb-2 p-2 rounded-xl max-w-xs mr-auto bg-secondary text-secondary-foreground shadow-md">
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
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
              key={index}
              dir={isHebrew(msg.text) ? "rtl" : "ltr"}
              className={`m-3 p-3 rounded-xl  shadow-md flex flex-col ${
                msg.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-secondary text-secondary-foreground"
              }`}
            >
              {msg.text}
            </div>
          ))}
      </div>
      <div className="p-4 bg-card shadow-lg flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          className="flex-1 p-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 text-foreground"
          placeholder={t("type_your_message_here")}
        />
        <button
          onClick={sendMessage}
          className="m-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200"
        >
          {t("send")}
        </button>
      </div>
    </div>
  );
};

export default Chat;
