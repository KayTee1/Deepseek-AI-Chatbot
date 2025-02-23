type ChatProps = {
  messages: { sender: string; text: string }[];
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  loading: boolean;
};

const Chat = ({ messages, chatEndRef, loading }: ChatProps) => {
  return (
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
      {loading && <div className="text-gray-400 text-sm mt-2">Thinking...</div>}
      <div ref={chatEndRef} />
    </div>
  );
};

export default Chat;
