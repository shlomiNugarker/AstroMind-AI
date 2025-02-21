import { useEffect, useState, useRef } from "react";
import { httpService } from "@/services/http.service";
import { useAuth } from "@/context/AuthContext";
import { t } from "i18next";
import { isHebrew } from "@/services/utils";
import { FaPaperPlane } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Chat = () => {
  const userId = useAuth().user?._id;
  const [messages, setMessages] = useState<
    { role: string; text: string; updatedAt: Date }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;
      try {
        const response = await httpService.get(`/api/chat/history`, true);
        setMessages(response.messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchHistory();
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input, updatedAt: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const botResponse = await httpService.post(
        "/api/chat",
        { message: input },
        true
      );
      const botMessage = {
        role: "assistant",
        text: botResponse?.message || "Error fetching response",
        updatedAt: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-background max-h-[80vh] w-full md:max-w-md xl:max-w-xl rounded-lg shadow-lg border border-border">
      <h1 className="text-center text-2xl font-semibold py-4">
        <span className="text-primary">{t("chat")}</span>{" "}
        <span className="text-foreground">{t("with_the_assistant")}</span>
      </h1>
      <hr className="my-2 border-border" />

      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2 min-h-[300px]">
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {loading && (
        <div className="flex justify-center items-center text-muted-foreground mt-2">
          <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          <span className="ml-2">{t("loading")}</span>
        </div>
      )}

      <div className="p-4 bg-card shadow-lg flex items-center border-t border-border">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 text-foreground"
          placeholder={t("type_your_message_here")}
        />
        <button
          onClick={sendMessage}
          className="m-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center"
        >
          <FaPaperPlane className="animate-pulse" />
        </button>
      </div>
    </div>
  );
};

const MessageBubble = ({ msg }: { msg: { role: string; text: string } }) => {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg max-w-[75%] shadow-md transition-opacity duration-300 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        } ${isHebrew(msg.text) ? "text-right" : "text-left"}`}
      >
        {msg.text}
      </div>
    </div>
  );
};

export default Chat;
