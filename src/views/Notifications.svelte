<script>
  import Icon from '../components/Icon.svelte';
  import { notifications, unreadCount, markAllRead, go } from '../store.js';

  const typeConfig = {
    donation: { icon:'heart',    color:'#4169E1', bg:'rgba(65,105,225,.1)'  },
    campaign: { icon:'target',   color:'#2337C6', bg:'rgba(35,55,198,.1)'   },
    event:    { icon:'calendar', color:'#4CC9F0', bg:'rgba(76,201,240,.1)'  },
    cert:     { icon:'award',    color:'#f59e0b', bg:'rgba(245,158,11,.1)'  },
    match:    { icon:'trending-up', color:'#10b981', bg:'rgba(16,185,129,.1)' },
  };

  function actionNav(type) {
    if (type === 'donation' || type === 'campaign' || type === 'match') go('donations');
    else if (type === 'event') go('events');
    else if (type === 'cert') go('donations');
  }
</script>

<div class="page fade-in">
  <div class="page-header">
    <div>
      <h1 class="page-title">Notifications</h1>
      <p class="page-sub">{$unreadCount} unread notification{$unreadCount !== 1 ? 's' : ''}</p>
    </div>
    {#if $unreadCount > 0}
      <button class="btn-secondary" onclick={markAllRead}>
        <Icon name="check" size={15} /> Mark All Read
      </button>
    {/if}
  </div>

  <div class="notif-list">
    {#each $notifications as n (n.id)}
      {@const tc = typeConfig[n.type] ?? typeConfig.campaign}
      <div class="notif-card card" class:unread={n.unread}>
        {#if n.unread}<div class="unread-dot"></div>{/if}
        <div class="notif-icon" style="background:{tc.bg}">
          <Icon name={tc.icon} size={20} color={tc.color} />
        </div>
        <div class="notif-body">
          <div class="notif-title">{n.title}</div>
          <div class="notif-msg">{n.message}</div>
          <div class="notif-foot">
            <span class="notif-time"><Icon name="clock" size={12} color="#6b7db3" /> {n.time}</span>
            {#if n.action}
              <button class="notif-action" style="color:{tc.color}" onclick={() => actionNav(n.type)}>
                {n.action} →
              </button>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .page { padding:32px 36px; animation:fadeIn .35s ease; }
  .page-header { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px; }
  .page-title  { font-family:'Sora',sans-serif;font-size:1.6rem;font-weight:800;color:#031273; }
  .page-sub    { font-size:.875rem;color:#6b7db3;margin-top:4px; }

  .notif-list { display:flex; flex-direction:column; gap:12px; max-width:720px; }

  .notif-card {
    display:flex; align-items:flex-start; gap:16px; padding:20px 24px;
    position:relative; transition:box-shadow 200ms;
  }
  .notif-card.unread { border-left:3px solid #4169E1; }
  .notif-card:hover  { box-shadow:0 4px 20px rgba(3,18,115,.1); }

  .unread-dot { position:absolute;top:18px;right:18px;width:8px;height:8px;border-radius:50%;background:#4169E1; }

  .notif-icon {
    width:44px; height:44px; border-radius:12px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
  }
  .notif-body  { flex:1; min-width:0; }
  .notif-title { font-family:'Sora',sans-serif;font-size:.95rem;font-weight:700;color:#031273;margin-bottom:4px; }
  .notif-msg   { font-size:.875rem;color:#4a5568;line-height:1.5;margin-bottom:10px; }
  .notif-foot  { display:flex;align-items:center;justify-content:space-between; }
  .notif-time  { display:flex;align-items:center;gap:5px;font-size:.75rem;color:#6b7db3; }
  .notif-action{ background:none;border:none;font-size:.82rem;font-weight:700;cursor:pointer;padding:0;transition:opacity 150ms; }
  .notif-action:hover { opacity:.75; }
</style>
