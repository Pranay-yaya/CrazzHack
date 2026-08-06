import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: "admin" | "team" | null;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<"admin" | "team" | null>(null);
  const [loading, setLoading] = useState(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchRole(session.user.id);
      else setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchRole(session.user.id);
      else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    setRole(data?.role ?? "team"); // default team if missing
    setLoading(false);
  };

  // Auto sign out after 30 minutes of inactivity
  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        supabase.auth.signOut();
      }, 30 * 60 * 1000);
    };
    const events = ["mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, session, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
