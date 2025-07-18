import { useEffect, useState } from "react";
import axios from "axios";

export function ChatBox({ sessionId, userId }: any) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!sessionId) return;
    axios.get(`/api/chat/messages?sessionId=${sessionId}`).then(res => {
      setMessages(res.data);
    });
  }, [sessionId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const res = await axios.post(`/api/chat/send`, {
      sessionId,
      userId,
      message: input,
    });
    setMessages([...messages, res.data]);
    setInput("");
  };

  return (
    <div className="flex flex-col flex-grow p-4">
      <div className="flex-grow overflow-y-auto bg-white p-4 rounded-lg shadow-inner">
        {messages.map((msg: any, idx: number) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.senderId === userId ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.senderId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          className="flex-grow p-2 border rounded-l-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
