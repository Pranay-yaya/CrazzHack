
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
