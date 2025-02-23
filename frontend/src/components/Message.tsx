type MessageProps = {
  key: number;
  msg: {
    sender: string;
    text: string;
    timestamp: string;
  };
};

const Message = ({ key, msg }: MessageProps) => {
  const formattedTime = new Date(msg.timestamp).toLocaleTimeString("fi-FI", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      key={key}
      className={`my-2 p-3 max-w-xs rounded-lg ${
        msg.sender === "user"
          ? "bg-blue-500 self-end text-white ml-auto"
          : "bg-gray-700 text-white"
      }`}
    >
      <div className="text-xs text-gray-400">{formattedTime}</div>
      <div>{msg.text}</div>
    </div>
  );
};

export default Message;
