import { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_URL = "http://192.168.1.102:11434/api/generate"; // Change to your server's IP

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
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        model: "deepseek-r1",
        prompt: input,
        stream: false,
      });

      const aiMessage = { text: response.data.response, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
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
        {/* Header */}
        <div className="text-xl font-semibold mb-4 text-center">AI Chatbot</div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-3 max-w-xs rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 self-end text-white ml-auto"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-gray-400 text-sm mt-2">Thinking...</div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
            onClick={sendMessage}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
