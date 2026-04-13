# Alumni Donation Hub — Padua
Svelte Vite JavaScript No Backend
Alumni Donation Hub is a web-based donation management platform designed for Blue Knight University. It allows alumni to contribute to fundraising campaigns, participate in events, track their donation history, and manage their personal profiles. Administrators can create and manage campaigns, monitor donation progress, and analyze engagement through dashboards and leaderboards.

# Framework
Svelte — a modern frontend framework that compiles components into efficient JavaScript. Each screen of the application is built as a reusable Svelte component using reactive state management, scoped styling, and modular architecture.

Module
Module 3: Donations

Screens covered:
Login screen
Password recovery
Role selection (Alumni / Admin)

Dashboard (donation summaries, charts, urgent campaigns)
Campaign browsing & details
Events (calendar/list view with RSVP)
Donation checkout (preset/custom amount, receipt, anonymous toggle)
Donation history
Notifications
Profile management
Certificate vault

Admin dashboard (analytics overview)
Campaign management (track progress & status)
Create campaign (2-step process: details → review)
Leaderboards (batch rankings)

#File Structure
firstattempt2026_padua/
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── svelte.config.js
├── README.md
│
└── src/
    ├── main.js
    ├── App.svelte
    ├── app.css
    │
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

Step 1: Clone the repository
git clone https://github.com/lesythx/firstattempt2026_padua.git

Step 2: Navigate into the project folder
cd firstattempt2026_padua

Step 3: Install dependencies
npm install

Step 4: Run development server
npm run dev

| Role   | How to Log In                  | What You'll See                                                    |
| ------ | ------------------------------ | ------------------------------------------------------------------ |
| Alumni | Enter any email + any password | Dashboard, Campaigns, Events, Donations, Certificates, Profile     |
| Admin  | Enter any email + any password | Admin Dashboard, Campaign Management, Create Campaign, Leaderboard |

AI Tools Used

ChatGPT — primary tool for structuring, UI planning, and Svelte implementation guidance
Claude — secondary reference for additional implementation support

Prompt

The following prompt was used to guide the development of the application:

You are developing a desktop-focused Alumni Donation Hub web application in Svelte using HTML, CSS, and JavaScript within VS Code, featuring a step-by-step user flow (login, password recovery, and role selection for Alumni or Admin), where Alumni users access a dashboard with donation summaries, charts, campaigns, events, checkout, notifications, and profile management, while Admin users manage campaigns and analytics, all built with reusable components, mock data, Svelte state management, and a clean, responsive layout optimized primarily for desktop with a sidebar navigation (Home, Events, Give, Alerts, Profile) and consistent design using your defined color system.

#1 Login Screen <img width="1890" height="990" alt="image" src="https://github.com/user-attachments/assets/3b61fcde-b566-4b16-b0cc-5e105c4a88bc" /> #1A Reset password <img width="341" height="377" alt="{17C0218D-CCDC-414B-8401-00CA54ADD015}" src="https://github.com/user-attachments/assets/72552c3c-67ea-4078-8a11-1d0e90fe20ac" /> #Reset password <img width="309" height="369" alt="{CAFC8EA1-42C5-412C-8744-E67CC8E6B1DC}" src="https://github.com/user-attachments/assets/3d2069b7-785c-49b5-bcc9-370b73b7e962" /> #2 Role login selection <img width="957" height="488" alt="{7C08A9C4-5C15-432F-95A8-900FEE685DDA}" src="https://github.com/user-attachments/assets/592fc2ff-bf31-4e65-9f67-82c9ca7a08e5" /> #3 Alumni Dashboard <img width="944" height="496" alt="{75F3AAC3-22CB-4492-BF6D-82829D13461D}" src="https://github.com/user-attachments/assets/fb823b5e-0956-4a13-b882-4c4ded6ab2e7" /> #3A Make a donation <img width="374" height="432" alt="{421C09CE-CBD4-4F22-86CA-46DF5AFC2D3C}" src="https://github.com/user-attachments/assets/edfc6a31-3cda-4f6a-b6ef-e58898ef5ac7" /> #3B <img width="339" height="442" alt="{D2851DB3-CB15-448D-930F-5073C4D1CA6E}" src="https://github.com/user-attachments/assets/d8f08cd7-d456-4385-b6dc-d23e895c98fc" /> #3C <img width="323" height="332" alt="{6125A3AA-074C-4B08-B793-81BF15D6EA0A}" src="https://github.com/user-attachments/assets/55db8c7f-4ed0-42b8-a2ed-3fb91ec3b764" /> #4 Alumni Campaigns <img width="941" height="491" alt="{F44C4BBB-BE49-44CB-BF0A-F6315BDA066F}" src="https://github.com/user-attachments/assets/c5d9b4fa-baff-4a5e-9965-b777d897a23b" /> #5 Alumni Campaign Events <img width="940" height="496" alt="{BA483DAD-F276-4DD9-BE6C-2937B879DBC4}" src="https://github.com/user-attachments/assets/82324169-a89d-48f1-8ef5-7ed92e8bba77" /> #6 Alumni My Donations <img width="955" height="495" alt="{6F9D9831-E735-4CBF-9A50-05095AF66146}" src="https://github.com/user-attachments/assets/963363a6-10fe-4f4c-a55f-51b49feb5a67" /> #7 Alumni Certificates <img width="942" height="498" alt="{719F90CD-D735-4EA0-AC87-8F075B977A8F}" src="https://github.com/user-attachments/assets/35dd7ad7-6836-4504-a589-2d323ccd7d5d" /> #8 Alumni Notification <img width="959" height="497" alt="{C25204A1-EC69-46DE-AFD2-F01471C95444}" src="https://github.com/user-attachments/assets/fddaef32-9503-417b-9f96-3052733c000e" /> #9 Alumni My Profile <img width="956" height="495" alt="{49CD444E-4BD3-47E9-86B9-F1AEE5C39ADA}" src="https://github.com/user-attachments/assets/6ca3e0fc-89f4-4230-8744-4d89e5a5dc08" /> #10 Create Campaign <img width="804" height="488" alt="{892AB32B-32F3-4A45-B7CA-46DC0FF7B372}" src="https://github.com/user-attachments/assets/99f3500d-5a10-4ba0-9d0e-cbdf1c0139be" /> #11 Review Campaign <img width="807" height="375" alt="{1EC5CB91-B661-422E-973E-ECEC359E895C}" src="https://github.com/user-attachments/assets/07c6e6db-5bd2-402b-bdd0-790c2361cce5" /> #12 Leaderboard <img width="956" height="336" alt="{D55EDFFF-15FE-45A6-A782-40C798B874D7}" src="https://github.com/user-attachments/assets/2df2d88f-cc6d-4317-a4fb-6185f0c1df32" />
