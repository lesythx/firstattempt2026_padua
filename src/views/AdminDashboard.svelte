<script>
  import Icon from '../components/Icon.svelte';
  import { go } from '../store.js';
  import { campaigns } from '../store.js';
  import { adminMetrics, topDonors, monthlyData } from '../data.js';

  const fmt = (n) => '₱' + n.toLocaleString();
  const maxMonth = Math.max(...monthlyData.map(m => m.amount));

  const recentDonations = [
    { name:'Dr. Maria Santos',    amount:5000,  campaign:'Scholarship Fund',   method:'GCash',  time:'2h ago' },
    { name:'Engr. Carlos Reyes',  amount:2500,  campaign:'Lab Equipment',       method:'Maya',   time:'4h ago' },
    { name:'Angela Lim',          amount:1000,  campaign:'Scholarship Fund',   method:'Card',   time:'5h ago' },
    { name:'Patrick Gonzalez',    amount:3000,  campaign:'Emergency Relief',    method:'GCash',  time:'Yesterday' },
    { name:'Rosa Luna',           amount:500,   campaign:'Sports Program',      method:'GCash',  time:'Yesterday' },
  ];
</script>

<div class="page fade-in">
  <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;">
    <div>
      <h1 class="page-title">Admin Dashboard</h1>
      <p class="page-sub">Overview of campaigns, donations, and alumni engagement.</p>
    </div>
    <button class="btn-primary" onclick={() => go('admin-campaigns')}>
      <Icon name="plus" size={16} /> New Campaign
    </button>
  </div>

  <!-- Metrics -->
  <div class="metrics-row">
    {#each [
      { label:'Total Raised',      value:fmt(adminMetrics.totalRaised),    icon:'dollar',       color:'#4169E1', bg:'rgba(65,105,225,.08)', note:adminMetrics.monthlyGrowth+' this month' },
      { label:'Active Campaigns',  value:adminMetrics.activeCampaigns,     icon:'target',       color:'#2337C6', bg:'rgba(35,55,198,.08)',  note:'2 ending this month' },
      { label:'Total Donors',      value:adminMetrics.totalDonors,         icon:'users',        color:'#4CC9F0', bg:'rgba(76,201,240,.1)',   note:'+'+adminMetrics.newDonors+' this month' },
      { label:'Avg. Donation',     value:fmt(adminMetrics.avgDonation),    icon:'trending-up',  color:'#10b981', bg:'rgba(16,185,129,.08)', note:'Per transaction' },
    ] as m}
      <div class="metric-card card">
        <div class="metric-top">
          <div class="metric-icon" style="background:{m.bg}"><Icon name={m.icon} size={22} color={m.color} /></div>
          <div class="metric-val" style="color:{m.color}">{m.value}</div>
        </div>
        <div class="metric-label">{m.label}</div>
        <div class="metric-note">{m.note}</div>
      </div>
    {/each}
  </div>

  <div class="dash-grid">
    <!-- Bar chart -->
    <div class="card chart-card">
      <div class="card-head">
        <div class="card-title">Monthly Donations Raised</div>
        <span class="badge badge-green">+18% vs last year</span>
      </div>
      <svg viewBox="0 0 440 170" style="width:100%;height:170px;overflow:visible;">
        {#each monthlyData as m, i}
          {@const barH = Math.round((m.amount / maxMonth) * 120)}
          {@const x = i * 73 + 10}
          <rect x={x} y={140-barH} width="48" height={barH}
                fill="url(#blueGrad)" rx="6" opacity=".9"/>
          <text x={x+24} y="158" text-anchor="middle" font-size="11" fill="#6b7db3" font-family="DM Sans">{m.month}</text>
          <text x={x+24} y={133-barH} text-anchor="middle" font-size="10" fill="#031273" font-family="DM Sans" font-weight="700">
            ₱{Math.round(m.amount/1000)}k
          </text>
        {/each}
        <defs>
          <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4169E1"/>
            <stop offset="100%" stop-color="#2337C6"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Campaign progress -->
    <div class="card prog-card">
      <div class="card-head">
        <div class="card-title">Campaign Progress</div>
        <button class="text-btn" onclick={() => go('admin-campaigns')}>Manage →</button>
      </div>
      {#each $campaigns as c (c.id)}
        {@const pct = Math.min(100, Math.round((c.raised/c.goal)*100))}
        <div class="prog-row">
          <div class="prog-meta">
            <span class="prog-name">{c.title}</span>
            <span class="prog-pct-lbl" style="color:{c.color}">{pct}%</span>
          </div>
          <div class="prog-bar"><div class="prog-fill" style="width:{pct}%;background:{c.color}"></div></div>
          <div class="prog-nums"><span>{fmt(c.raised)}</span><span style="color:#6b7db3">of {fmt(c.goal)}</span></div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Recent donations -->
  <div class="card recent-card">
    <div class="card-head">
      <div class="card-title">Recent Donations</div>
      <button class="text-btn" onclick={() => go('admin-leaderboard')}>View Leaderboard →</button>
    </div>
    <div class="rec-table-head">
      <div>Donor</div><div>Campaign</div><div>Amount</div><div>Method</div><div>Time</div>
    </div>
    {#each recentDonations as d, i}
      <div class="rec-row">
        <div class="donor-cell">
          <div class="sm-avatar">{d.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
          {d.name}
        </div>
        <div style="font-size:.82rem;color:#6b7db3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{d.campaign}</div>
        <div style="font-weight:700;color:#4169E1;">{fmt(d.amount)}</div>
        <div><span class="badge badge-blue">{d.method}</span></div>
        <div style="font-size:.8rem;color:#6b7db3;">{d.time}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .page { padding:32px 36px; animation:fadeIn .35s ease; }
  .page-title{ font-family:'Sora',sans-serif;font-size:1.6rem;font-weight:800;color:#031273; }
  .page-sub  { font-size:.875rem;color:#6b7db3;margin-top:4px; }

  .metrics-row { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px; }
  .metric-card { padding:22px; }
  .metric-top  { display:flex;align-items:center;justify-content:space-between;margin-bottom:10px; }
  .metric-icon { width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center; }
  .metric-val  { font-family:'Sora',sans-serif;font-size:1.6rem;font-weight:800; }
  .metric-label{ font-size:.875rem;font-weight:600;color:#031273;margin-bottom:3px; }
  .metric-note { font-size:.75rem;color:#6b7db3; }

  .dash-grid { display:grid;grid-template-columns:1.6fr 1fr;gap:20px;margin-bottom:20px; }
  .chart-card,.prog-card { padding:24px; }
  .card-head  { display:flex;align-items:center;justify-content:space-between;margin-bottom:16px; }
  .card-title { font-family:'Sora',sans-serif;font-weight:700;font-size:1rem;color:#031273; }
  .text-btn   { background:none;border:none;font-size:.82rem;font-weight:600;color:#4169E1;cursor:pointer; }

  .prog-row { margin-bottom:14px; }
  .prog-meta { display:flex;justify-content:space-between;margin-bottom:5px; }
  .prog-name { font-size:.82rem;color:#031273;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px; }
  .prog-pct-lbl { font-size:.82rem;font-weight:700; }
  .prog-bar  { height:6px;background:#e8edf8;border-radius:999px;overflow:hidden;margin-bottom:3px; }
  .prog-fill { height:100%;border-radius:999px;transition:width .6s ease; }
  .prog-nums { display:flex;justify-content:space-between;font-size:.72rem;color:#031273; }

  .recent-card { padding:24px; }
  .rec-table-head { display:grid;grid-template-columns:2fr 2fr 1fr 1fr 1fr;padding:10px 0;border-bottom:1px solid #e8edf8;font-size:.72rem;font-weight:700;color:#6b7db3;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px; }
  .rec-row { display:grid;grid-template-columns:2fr 2fr 1fr 1fr 1fr;padding:12px 0;border-bottom:1px solid #f0f4ff;align-items:center; }
  .rec-row:last-child { border-bottom:none; }
  .donor-cell { display:flex;align-items:center;gap:10px;font-size:.875rem;font-weight:500;color:#031273; }
  .sm-avatar  { width:30px;height:30px;border-radius:50%;background:#e8edf8;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:700;color:#4169E1;flex-shrink:0; }
</style>
