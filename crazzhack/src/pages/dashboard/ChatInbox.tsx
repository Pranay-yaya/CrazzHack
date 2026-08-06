import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import DOMPurify from "dompurify";

type Message = {
  id: string;
  visitor_name: string;
  content: string;
  sender_type: "visitor" | "admin";
  created_at: string;
};

export default function ChatInbox() {
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [activeVisitor, setActiveVisitor] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const channelRef = useRef<ReturnType<typeof supabase.channel>>();

  // Fetch all messages from DB and group by visitor
  const fetchConversations = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) {
      const grouped: Record<string, Message[]> = {};
      data.forEach((msg) => {
        const visitor = msg.visitor_name || "Anonymous";
        if (!grouped[visitor]) grouped[visitor] = [];
        grouped[visitor].push(msg);
      });
      setConversations(grouped);
    }
  };

  useEffect(() => {
    fetchConversations();

    // Subscribe to global channel to catch new messages in real time
    const channel = supabase.channel("chat_global");
    channel
      .on("broadcast", { event: "message" }, () => {
        // Any new message – refresh the list
        fetchConversations();
      })
      .subscribe();
    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendReply = async () => {
    if (!activeVisitor || !replyText.trim()) return;

    const payload: Message = {
      id: crypto.randomUUID(),
      visitor_name: activeVisitor,
      content: replyText,
      sender_type: "admin",
      created_at: new Date().toISOString(),
    };

    // Broadcast to global channel
    channelRef.current?.send({
      type: "broadcast",
      event: "message",
      payload,
    });

    // Persist to DB
    await supabase.from("messages").insert({
      id: payload.id,
      visitor_name: activeVisitor,
      content: replyText,
      sender_type: "admin",
    });

    setReplyText("");
    fetchConversations(); // refresh to show the new message immediately
  };

  const visitorList = Object.keys(conversations);
  const activeMessages = activeVisitor ? conversations[activeVisitor] || [] : [];

  return (
    <div className="flex gap-4 h-[calc(100vh-200px)]">
      {/* Visitor List */}
      <div className="w-1/3 bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-4 overflow-y-auto">
        <h3 className="text-white font-semibold mb-4">Active Chats</h3>
        {visitorList.map((visitor) => (
          <div
            key={visitor}
            onClick={() => setActiveVisitor(visitor)}
            className={`p-3 rounded-lg cursor-pointer mb-2 transition ${
              activeVisitor === visitor
                ? "bg-[#00ff88]/10 border border-[#00ff88]/30 text-white"
                : "bg-white/5 hover:bg-white/10 text-gray-300"
            }`}
          >
            <span>{visitor}</span>
            <span className="text-xs ml-2 opacity-70">
              ({conversations[visitor].length})
            </span>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex flex-col">
        {activeVisitor ? (
          <>
            <h3 className="text-white font-semibold mb-2">{activeVisitor}</h3>
            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
              {activeMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-lg max-w-[75%] ${
                    msg.sender_type === "admin"
                      ? "bg-[#00ff88]/20 text-white ml-auto"
                      : "bg-white/10 text-white"
                  }`}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.content) }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendReply()}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00ff88] outline-none"
                placeholder="Type reply..."
              />
              <button
                onClick={sendReply}
                className="px-4 py-2 bg-[#00ff88] text-black rounded-lg font-semibold hover:bg-[#00ff88]/90 transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-400">Select a visitor to start chatting</p>
        )}
      </div>
    </div>
  );
}