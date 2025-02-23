import Chat from "./components/Chat";

export default function App() {
  return (
    <div className="h-screen flex flex-col items-center bg-gray-900 text-white">
      <div className="w-full max-w-lg p-4 flex flex-col h-full">
        <div className="text-xl font-semibold mb-4 text-center">AI Chatbot</div>

        <Chat />
      </div>
    </div>
  );
}
