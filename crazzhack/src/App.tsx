import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PhoneAuthPage from './pages/PhoneAuthPage'
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
      <Route path="/verify-phone" element={<PhoneAuthPage />} />
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

export default App
