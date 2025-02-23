import { useState, useRef, useEffect } from "react";
import Chat from "./components/Chat";
import Input from "./components/Input";

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "ai" },
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

    const userMessage = { text: input, sender: "user" };
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
          { text: "Error: Empty response from AI.", sender: "ai" },
        ]);
      } else {
        const cleanedResponse = data.response.replace(/<\/?think>/g, "").trim();
        setMessages((prev) => {
          const newMesssages = [
            ...prev,
            { text: cleanedResponse, sender: "ai" },
          ];
          return newMesssages;
        });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to reach AI server.", sender: "ai" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-900 text-white">
      <div className="w-full max-w-lg p-4 flex flex-col h-full">
        <div className="text-xl font-semibold mb-4 text-center">AI Chatbot</div>

        <Chat messages={messages} chatEndRef={chatEndRef} loading={loading} />

        <Input
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}
