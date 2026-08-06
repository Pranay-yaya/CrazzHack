# CrazzHack

CrazzHack is a digital solutions platform for people, creators, and businesses who need help turning ideas into real results. From building a project or website to improving a social-media presence, we provide practical guidance and tailored technical solutions.

## What we help with

- **Project development** — websites, web apps, dashboards, portfolios, and custom software
- **AI and automation** — smart workflows, integrations, and AI/ML-powered features
- **UI/UX design** — clean, modern interfaces that are easy to use
- **Cybersecurity and cloud** — secure, scalable setups for your digital products
- **Social-media management** — content planning, campaign support, audience strategy, analytics, and authentic engagement growth
- **Technical guidance** — help understanding a problem, selecting the right tools, and planning the next steps

> We focus on sustainable, authentic social-media growth and platform-compliant campaigns—not fake followers, automated likes, or artificial engagement.

## Features

- Premium responsive dark interface with animated gradients and scroll-reveal effects
- Service, process, project inquiry, and contact sections
- Real-time support chat
- Team dashboard for inquiries, projects, tasks, invoices, and social campaigns
- Email/password authentication and phone-number OTP verification through Supabase
- Supabase-backed data and storage integration

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router
- Lucide icons

## Run locally

### Prerequisites

- Node.js 18 or later
- A Supabase project

### Installation

```bash
git clone <your-repository-url>
cd crazzhack
npm install
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the development server:

```bash
npm run dev
```

Open `http://127.0.0.1:3000` in your browser.

## Phone OTP setup

Phone verification uses Supabase Auth. In your Supabase project, enable **Phone Auth** and configure an SMS provider. Users must enter their number in international format, for example `+919876543210`.

## Deploying to Vercel

1. Import the repository into Vercel or run `vercel` from the project directory.
2. Set the root directory to `crazzhack` if the repository contains this parent folder.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Vercel **Settings → Environment Variables** for Production.
4. Deploy.

## Contact

Have an idea, project, or digital problem to solve? Use the contact form in the application to start a conversation with CrazzHack.

---

Built with care by CrazzHack.
