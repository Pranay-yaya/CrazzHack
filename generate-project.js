const fs = require('fs');
const path = require('path');

// -----------------------------------------------------------------------
// All project files – relative path → file content
// -----------------------------------------------------------------------
const files = {
  // package.json
  "crazzhack/package.json": JSON.stringify({
    "name": "crazzhack",
    "private": true,
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "@supabase/supabase-js": "^2.39.0",
      "dompurify": "^3.0.6",
      "lucide-react": "^0.468.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.21.1"
    },
    "devDependencies": {
      "@types/dompurify": "^3.0.5",
      "@types/react": "^18.2.43",
      "@types/react-dom": "^18.2.17",
      "@vitejs/plugin-react": "^4.2.1",
      "autoprefixer": "^10.4.16",
      "postcss": "^8.4.32",
      "tailwindcss": "^3.4.0",
      "typescript": "^5.3.3",
      "vite": "^5.0.10"
    }
  }, null, 2),

  // .env.example
  "crazzhack/.env.example": `VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=re_...`,

  // index.html
  "crazzhack/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CrazzHack</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

  // public/vite.svg
  "crazzhack/public/vite.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚡</text></svg>`,

  // vite.config.ts
  "crazzhack/vite.config.ts": `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 }
})`,

  // tsconfig.json
  "crazzhack/tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}`,

  // postcss.config.js
  "crazzhack/postcss.config.js": `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

  // tailwind.config.js
  "crazzhack/tailwind.config.js": `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}`,

  // src/index.css
  "crazzhack/src/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0a0a0a;
  color: white;
  font-family: 'Inter', sans-serif;
}`,

  // src/main.tsx
  "crazzhack/src/main.tsx": `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)`,

  // src/App.tsx
  "crazzhack/src/App.tsx": `import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardHome from './pages/dashboard/DashboardHome'
import InquiriesPage from './pages/dashboard/InquiriesPage'
import ProjectsPage from './pages/dashboard/ProjectsPage'
import TasksPage from './pages/dashboard/TasksPage'
import ChatInbox from './pages/dashboard/ChatInbox'
import Invoices from './pages/dashboard/Invoices'
import SocialCampaigns from './pages/dashboard/SocialCampaigns'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="inquiries" element={<InquiriesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="chat-inbox" element={<ChatInbox />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="social-campaigns" element={<SocialCampaigns />} />
      </Route>
    </Routes>
  )
}

export default App`,

  // lib/supabase.ts
  "crazzhack/src/lib/supabase.ts": `import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
`,

  // context/AuthContext.tsx
  "crazzhack/src/context/AuthContext.tsx": `import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const idleTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

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
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
`,

  // Layouts
  "crazzhack/src/layouts/PublicLayout.tsx": `import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}`,

  "crazzhack/src/layouts/DashboardLayout.tsx": `import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '@/components/dashboard/Sidebar'
import { useAuth } from '@/context/AuthContext'

export default function DashboardLayout() {
  const { user, loading } = useAuth()
  
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-white">Loading...</div></div>
  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </div>
    </div>
  )
}`,

  // Components
  "crazzhack/src/components/Navbar.tsx": `import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-800">
      <Link to="/" className="text-xl font-bold text-green-400">CrazzHack</Link>
      <div className="flex gap-4 text-sm">
        <a href="#services" className="hover:text-green-400">Services</a>
        <a href="#about" className="hover:text-green-400">About</a>
        <a href="#contact" className="hover:text-green-400">Contact</a>
        <Link to="/login" className="ml-4 px-4 py-1 bg-green-600 rounded hover:bg-green-700">Team Login</Link>
      </div>
    </nav>
  )
}`,

  "crazzhack/src/components/Footer.tsx": `import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8 text-center text-sm text-gray-400">
      <p>&copy; {new Date().getFullYear()} CrazzHack. All rights reserved.</p>
      <p className="mt-1">Founded by Pranay Kumar</p>
      <div className="flex justify-center gap-4 mt-3">
        <a href="#"><Github size={18} /></a>
        <a href="#"><Linkedin size={18} /></a>
        <a href="#"><Twitter size={18} /></a>
      </div>
    </footer>
  )
}`,

  // ChatWidget (full real-time version)
  "crazzhack/src/components/ChatWidget.tsx": `import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import DOMPurify from "dompurify";

type Message = {
  id: string;
  content: string;
  sender_type: "visitor" | "admin";
  created_at: string;
  visitor_name?: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [nameSet, setNameSet] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel>>();

  useEffect(() => {
    if (!name || !nameSet) return;

    const room = \`chat_\${name}\`;
    const channel = supabase.channel(room);

    channel
      .on("broadcast", { event: "message" }, ({ payload }) => {
        setMessages((prev) => [...prev, payload as Message]);
      })
      .on("broadcast", { event: "typing" }, ({ payload }) => {
        setIsTyping(payload.isTyping);
        if (payload.isTyping) {
          setTimeout(() => setIsTyping(false), 3000);
        }
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
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
      created_at: new Date().toISOString(),
      visitor_name: name,
    };
    channelRef.current?.send({
      type: "broadcast",
      event: "message",
      payload,
    });
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
      payload: { isTyping: true },
    });
  };

  if (!nameSet) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-xl z-50">
        <input
          placeholder="Your name to chat"
          className="bg-gray-700 p-2 rounded text-white mb-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && name && setNameSet(true)}
        />
        <button
          onClick={() => name && setNameSet(true)}
          className="w-full bg-green-500 py-2 rounded text-white"
        >
          Start Chat
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gray-900 rounded-lg shadow-xl border border-gray-700 z-50">
      <div
        className="flex justify-between items-center p-3 bg-gray-800 rounded-t-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-white">CrazzHack Support</span>
        <span className="text-white">{open ? "▼" : "▲"}</span>
      </div>
      {open && (
        <div className="p-3 h-64 overflow-y-auto flex flex-col gap-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={\`p-2 rounded text-sm \${
                msg.sender_type === "visitor"
                  ? "bg-blue-600 self-end text-white"
                  : "bg-gray-600 self-start text-white"
              }\`}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.content) }}
            />
          ))}
          {isTyping && (
            <div className="text-gray-400 text-xs italic">Admin is typing...</div>
          )}
        </div>
      )}
      <div className="p-2 flex">
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-gray-700 p-2 rounded text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-green-600 hover:bg-green-700 px-3 rounded text-white"
        >
          ➤
        </button>
      </div>
    </div>
  );
}`,

  // Dashboard Sidebar
  "crazzhack/src/components/dashboard/Sidebar.tsx": `import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const links = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/dashboard/inquiries', label: 'Inquiries' },
  { to: '/dashboard/projects', label: 'Projects' },
  { to: '/dashboard/tasks', label: 'Tasks' },
  { to: '/dashboard/chat-inbox', label: 'Chat Inbox' },
  { to: '/dashboard/invoices', label: 'Invoices' },
  { to: '/dashboard/social-campaigns', label: 'Social Campaigns' },
]

export default function Sidebar() {
  const location = useLocation()
  const { signOut } = useAuth()

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col">
      <h2 className="text-xl font-bold text-green-400 mb-8">CrazzHack Admin</h2>
      <nav className="flex-1 space-y-1">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={\`block px-3 py-2 rounded \${
              location.pathname === link.to ? 'bg-green-700 text-white' : 'text-gray-300 hover:bg-gray-800'
            }\`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={signOut}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
      >
        Sign Out
      </button>
    </aside>
  )
}`,

  // Proof of Work Upload component
  "crazzhack/src/components/dashboard/ProofOfWorkUpload.tsx": `import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  taskId?: string;
  socialTaskId?: string;
  onUploadComplete?: () => void;
}

export default function ProofOfWorkUpload({ taskId, socialTaskId, onUploadComplete }: Props) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    const entityId = taskId || socialTaskId;
    if (!entityId) return;

    setUploading(true);
    const fileName = \`\${Date.now()}_\${file.name}\`;
    const filePath = \`\${entityId}/\${fileName}\`;

    const { error } = await supabase.storage
      .from("proof-of-work")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const record: any = {
      uploaded_by: (await supabase.auth.getUser()).data.user?.id,
      file_name: file.name,
      storage_path: filePath,
    };
    if (taskId) record.task_id = taskId;
    if (socialTaskId) record.social_task_id = socialTaskId;

    await supabase.from("proof_of_work").insert(record);

    setUploading(false);
    setProgress(0);
    if (fileRef.current) fileRef.current.value = "";
    onUploadComplete?.();
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="file"
        ref={fileRef}
        accept="image/*,.pdf,.doc,.docx"
        className="text-sm text-gray-300 file:mr-4 file:py-1 file:px-3 file:rounded file:bg-gray-700 file:text-white"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded text-white text-sm"
      >
        {uploading ? \`Uploading \${progress}%\` : "Upload Proof"}
      </button>
    </div>
  );
}`,

  // Pages – Home sections (simplified but complete)
  "crazzhack/src/pages/HomePage.tsx": `import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import ProcessSection from '@/components/home/ProcessSection'
import ContactSection from '@/components/home/ContactSection'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <ContactSection />
    </div>
  )
}`,

  // Home sections (dummy but presentable)
  "crazzhack/src/components/home/HeroSection.tsx": `export default function HeroSection() {
    return (
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Digital Problem Solvers</h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">We build custom software, AI/ML solutions, and manage your social presence.</p>
        <a href="#contact" className="mt-8 inline-block px-8 py-3 bg-green-600 rounded-full text-white font-semibold">Start a Project</a>
      </section>
    )
  }`,
  "crazzhack/src/components/home/StatsSection.tsx": `export default function StatsSection() {
    return (
      <section className="py-12 bg-gray-900 text-center grid grid-cols-3 gap-4">
        <div><span className="text-3xl font-bold text-green-400">50+</span><p className="text-gray-400">Projects</p></div>
        <div><span className="text-3xl font-bold text-green-400">30+</span><p className="text-gray-400">Clients</p></div>
        <div><span className="text-3xl font-bold text-green-400">5</span><p className="text-gray-400">Years Exp</p></div>
      </section>
    )
  }`,
  "crazzhack/src/components/home/ServicesSection.tsx": `export default function ServicesSection() {
    const services = ['Custom Software', 'AI/ML', 'Social Media Management', 'Cybersecurity', 'Cloud Solutions', 'UI/UX Design']
    return (
      <section id="services" className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map(s => (
            <div key={s} className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700">{s}</div>
          ))}
        </div>
      </section>
    )
  }`,
  "crazzhack/src/components/home/AboutSection.tsx": `export default function AboutSection() {
    return (
      <section id="about" className="py-16 bg-gray-900 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About CrazzHack</h2>
        <p className="max-w-3xl mx-auto text-gray-400">Founded by Pranay Kumar, CrazzHack leverages deep expertise in AI/ML and cybersecurity to deliver high-impact digital solutions.</p>
      </section>
    )
  }`,
  "crazzhack/src/components/home/ProcessSection.tsx": `export default function ProcessSection() {
    const steps = ['Discover', 'Design', 'Develop', 'Deliver']
    return (
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Process</h2>
        <div className="flex justify-center gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-xl font-bold">{i+1}</div>
              <span className="mt-2">{s}</span>
            </div>
          ))}
        </div>
      </section>
    )
  }`,
  "crazzhack/src/components/home/ContactSection.tsx": `import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ContactSection() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', description: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.from('inquiries').insert(form)
    setSubmitted(true)
  }

  if (submitted) return <section id="contact" className="py-16 text-center"><p className="text-green-400 text-xl">Thanks! We'll be in touch.</p></section>

  return (
    <section id="contact" className="py-16 px-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required className="w-full bg-gray-800 p-3 rounded" placeholder="Full Name" onChange={e => setForm({...form, full_name: e.target.value})} />
        <input required type="email" className="w-full bg-gray-800 p-3 rounded" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
        <input className="w-full bg-gray-800 p-3 rounded" placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
        <textarea required className="w-full bg-gray-800 p-3 rounded" placeholder="Describe your project" onChange={e => setForm({...form, description: e.target.value})}></textarea>
        <button type="submit" className="w-full py-3 bg-green-600 rounded text-white font-semibold">Send Inquiry</button>
      </form>
    </section>
  )
}`,

  // Auth pages
  "crazzhack/src/pages/LoginPage.tsx": `import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) navigate('/dashboard')
    else alert(error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={login} className="bg-gray-900 p-8 rounded w-96 space-y-4">
        <h2 className="text-2xl font-bold text-white">Team Login</h2>
        <input type="email" required placeholder="Email" className="w-full p-2 bg-gray-800 rounded" onChange={e => setEmail(e.target.value)} />
        <input type="password" required placeholder="Password" className="w-full p-2 bg-gray-800 rounded" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="w-full py-2 bg-green-600 rounded text-white">Log In</button>
        <p className="text-gray-400 text-sm">No account? <Link to="/signup" className="text-green-400">Sign up</Link></p>
      </form>
    </div>
  )
}`,

  "crazzhack/src/pages/SignupPage.tsx": `import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate, Link } from 'react-router-dom'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signup = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (!error) navigate('/dashboard')
    else alert(error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={signup} className="bg-gray-900 p-8 rounded w-96 space-y-4">
        <h2 className="text-2xl font-bold text-white">Create Team Account</h2>
        <input type="email" required placeholder="Email" className="w-full p-2 bg-gray-800 rounded" onChange={e => setEmail(e.target.value)} />
        <input type="password" required placeholder="Password" className="w-full p-2 bg-gray-800 rounded" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="w-full py-2 bg-green-600 rounded text-white">Sign Up</button>
        <p className="text-gray-400 text-sm">Already have an account? <Link to="/login" className="text-green-400">Log in</Link></p>
      </form>
    </div>
  )
}`,

  // Dashboard pages (all the important ones)
  "crazzhack/src/pages/dashboard/DashboardHome.tsx": `export default function DashboardHome() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
        <div className="grid grid-cols-4 gap-4">
          {['Total Inquiries', 'Active Projects', 'Pending Tasks', 'Revenue'].map((title) => (
            <div key={title} className="bg-gray-800 p-4 rounded">
              <p className="text-gray-400">{title}</p>
              <p className="text-2xl font-bold">--</p>
            </div>
          ))}
        </div>
      </div>
    )
  }`,

  "crazzhack/src/pages/dashboard/InquiriesPage.tsx": `import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([])

  useEffect(() => {
    supabase.from('inquiries').select('*').order('created_at', { ascending: false }).then(({ data }) => setInquiries(data || []))
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('inquiries').update({ status }).eq('id', id)
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inquiries</h2>
      <div className="space-y-3">
        {inquiries.map(inq => (
          <div key={inq.id} className="bg-gray-800 p-4 rounded flex justify-between">
            <div>
              <p className="font-semibold">{inq.full_name}</p>
              <p className="text-sm text-gray-400">{inq.email} • {inq.phone}</p>
              <p className="text-sm mt-1">{inq.description}</p>
            </div>
            <div>
              <select value={inq.status} onChange={(e) => updateStatus(inq.id, e.target.value)} className="bg-gray-700 p-1 rounded">
                <option>New Lead</option>
                <option>Contacted</option>
                <option>In Negotiation</option>
                <option>Project Active</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}`,

  "crazzhack/src/pages/dashboard/ProjectsPage.tsx": `import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  useEffect(() => {
    supabase.from('projects').select('*').then(({ data }) => setProjects(data || []))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-2 gap-4">
        {projects.map(p => (
          <div key={p.id} className="bg-gray-800 p-4 rounded">
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-gray-400">{p.description}</p>
            <span className="text-xs bg-blue-700 px-2 py-1 rounded">{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}`,

  "crazzhack/src/pages/dashboard/TasksPage.tsx": `import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProofOfWorkUpload from '@/components/dashboard/ProofOfWorkUpload'

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  useEffect(() => {
    supabase.from('tasks').select('*').then(({ data }) => setTasks(data || []))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      {tasks.map(task => (
        <div key={task.id} className="bg-gray-800 p-4 rounded mb-2 flex justify-between">
          <div>
            <p className="font-semibold">{task.title}</p>
            <p className="text-sm text-gray-400">{task.description}</p>
            <span className="text-xs bg-yellow-600 px-2 py-1 rounded">{task.status}</span>
          </div>
          <ProofOfWorkUpload taskId={task.id} />
        </div>
      ))}
    </div>
  )
}`,

  "crazzhack/src/pages/dashboard/ChatInbox.tsx": `import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import DOMPurify from 'dompurify'

type Message = {
  id: string
  visitor_name: string
  content: string
  sender_type: 'visitor' | 'admin'
  created_at: string
}

export default function ChatInbox() {
  const [conversations, setConversations] = useState<Record<string, Message[]>>({})
  const [activeVisitor, setActiveVisitor] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const channelRef = useRef<ReturnType<typeof supabase.channel>>()

  const fetchConversations = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true })
    if (data) {
      const grouped: Record<string, Message[]> = {}
      data.forEach(msg => {
        const visitor = msg.visitor_name || 'Anonymous'
        if (!grouped[visitor]) grouped[visitor] = []
        grouped[visitor].push(msg)
      })
      setConversations(grouped)
    }
  }

  useEffect(() => {
    fetchConversations()
    const channel = supabase.channel('admin_chat')
    channel.on('broadcast', { event: 'message' }, () => fetchConversations()).subscribe()
    channelRef.current = channel
    return () => { supabase.removeChannel(channel) }
  }, [])

  const sendReply = async () => {
    if (!activeVisitor || !replyText.trim()) return
    const payload: Message = {
      id: crypto.randomUUID(),
      visitor_name: activeVisitor,
      content: replyText,
      sender_type: 'admin',
      created_at: new Date().toISOString(),
    }
    const visitorChannel = supabase.channel(\`chat_\${activeVisitor}\`)
    await visitorChannel.subscribe()
    await visitorChannel.send({ type: 'broadcast', event: 'message', payload })
    await supabase.from('messages').insert(payload)
    setReplyText('')
    fetchConversations()
  }

  const visitorList = Object.keys(conversations)
  const activeMessages = activeVisitor ? conversations[activeVisitor] || [] : []

  return (
    <div className="flex gap-4 h-[calc(100vh-200px)]">
      <div className="w-1/3 bg-gray-800 p-4 rounded-lg overflow-y-auto">
        <h3 className="text-white font-semibold mb-4">Active Chats</h3>
        {visitorList.map(visitor => (
          <div key={visitor} onClick={() => setActiveVisitor(visitor)} className={\`p-3 rounded cursor-pointer mb-2 \${activeVisitor === visitor ? 'bg-gray-700' : 'bg-gray-900 hover:bg-gray-700'}\`}>
            <span className="text-white">{visitor}</span>
            <span className="text-gray-400 text-xs ml-2">({conversations[visitor].length})</span>
          </div>
        ))}
      </div>
      <div className="flex-1 bg-gray-800 rounded-lg p-4 flex flex-col">
        {activeVisitor ? (
          <>
            <h3 className="text-white font-semibold mb-2">{activeVisitor}</h3>
            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
              {activeMessages.map(msg => (
                <div key={msg.id} className={\`p-2 rounded max-w-[70%] \${msg.sender_type === 'admin' ? 'bg-green-700 ml-auto text-white' : 'bg-gray-600 text-white'}\`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.content) }} />
              ))}
            </div>
            <div className="flex gap-2">
              <input value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendReply()} className="flex-1 bg-gray-700 p-2 rounded text-white" placeholder="Type reply..." />
              <button onClick={sendReply} className="px-4 py-2 bg-blue-600 rounded text-white">Send</button>
            </div>
          </>
        ) : (
          <p className="text-gray-400">Select a visitor to chat</p>
        )}
      </div>
    </div>
  )
}`,

  "crazzhack/src/pages/dashboard/Invoices.tsx": `import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

export default function Invoices() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [form, setForm] = useState({ client_name: '', amount: '', notes: '', inquiry_id: '', project_id: '' })
  const { user } = useAuth()

  const fetchInvoices = async () => {
    const { data } = await supabase.from('invoices').select('*').order('created_at', { ascending: false })
    if (data) setInvoices(data)
  }

  useEffect(() => { fetchInvoices() }, [])

  const createInvoice = async () => {
    if (!form.client_name || !form.amount) return
    await supabase.from('invoices').insert({
      client_name: form.client_name,
      amount: parseFloat(form.amount),
      notes: form.notes,
      inquiry_id: form.inquiry_id || null,
      project_id: form.project_id || null,
      created_by: user!.id,
    })
    setForm({ client_name: '', amount: '', notes: '', inquiry_id: '', project_id: '' })
    fetchInvoices()
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('invoices').update({ status }).eq('id', id)
    fetchInvoices()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Invoices</h2>
      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <h3 className="text-white font-semibold mb-4">New Invoice Note</h3>
        <div className="grid grid-cols-2 gap-4">
          <input className="bg-gray-700 p-2 rounded text-white" placeholder="Client name" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} />
          <input type="number" className="bg-gray-700 p-2 rounded text-white" placeholder="Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
        </div>
        <textarea className="bg-gray-700 p-2 rounded text-white w-full mt-2" placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
        <button onClick={createInvoice} className="mt-2 px-4 py-2 bg-green-600 rounded text-white">Save Invoice Note</button>
      </div>
      <div className="space-y-2">
        {invoices.map(inv => (
          <div key={inv.id} className="flex justify-between items-center bg-gray-800 p-4 rounded">
            <div>
              <p className="text-white font-medium">{inv.client_name}</p>
              <p className="text-gray-400 text-sm">\${inv.amount} · {inv.notes}</p>
            </div>
            <select value={inv.status} onChange={e => updateStatus(inv.id, e.target.value)} className="bg-gray-700 text-white rounded px-2 py-1">
              <option>Pending</option>
              <option>Paid</option>
              <option>Overdue</option>
              <option>Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}`,

  "crazzhack/src/pages/dashboard/SocialCampaigns.tsx": `import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

export default function SocialCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [form, setForm] = useState({
    client_name: '', platform: 'Instagram', target_account: '', daily_quota: 10,
    start_date: new Date().toISOString().split('T')[0]
  })
  const { user } = useAuth()

  const fetchCampaigns = async () => {
    const { data } = await supabase.from('social_campaigns').select('*')
    if (data) setCampaigns(data)
  }

  useEffect(() => { fetchCampaigns() }, [])

  const createCampaign = async () => {
    if (!form.client_name || !form.target_account) return
    await supabase.from('social_campaigns').insert({ ...form, created_by: user!.id })
    setForm({ ...form, client_name: '', target_account: '' })
    fetchCampaigns()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Social Media Campaigns</h2>
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-white font-semibold mb-4">New Campaign</h3>
        <div className="grid grid-cols-2 gap-4">
          <input className="bg-gray-700 p-2 rounded text-white" placeholder="Client name" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} />
          <select className="bg-gray-700 p-2 rounded text-white" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})}>
            <option>Instagram</option><option>Facebook</option><option>Twitter</option><option>LinkedIn</option><option>TikTok</option>
          </select>
          <input className="bg-gray-700 p-2 rounded text-white" placeholder="Target account" value={form.target_account} onChange={e => setForm({...form, target_account: e.target.value})} />
          <input type="number" className="bg-gray-700 p-2 rounded text-white" placeholder="Daily quota" value={form.daily_quota} onChange={e => setForm({...form, daily_quota: parseInt(e.target.value)})} />
          <input type="date" className="bg-gray-700 p-2 rounded text-white" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} />
        </div>
        <button onClick={createCampaign} className="mt-4 px-4 py-2 bg-green-600 rounded text-white">Create Campaign</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {campaigns.map(camp => (
          <div key={camp.id} className="bg-gray-800 p-4 rounded">
            <h4 className="text-white font-semibold">{camp.client_name}</h4>
            <p className="text-gray-400 text-sm">{camp.platform} · @{camp.target_account}</p>
            <p className="text-gray-300">Daily quota: {camp.daily_quota}</p>
            <p className="text-gray-500 text-xs">Started: {camp.start_date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}`,

  // Supabase migration SQL
  "crazzhack/supabase/migrations/20250730_full_schema.sql": `-- (Paste the entire SQL migration provided earlier, exactly as it was.)
-- For brevity in the script, I'll include the whole migration as a string.
` + "CREATE TYPE ... " // I'll need to embed the whole SQL. I'll use a backtick template with the full migration.
};

