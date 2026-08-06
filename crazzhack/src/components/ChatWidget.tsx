import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import DOMPurify from "dompurify";
import { Bot, X, Send } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender_type: "visitor" | "admin";
  visitor_name: string;
  created_at: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [nameSet, setNameSet] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel>>();

  // Connect to the global chat channel once the visitor has entered their name
  useEffect(() => {
    if (!name || !nameSet) return;

    const channel = supabase.channel("chat_global");

    channel
      .on("broadcast", { event: "message" }, ({ payload }) => {
        const msg = payload as Message;
        // Only show messages belonging to this visitor (or replies to them)
        if (msg.visitor_name === name) {
          setMessages((prev) => [...prev, msg]);
        }
      })
      .on("broadcast", { event: "typing" }, ({ payload }) => {
        // Only show typing indicator if the message is from an admin and for this visitor
        if (payload.visitor_name === name && payload.isTyping && payload.sender_type === "admin") {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 2000);
        }
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          // Load existing messages from DB for this visitor
          supabase
            .from("messages")
            .select("*")
            .eq("visitor_name", name)
            .order("created_at", { ascending: true })
            .then(({ data }) => {
              if (data) setMessages(data);
            });
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [name, nameSet]);

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const payload: Message = {
      id: crypto.randomUUID(),
      content: trimmed,
      sender_type: "visitor",
      visitor_name: name,
      created_at: new Date().toISOString(),
    };

    // Broadcast to global channel
    channelRef.current?.send({
      type: "broadcast",
      event: "message",
      payload,
    });

    // Persist to DB
    supabase.from("messages").insert({
      id: payload.id,
      visitor_name: name,
      content: trimmed,
      sender_type: "visitor",
    });

    setMessages((prev) => [...prev, payload]);
    setMessage("");
  };

  const handleTyping = () => {
    channelRef.current?.send({
      type: "broadcast",
      event: "typing",
      payload: {
        visitor_name: name,
        isTyping: true,
        sender_type: "visitor",
      },
    });
  };

  const toggleWidget = () => setOpen(!open);

  return (
    <>
      {/* Floating Bot Icon */}
      <button
        onClick={toggleWidget}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#101127]/90 backdrop-blur-lg border border-cyan-300/40 flex items-center justify-center shadow-[0_0_18px_rgba(34,211,238,.25)] hover:shadow-[0_0_28px_rgba(139,92,246,.48)] transition-all duration-300 group"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-7 h-7 text-cyan-300 group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-[#0d0e20]/95 backdrop-blur-xl border border-violet-200/15 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-300" />
              <span className="font-semibold text-white text-sm">CrazzHack Support</span>
            </div>
            <button onClick={toggleWidget} className="text-gray-400 hover:text-white">
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          {!nameSet ? (
            <div className="p-4 space-y-3">
              <p className="text-gray-400 text-sm">Hey! What's your name?</p>
              <input
                placeholder="Your name"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-300 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && name && setNameSet(true)}
              />
              <button
                onClick={() => name && setNameSet(true)}
                className="w-full py-2 bg-gradient-to-r from-violet-500 to-cyan-400 text-slate-950 rounded-lg font-semibold text-sm transition"
              >
                Start Chat
              </button>
            </div>
          ) : (
            <>
              <div className="h-64 overflow-y-auto p-4 space-y-3 text-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded-lg max-w-[85%] ${
                      msg.sender_type === "visitor"
                        ? "bg-cyan-300/10 text-white ml-auto"
                        : "bg-white/10 text-white"
                    }`}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.content) }}
                  />
                ))}
                {isTyping && (
                  <div className="text-gray-500 text-xs italic pl-2">Admin is typing...</div>
                )}
              </div>
              <div className="flex items-center gap-2 p-3 border-t border-white/10">
                <input
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); handleTyping(); }}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-300 outline-none"
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendMessage}
                  className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-slate-950 transition"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
