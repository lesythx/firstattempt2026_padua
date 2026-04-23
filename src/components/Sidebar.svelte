<script>
  import Icon from './Icon.svelte';
  import { view, auth, logout, go } from '../store.js';

  const alumniNav = [
    { id:'home',          label:'Home',          icon:'home'      },
    { id:'events',        label:'Events',        icon:'calendar'  },
    { id:'donations',     label:'Donations',     icon:'gift'      },
    { id:'notifications', label:'Notifications', icon:'bell'      },
    { id:'profile',       label:'Profile',       icon:'user'      },
  ];

  const adminNav = [
    { id:'admin-dashboard',  label:'Dashboard',   icon:'bar-chart' },
    { id:'admin-campaigns',  label:'Campaigns',   icon:'target'    },
    { id:'admin-leaderboard',label:'Leaderboard', icon:'award'     },
  ];

  let nav = $derived($auth.role === 'admin' ? adminNav : alumniNav);
</script>

<aside class="sidebar">
  <!-- Brand -->
  <div class="brand">
    <img src="/icons/addu-seal.png" alt="AdDU Seal" class="brand-seal" />
    <div>
      <div class="brand-name">Donation Hub</div>
      <div class="brand-sub">Ateneo de Davao</div>
    </div>
  </div>

  <!-- Role badge -->
  <div class="role-badge">
    <span class="role-dot"></span>
    {$auth.role === 'admin' ? 'Administrator' : 'Alumni'}
  </div>

  <!-- Nav -->
  <nav class="nav">
    {#each nav as item (item.id)}
      <button
        class="nav-item"
        class:active={$view === item.id}
        onclick={() => go(item.id)}
      >
        <Icon name={item.icon} size={18} color="currentColor" />
        <span>{item.label}</span>
      </button>
    {/each}
  </nav>

  <!-- Bottom: user + logout -->
  <div class="sidebar-footer">
    <div class="user-row">
      <div class="avatar">{$auth.user?.initials ?? '??'}</div>
      <div class="user-info">
        <div class="user-name">{$auth.user?.name ?? ''}</div>
        <div class="user-role">{$auth.user?.role ?? ''}</div>
      </div>
    </div>
    <button class="logout-btn" onclick={logout}>
      <Icon name="log-out" size={16} /> Sign Out
    </button>
  </div>
</aside>

<style>
  .sidebar {
    width: 240px;
    min-width: 240px;
    height: 100vh;
    background: #031273;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0; top: 0;
    z-index: 100;
    border-right: 1px solid rgba(255,255,255,0.06);
  }

  /* Brand */
  .brand {
    display: flex; align-items: center; gap: 12px;
    padding: 24px 20px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .brand-seal {
    width: 40px; height: 40px; border-radius: 50%;
    object-fit: contain; mix-blend-mode: screen; flex-shrink: 0;
  }
  .brand-name { font-family:'Sora',sans-serif; font-weight:700; font-size:0.95rem; color:#fff; }
  .brand-sub  { font-size:0.7rem; color:rgba(255,255,255,0.5); margin-top:1px; }

  /* Role badge */
  .role-badge {
    display: flex; align-items: center; gap: 8px;
    margin: 12px 16px;
    background: rgba(76,201,240,0.12);
    border: 1px solid rgba(76,201,240,0.2);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.72rem;
    font-weight: 600;
    color: #4CC9F0;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .role-dot { width:6px;height:6px;border-radius:50%;background:#4CC9F0;flex-shrink:0; }

  /* Nav */
  .nav { flex:1; padding: 8px 12px; overflow-y:auto; }

  .nav-item {
    width: 100%;
    display: flex; align-items: center; gap: 12px;
    padding: 11px 14px;
    border-radius: 10px;
    background: transparent;
    color: rgba(255,255,255,0.6);
    border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    transition: all 150ms;
    margin-bottom: 2px;
    text-align: left;
  }
  .nav-item:hover { background:rgba(255,255,255,0.07); color:#fff; }
  .nav-item.active {
    background: #2337C6;
    color: #fff;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(35,55,198,0.4);
  }

  /* Footer */
  .sidebar-footer {
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 16px 12px;
  }
  .user-row { display:flex; align-items:center; gap:10px; padding:8px; margin-bottom:8px; }
  .avatar {
    width:36px; height:36px; border-radius:50%;
    background: #2337C6;
    display:flex; align-items:center; justify-content:center;
    font-family:'Sora',sans-serif; font-weight:700; font-size:0.8rem; color:#fff;
    flex-shrink:0;
  }
  .user-name { font-size:0.8rem; font-weight:600; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:130px; }
  .user-role { font-size:0.7rem; color:rgba(255,255,255,0.45); margin-top:1px; }

  .logout-btn {
    width:100%; display:flex; align-items:center; justify-content:center; gap:8px;
    padding:9px; background:rgba(255,255,255,0.06);
    border:none; border-radius:8px;
    color:rgba(255,255,255,0.6);
    font-family:'DM Sans',sans-serif; font-size:0.8rem; cursor:pointer;
    transition:all 150ms;
  }
  .logout-btn:hover { background:rgba(239,68,68,0.15); color:#fca5a5; }
</style>