// Add the SQL migration in full
files["crazzhack/supabase/migrations/20250730_full_schema.sql"] = `
-- Enums
DO $$ BEGIN
  CREATE TYPE public.inquiry_status AS ENUM (
    'New Lead','Contacted','In Negotiation','Project Active','Closed'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.invoice_status AS ENUM (
    'Pending','Paid','Overdue','Cancelled'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.social_platform AS ENUM (
    'Instagram','Facebook','Twitter','LinkedIn','TikTok'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Core tables
CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  description text,
  status inquiry_status DEFAULT 'New Lead',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  inquiry_id uuid REFERENCES public.inquiries(id),
  status text DEFAULT 'Active',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  assigned_to uuid REFERENCES auth.users(id),
  status text DEFAULT 'To Do',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_name text,
  content text,
  sender_type text DEFAULT 'visitor',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES public.inquiries(id) ON DELETE SET NULL,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  client_name text NOT NULL,
  amount numeric(10,2) NOT NULL,
  status invoice_status DEFAULT 'Pending',
  notes text,
  created_by uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.social_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  platform social_platform NOT NULL,
  target_account text NOT NULL,
  daily_quota int NOT NULL CHECK (daily_quota > 0),
  start_date date NOT NULL,
  end_date date,
  created_by uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.social_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES social_campaigns(id) ON DELETE CASCADE,
  assigned_to uuid NOT NULL REFERENCES auth.users(id),
  task_date date NOT NULL,
  actions_performed int DEFAULT 0,
  completed boolean DEFAULT false,
  proof_url text,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.proof_of_work (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES public.tasks(id) ON DELETE CASCADE,
  social_task_id uuid REFERENCES social_tasks(id) ON DELETE CASCADE,
  uploaded_by uuid NOT NULL REFERENCES auth.users(id),
  file_name text NOT NULL,
  storage_path text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES public.inquiries(id) ON DELETE CASCADE,
  old_status inquiry_status,
  new_status inquiry_status NOT NULL,
  changed_by uuid NOT NULL REFERENCES auth.users(id),
  changed_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proof_of_work ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.status_history ENABLE ROW LEVEL SECURITY;

-- Public insert/read for contact form and chat
CREATE POLICY "Public insert inquiries" ON public.inquiries FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public select messages" ON public.messages FOR SELECT TO anon USING (true);
CREATE POLICY "Public insert messages" ON public.messages FOR INSERT TO anon WITH CHECK (true);

-- Team full access
CREATE POLICY "Team all inquiries" ON public.inquiries FOR ALL TO authenticated USING (true);
CREATE POLICY "Team all projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Team all tasks" ON public.tasks FOR ALL TO authenticated USING (true);
CREATE POLICY "Team all messages" ON public.messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Team all invoices" ON public.invoices FOR ALL TO authenticated USING (true);
CREATE POLICY "Team all social_campaigns" ON public.social_campaigns FOR ALL TO authenticated USING (true);
CREATE POLICY "Team all social_tasks" ON public.social_tasks FOR ALL TO authenticated USING (true);
CREATE POLICY "Team all proof_of_work" ON public.proof_of_work FOR ALL TO authenticated USING (true);
CREATE POLICY "Team all status_history" ON public.status_history FOR ALL TO authenticated USING (true);

-- Storage
INSERT INTO storage.buckets (id, name, public) VALUES ('proof-of-work', 'proof-of-work', false) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Allow authenticated upload proof-of-work" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'proof-of-work' AND auth.uid() = owner);
CREATE POLICY "Allow authenticated read proof-of-work" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'proof-of-work');

-- updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON public.invoices;
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
`;

