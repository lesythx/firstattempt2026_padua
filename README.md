# 📘 Alumni Donation Hub (Admin Module – Donations)

Framework: Svelte
Module: Module 3 – Donations
Type: Desktop-focused Web Application (Frontend Only)

# 📌 Overview

This project is a desktop-focused Alumni Donation Hub web application built using Svelte, HTML, CSS, and JavaScript in VS Code. It simulates a full donation ecosystem using mock data (no backend) and demonstrates a structured user flow for both Alumni and Admin roles.

The system includes authentication, dashboards, campaign management, donation tracking, and analytics — all within a clean UI using reusable Svelte components and state management.

# 🎯 Key Features
# 🔐 Authentication Flow
Login screen
Password recovery
Role selection (Alumni / Admin)
# 🎓 Alumni Module
Dashboard (donation summaries, charts, urgent campaigns)
Campaign browsing & details
Events (calendar/list view + RSVP)
Donation checkout (preset/custom amount, receipt, anonymous toggle)
Donation history
Notifications
Profile management
Certificate vault
# 🛠️ Admin Module
Admin dashboard (analytics overview)
Campaign management (track progress & status)
Create campaign (2-step process: details → review)
Leaderboards (batch rankings)
# 🗂️ File Structure
src/
├── lib/
│   ├── components/
│   │   ├── AdminDashboard.svelte
│   │   ├── Alerts.svelte
│   │   ├── AlumniDashboard.svelte
│   │   ├── Auth.svelte
│   │   ├── Campaigns.svelte
│   │   ├── Certificates.svelte
│   │   ├── CheckoutModal.svelte
│   │   ├── CreateCampaign.svelte
│   │   ├── Events.svelte
│   │   ├── History.svelte
│   │   ├── Leaderboard.svelte
│   │   ├── ManageCampaigns.svelte
│   │   ├── Profile.svelte
│   │   └── Sidebar.svelte
│   │
│   ├── data/
│   ├── data.js
│   ├── icons.js
│   └── store.js
│
├── app.css
├── App.svelte
├── index.html
├── main.js

# 🖥️ Screens / UI
Login
Reset Password
Role Selection
# 🎓 Alumni Views
Dashboard
Make Donation (modal flow)
Campaigns
Events
My Donations
Certificates
Notifications
# Profile
🛠️ Admin Views
Create Campaign
Review Campaign
Leaderboard

# ⚙️ Installation & Setup
Requirements
Node.js v18 or higher → https://nodejs.org
npm (comes with Node)

# 🚀 Steps to Run
Step 1: Clone the repository
git clone https://github.com/lesythx/firstattempt2026_padua.git

Step 2: Navigate into the project folder
cd firstattempt2026_padua

Step 3: Install dependencies
npm install

Step 4: Run development server
npm run dev
