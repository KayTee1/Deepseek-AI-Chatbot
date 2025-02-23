import { useState, useRef, useEffect } from "react";
import Input from "./Input";
import Message from "./Message";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const API_URL = import.meta.env.VITE_API_URL as string;

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL + "/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-r1",
          prompt: input,
          temperature: 0.7,
          stream: false,
        }),
      });

      const data = await response.json();

      if (!data || !data.response) {
        console.error("Empty API response:", data);
        setMessages((prev) => [
          ...prev,
          {
            text: "Error: Empty response from AI.",
            sender: "ai",
            timestamp: new Date().toISOString(),
          },
        ]);
      } else {
        const cleanedResponse = data.response.replace(/<\/?think>/g, "").trim();
        const botMessage = {
          text: cleanedResponse,
          sender: "ai",
          timestamp: data.created_at || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Error: Unable to reach AI server.",
          sender: "ai",
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded-lg min-h-[700px]">
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}
        {loading && (
          <div className="text-gray-400 text-sm mt-2">Thinking...</div>
        )}
        <div ref={chatEndRef} />
      </div>
      <Input
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
};

export default Chat;
