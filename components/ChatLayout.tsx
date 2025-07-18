import { useEffect, useState } from "react";
import { ChatSessionList } from "./ChatSessionList";
import { ChatBox } from "./ChatBox";

export default function ChatLayout({ userId }: { userId: string }) {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  return (
    <div className="h-screen flex">
      <ChatSessionList
        userId={userId}
        selectedSessionId={selectedSessionId}
        onSelect={setSelectedSessionId}
      />
      <ChatBox
        sessionId={selectedSessionId}
        userId={userId}
      />
    </div>
  );
}
