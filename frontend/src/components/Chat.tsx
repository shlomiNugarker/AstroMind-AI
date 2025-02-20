import { useEffect, useState } from "react";
import { httpService } from "@/services/http.service";
import { useAuth } from "@/context/AuthContext";

const Chat = () => {
  const userId = useAuth().user?._id;

  const [messages, setMessages] = useState<
    { role: string; text: string; updatedAt: Date }[]
  >([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;
      try {
        const response = await httpService.get(
          `/api/predictions/chat/history`,
          true
        );

        setMessages(response.messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchHistory();
  }, [userId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input, updatedAt: new Date() };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const botResponse = await httpService.post(
        "/api/predictions/chat",
        {
          message: input,
        },
        true
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: botResponse, updatedAt: new Date() },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 w-full max-w-md rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 min-h-[500px] max-h-[500px] overflow-auto">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-xl max-w-xs ${
              msg.role === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-300 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 bg-white shadow-lg flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
          placeholder="כתוב הודעה..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          שלח
        </button>
      </div>
    </div>
  );
};

export default Chat;
