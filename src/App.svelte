<script>
  import { auth, view } from './store.js';
  import Sidebar from './components/Sidebar.svelte';

  // Auth views
  import Login         from './views/Login.svelte';
  import ForgotPassword from './views/ForgotPassword.svelte';
  import RoleSelect    from './views/RoleSelect.svelte';

  // Alumni views
  import Home          from './views/Home.svelte';
  import Events        from './views/Events.svelte';
  import Donations     from './views/Donations.svelte';
  import Notifications from './views/Notifications.svelte';
  import Profile       from './views/Profile.svelte';

  // Admin views
  import AdminDashboard  from './views/AdminDashboard.svelte';
  import AdminCampaigns  from './views/AdminCampaigns.svelte';
  import AdminLeaderboard from './views/AdminLeaderboard.svelte';

  let isApp = $derived($auth.loggedIn);
</script>

<div class="app">
  {#if isApp}
    <Sidebar />
    <main class="content">
      {#if $view === 'home'}             <Home />
      {:else if $view === 'events'}       <Events />
      {:else if $view === 'donations'}    <Donations />
      {:else if $view === 'notifications'}<Notifications />
      {:else if $view === 'profile'}      <Profile />
      {:else if $view === 'admin-dashboard'}  <AdminDashboard />
      {:else if $view === 'admin-campaigns'}  <AdminCampaigns />
      {:else if $view === 'admin-leaderboard'}<AdminLeaderboard />
      {/if}
    </main>
  {:else}
    {#if $view === 'login'}  <Login />
    {:else if $view === 'forgot'} <ForgotPassword />
    {:else if $view === 'roleselect'} <RoleSelect />
    {/if}
  {/if}
</div>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { font-size: 16px; -webkit-font-smoothing: antialiased; }
  :global(body) {
    font-family: 'DM Sans', sans-serif;
    background: #f0f4ff;
    color: #031273;
    min-height: 100vh;
  }
  :global(button) { font-family: 'DM Sans', sans-serif; cursor: pointer; border: none; outline: none; }
  :global(input, textarea, select) { font-family: 'DM Sans', sans-serif; outline: none; }
  :global(img) { display: block; max-width: 100%; }
  :global(a) { text-decoration: none; color: inherit; }

  :global(::-webkit-scrollbar)       { width: 5px; height: 5px; }
  :global(::-webkit-scrollbar-track) { background: transparent; }
  :global(::-webkit-scrollbar-thumb) { background: #c7d0f0; border-radius: 999px; }

  :global(.badge) {
    display: inline-flex; align-items: center;
    padding: 2px 10px; border-radius: 999px;
    font-size: 0.7rem; font-weight: 600;
    font-family: 'Sora', sans-serif; letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  :global(.badge-blue)    { background:rgba(65,105,225,0.12); color:#2337C6; }
  :global(.badge-cyan)    { background:rgba(76,201,240,0.15); color:#0504AA; }
  :global(.badge-red)     { background:rgba(239,68,68,0.12);  color:#dc2626; }
  :global(.badge-green)   { background:rgba(16,185,129,0.12); color:#059669; }
  :global(.badge-gold)    { background:rgba(245,158,11,0.12); color:#d97706; }
  :global(.badge-purple)  { background:rgba(168,85,247,0.12); color:#7c3aed; }

  :global(.card) {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(3,18,115,0.07);
    border: 1px solid rgba(65,105,225,0.08);
  }
  :global(.btn-primary) {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: #4169E1; color: #fff;
    border: none; border-radius: 10px;
    padding: 10px 22px; font-weight: 600; font-size: 0.875rem;
    cursor: pointer; transition: all 150ms;
    font-family: 'Sora', sans-serif;
  }
  :global(.btn-primary:hover) { background: #2337C6; transform: translateY(-1px); }
  :global(.btn-secondary) {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: rgba(65,105,225,0.08); color: #4169E1;
    border: 1.5px solid rgba(65,105,225,0.2); border-radius: 10px;
    padding: 9px 20px; font-weight: 600; font-size: 0.875rem;
    cursor: pointer; transition: all 150ms;
    font-family: 'Sora', sans-serif;
  }
  :global(.btn-secondary:hover) { background: rgba(65,105,225,0.14); }

  :global(.page) { padding: 32px 36px; max-width: 1200px; }
  :global(.page-title) {
    font-family: 'Sora', sans-serif; font-size: 1.5rem; font-weight: 800; color: #031273; margin-bottom: 4px;
  }
  :global(.page-sub) { font-size: 0.875rem; color: #6b7db3; margin-bottom: 28px; }

  :global(.fade-in) { animation: fadeIn 0.35s ease forwards; }

  .app { display: flex; min-height: 100vh; }
  .content {
    margin-left: 240px;
    flex: 1;
    min-height: 100vh;
    overflow-y: auto;
    background: #f0f4ff;
  }
</style>
