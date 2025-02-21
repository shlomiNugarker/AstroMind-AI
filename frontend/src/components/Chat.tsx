import { useEffect, useState, useRef, memo } from "react";
import { httpService } from "@/services/http.service";
import { useAuth } from "@/context/AuthContext";
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

  // טעינת היסטוריית הצ'אט פעם אחת בלבד
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
  }, [userId]);

  // גלילה אוטומטית
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
      const response = await httpService.post(
        "/api/chat",
        { message: input },
        true
      );
      const botMessage = {
        role: "assistant",
        text: response.message,
        updatedAt: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  // שליחת הודעה גם בלחיצה על Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      {/* אזור הודעות */}
      <div className="h-96 overflow-y-auto p-3 space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* מצב טעינה */}
      {loading && (
        <div className="flex justify-center items-center text-gray-500 mt-2">
          <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          <span className="ml-2">GPT-4o חושב...</span>
        </div>
      )}

      {/* אזור קלט */}
      <div className="flex items-center gap-2 mt-3 bg-gray-100 p-2 rounded-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="כתוב הודעה..."
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:bg-gray-400"
          disabled={loading}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

// הודעה בודדת עם עיצוב משופר
const MessageBubble = memo(
  ({ msg }: { msg: { role: string; text: string } }) => {
    const isUser = msg.role === "user";
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`p-3 rounded-lg max-w-[75%] shadow-md ${
            isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-900"
          } ${isHebrew(msg.text) ? "text-right" : "text-left"}`}
        >
          {msg.text}
        </div>
      </div>
    );
  }
);

export default Chat;
