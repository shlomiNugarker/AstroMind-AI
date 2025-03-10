import { useEffect, useState, useRef } from "react";
import { httpService } from "@/services/http.service";
import { useAuth } from "@/context/AuthContext";
import { t } from "i18next";
import {
  convertEnglishToHebrew,
  convertHebrewToEnglish,
  isHebrew,
} from "@/services/utils";
import { FaExchangeAlt, FaPaperPlane } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import i18n from "@/i18n";
import Logo from "./Logo";
import { Link } from "react-router";

const Chat = () => {
  const userId = useAuth().user?._id;
  const [messages, setMessages] = useState<
    { role: string; text: string; updatedAt: Date }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const userLang = i18n.language;

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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input, updatedAt: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const botResponse = await httpService.post(
        "/api/chat",
        { message: input, lang: userLang || "en" },
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

  const toggleLanguage = () => {
    setInput((prevInput) => {
      return isHebrew(prevInput)
        ? convertHebrewToEnglish(prevInput)
        : convertEnglishToHebrew(prevInput);
    });
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col bg-background h-full w-full sm:w-1/2  rounded-lg shadow-lg border border-border">
      <div className="flex items-center justify-center w-full">
        <Logo className="h-[130px]" />
      </div>
      <hr className="border-border" />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}
        {messages.length === 0 && (
          <div className="text-muted-foreground text-center">
            {t("no_messages")}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {loading && (
        <div
          className={`flex justify-center items-center text-muted-foreground mt-2`}
        >
          <AiOutlineLoading3Quarters className="animate-spin text-xl p-1" />
          <span className="ml-2">{t("thinking")}</span>
        </div>
      )}

      <div className="p-4 bg-card shadow-lg flex items-center border-t border-border">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          className="flex-1 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 text-foreground resize-none overflow-auto min-h-[50px] mx-2"
          placeholder={t("type_your_message_here")}
          rows={1}
        />
        {input && isHebrew(input) !== (userLang === "he") && (
          <button
            onClick={toggleLanguage}
            className="p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition duration-200 flex items-center"
          >
            <FaExchangeAlt />
          </button>
        )}
        <button
          onClick={sendMessage}
          className="m-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center"
        >
          <FaPaperPlane className="animate-pulse" />
        </button>
      </div>
      <div className="text-muted-foreground text-center p-2">
        <Link
          className="underline"
          to={"mailto:shlomin1231@gmail.com"}
          target="_blank"
        >
          {t("built_with_love_by_Shlomi")}
        </Link>
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
        dir={isHebrew(msg.text) ? "rtl" : "ltr"}
      >
        {msg.text}
      </div>
    </div>
  );
};

export default Chat;
