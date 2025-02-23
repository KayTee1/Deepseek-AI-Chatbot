import React from "react";

type InputProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  loading: boolean;
};

const Input = ({ input, setInput, sendMessage, loading }: InputProps) => {
  return (
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        className="flex-1 p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
        onClick={sendMessage}
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
};

export default Input;
