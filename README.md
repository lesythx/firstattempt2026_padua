# Alumni Donation Hub — Padua
Overview
The Alumni Donation Hub is a desktop-focused Progressive Web Application (PWA) built using Svelte (HTML, CSS, JavaScript). It provides a streamlined platform for alumni to participate in donation campaigns, stay updated with events, and manage their profiles, while giving administrators tools to manage campaigns and monitor engagement.
This version focuses on transforming the application into a high-performance, offline-ready PWA.

# Framework
Svelte — a modern frontend framework that compiles components into efficient JavaScript. Each screen of the application is built as a reusable Svelte component using reactive state management, scoped styling, and modular architecture.

# Prompt
You are developing a desktop-focused Alumni Donation Hub web application using Svelte (HTML, CSS, JavaScript) in VS Code, with a simple structure limited to only five main sections: Home, Events, Donations, Notifications, and Profile, avoiding unnecessary folders or complex branching. The app should follow a clear flow starting with Login, Forgot Password, and Role Selection (Alumni or Admin).
For the Alumni side, the Home dashboard shows donation summaries, charts, top donors, and urgent campaigns; Events includes both calendar and list views with RSVP options; Donations handles campaigns, detailed pages, secure checkout (GCash, Maya, Card), donation history, and certificates; Notifications displays updates and alerts with quick actions; and Profile allows viewing and editing of personal info, records, and credentials.

Ensure to meet these goals for PWA:
(1) Generating a valid manifest.json (with University Branding).
(2) Registering a Service Worker.
(3) Implementing Caching Strategies so the app loads instantly and works offline.
(4) Managing the App Icons (using the assets provided in the Branding Kit).

For the Admin side, include a dashboard with key metrics, campaign management with progress tracking, a simple campaign creation flow (details → donation options → publish), and a donation leaderboard.
Use reusable Svelte components, mock data, and simple state management, and design a clean desktop layout with a fixed sidebar using the color palette #031273, #0504AA, #2337C6, #4169E1, 


# Navigate to project
cd alumni-donation-hub

# Install dependencies
npm install

# Run development server
npm run dev


Step 1: Clone the repository
git clone https://github.com/lesythx/firstattempt2026_padua.git
Step 2: Navigate into the project folder
cd firstattempt2026_padua
Step 3: Install dependencies
npm install
Step 4: Run development server
npm run dev

Issues / Hallucinations Fixed
- AI initially generated extra folders and complex routing, violating the “simple structure” requirement → manually simplified project structure
- Service worker had incorrect scope and registration path → corrected to root-level registration
- Manifest had missing/incorrect icon sizes → fixed using Branding Kit assets
- Caching strategy initially applied cache-first to dynamic data, causing stale content → changed to network-first
- Some generated components used non-Svelte syntax (React-like patterns) → rewritten into proper Svelte format
- Login page not 

AI Tools Used

ChatGPT — primary tool for structuring, UI planning, and Svelte implementation guidance
Claude — secondary reference for additional implementation support


Screenshots
#1 Login Screen
<img width="1916" height="1016" alt="image" src="https://github.com/user-attachments/assets/74532006-e69c-457c-8d7c-7a7da7f30c2d" />

#2 Role Selection
<img width="1918" height="1003" alt="image" src="https://github.com/user-attachments/assets/e805c98d-b2f2-47ed-a866-7a9bbceec6af" />

#3 Alumni Home
<img width="1919" height="1011" alt="image" src="https://github.com/user-attachments/assets/f6b68815-b488-47c1-93cf-719c20bcc5f7" />

#4 Alumni Events
<img width="1919" height="1015" alt="image" src="https://github.com/user-attachments/assets/dfd3d471-cfe6-4b65-af14-74364c0f357b" />
<img width="1919" height="1011" alt="image" src="https://github.com/user-attachments/assets/83e86596-ce54-4568-ad5c-d19015bb3534" />

#5 Donation
<img width="1919" height="1007" alt="image" src="https://github.com/user-attachments/assets/21ceb86b-5daf-41b5-9fb2-1a78f56f6b74" />
<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/8eeba6de-da12-47d1-ba5c-68a4af1298f6" />
<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/888d0c65-589a-4b7c-90dc-ae037358828c" />
<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/94803fdb-371f-47d9-af24-9f2118960a53" />
<img width="1919" height="1011" alt="image" src="https://github.com/user-attachments/assets/e51525bd-47f5-4aee-b644-29fac6d0b0f5" />
<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/66f0b976-1dfa-4b1d-9ffd-18bb9d2e4cbf" />

#6 Notifications
<img width="1919" height="1013" alt="image" src="https://github.com/user-attachments/assets/1a7b7fad-dbc6-4115-84a4-353154fabae5" />

#7 Profile
<img width="1919" height="1007" alt="image" src="https://github.com/user-attachments/assets/0520537f-b389-40c3-a016-4b2948aa55b4" />

#As an admin
<img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/deb8a609-99bc-4b3f-a947-ead684114b7a" />
<img width="1919" height="1010" alt="image" src="https://github.com/user-attachments/assets/2892db92-3177-46e3-a237-de2601144161" />
<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/86032edc-345f-4189-a0f3-24e7d56e026b" />