// Edge Function
files["crazzhack/supabase/functions/contact-email/index.ts"] = `
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "pranay@crazzhack.com";

serve(async (req) => {
  try {
    const { record } = await req.json();
    const { full_name, email, phone, description } = record;

    await resend.emails.send({
      from: "CrazzHack <no-reply@crazzhack.com>",
      to: email,
      subject: "We've received your inquiry!",
      html: \`<h2>Thanks, \${full_name}!</h2><p>We’ll get back to you within 24 hours.</p>\`
    });

    await resend.emails.send({
      from: "CrazzHack System <alerts@crazzhack.com>",
      to: ADMIN_EMAIL,
      subject: \`New Lead: \${full_name}\`,
      html: \`<p><strong>Name:</strong> \${full_name}</p><p><strong>Email:</strong> \${email}</p><p><strong>Phone:</strong> \${phone}</p><p>\${description}</p>\`
    });

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" }, status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
`;

// Write all files
function writeFiles(baseDir, fileMap) {
  for (const [filePath, content] of Object.entries(fileMap)) {
    const fullPath = path.join(baseDir, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf-8');
  }
}

writeFiles('.', files);
console.log('✅ CrazzHack project generated in ./crazzhack');
console.log('Next steps: cd crazzhack && npm install && npm run dev');