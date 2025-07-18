import { useEffect, useState } from "react";
import axios from "axios";

export function ChatSessionList({ userId, selectedSessionId, onSelect }: any) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get(`/api/chat/sessions?userId=${userId}`).then(res => {
      setSessions(res.data);
    });
  }, []);

  return (
    <div className="w-1/4 border-r bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-2">Chat Sessions</h2>
      <ul>
        {sessions.map((session: any) => (
          <li
            key={session.id}
            onClick={() => onSelect(session.id)}
            className={`p-2 rounded-lg cursor-pointer ${
              session.id === selectedSessionId ? "bg-blue-200" : "hover:bg-blue-100"
            }`}
          >
            {session.type === "public" ? "🧍 Public Chat" : `👥 ${session.teamName}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
