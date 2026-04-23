<script>
  import Icon from '../components/Icon.svelte';
  import { go } from '../store.js';
  import { campaigns, donationHistory } from '../store.js';
  import { currentUser, topDonors, monthlyData, adminMetrics } from '../data.js';

  const fmt = (n) => '₱' + n.toLocaleString();

  // Donut chart (donation by category) data
  const categories = [
    { label:'Scholarship',    pct:44, color:'#4169E1' },
    { label:'Infrastructure', pct:24, color:'#4CC9F0' },
    { label:'Relief',         pct:20, color:'#2337C6' },
    { label:'Other',          pct:12, color:'#a5b4fc' },
  ];

  // SVG donut helpers
  const R = 52, CX = 68, CY = 68;
  const circ = 2 * Math.PI * R;
  function donutSegments(data) {
    let cum = 0;
    return data.map(d => {
      const dash   = (d.pct / 100) * circ;
      const offset = -(cum / 100) * circ;
      cum += d.pct;
      return { ...d, dash, offset };
    });
  }
  const segments = donutSegments(categories);

  const maxMonth = Math.max(...monthlyData.map(m => m.amount));
</script>

<div class="page fade-in">
  <!-- Header -->
  <div class="page-header">
    <div>
      <h1 class="page-title">Welcome back, {currentUser.firstName}! 👋</h1>
      <p class="page-sub">Here's an overview of your giving and alumni activity.</p>
    </div>
    <button class="btn-primary" onclick={() => go('donations')}>
      <Icon name="gift" size={16} /> Donate Now
    </button>
  </div>

  <!-- Stats Row -->
  <div class="stats-row">
    {#each [
      { label:'Total Donated',     value: fmt(currentUser.totalDonated), icon:'heart',       color:'#4169E1', bg:'rgba(65,105,225,.08)' },
      { label:'Campaigns Supported', value: currentUser.campaignsSupported, icon:'target',   color:'#2337C6', bg:'rgba(35,55,198,.08)'  },
      { label:'This Month',        value: fmt(5000),                   icon:'trending-up',   color:'#10b981', bg:'rgba(16,185,129,.08)' },
      { label:'Certificates',      value: $donationHistory.filter(d=>d.cert).length, icon:'award', color:'#f59e0b', bg:'rgba(245,158,11,.08)' },
    ] as s}
      <div class="stat-card card">
        <div class="stat-icon" style="background:{s.bg}">
          <Icon name={s.icon} size={22} color={s.color} />
        </div>
        <div class="stat-value" style="color:{s.color}">{s.value}</div>
        <div class="stat-label">{s.label}</div>
      </div>
    {/each}
  </div>

  <!-- Charts row -->
  <div class="charts-row">
    <!-- Monthly bar chart -->
    <div class="card chart-card">
      <div class="card-head">
        <div>
          <div class="card-title">Monthly Giving</div>
          <div class="card-sub">Last 6 months</div>
        </div>
        <span class="badge badge-green">+18%</span>
      </div>
      <svg viewBox="0 0 420 160" style="width:100%;height:160px;overflow:visible;">
        {#each monthlyData as m, i}
          {@const barH = Math.round((m.amount / maxMonth) * 110)}
          {@const x = i * 70 + 10}
          <rect x={x} y={130 - barH} width="44" height={barH} fill="#4169E1" rx="5"
                style="opacity:.85;transition:all 300ms;"/>
          <text x={x+22} y="148" text-anchor="middle" font-size="11" fill="#6b7db3" font-family="DM Sans">{m.month}</text>
          <text x={x+22} y={125 - barH} text-anchor="middle" font-size="10" fill="#031273" font-family="DM Sans" font-weight="600">
            ₱{Math.round(m.amount/1000)}k
          </text>
        {/each}
      </svg>
    </div>

    <!-- Donut chart -->
    <div class="card chart-card donut-card">
      <div class="card-head">
        <div>
          <div class="card-title">By Category</div>
          <div class="card-sub">Donation breakdown</div>
        </div>
      </div>
      <div class="donut-wrap">
        <svg viewBox="0 0 136 136" width="136" height="136" style="flex-shrink:0;">
          {#each segments as seg}
            <circle cx={CX} cy={CY} r={R}
              fill="none" stroke={seg.color} stroke-width="22"
              stroke-dasharray="{seg.dash} {circ}"
              stroke-dashoffset={seg.offset}
              transform="rotate(-90 {CX} {CY})"
            />
          {/each}
          <text x={CX} y={CY - 6} text-anchor="middle" font-size="13" font-weight="700" fill="#031273" font-family="Sora">Total</text>
          <text x={CX} y={CY + 10} text-anchor="middle" font-size="11" fill="#6b7db3" font-family="DM Sans">Giving</text>
        </svg>
        <div class="legend">
          {#each categories as c}
            <div class="legend-item">
              <span class="legend-dot" style="background:{c.color}"></span>
              <span class="legend-label">{c.label}</span>
              <span class="legend-pct">{c.pct}%</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom row: Active Campaigns + Top Donors -->
  <div class="bottom-row">
    <!-- Active Campaigns -->
    <div class="card campaigns-card">
      <div class="card-head">
        <div class="card-title">Active Campaigns</div>
        <button class="text-btn" onclick={() => go('donations')}>View All →</button>
      </div>
      {#each $campaigns.slice(0,4) as c (c.id)}
        {@const pct = Math.min(100, Math.round((c.raised / c.goal) * 100))}
        <div class="campaign-row">
          <div class="campaign-dot" style="background:{c.color}"></div>
          <div class="campaign-info">
            <div class="campaign-name">{c.title}</div>
            <div class="prog-wrap">
              <div class="prog-bar">
                <div class="prog-fill" style="width:{pct}%;background:{c.color}"></div>
              </div>
              <span class="prog-pct">{pct}%</span>
            </div>
            <div class="campaign-meta">
              <span>{fmt(c.raised)} raised</span>
              <span>of {fmt(c.goal)}</span>
            </div>
          </div>
          {#if c.urgent}
            <span class="badge badge-red">Urgent</span>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Top Donors -->
    <div class="card donors-card">
      <div class="card-head">
        <div class="card-title">Top Donors</div>
        <button class="text-btn" onclick={() => go('donations')}>See All →</button>
      </div>
      {#each topDonors.slice(0,6) as d (d.rank)}
        <div class="donor-row">
          <div class="donor-rank" class:gold={d.rank===1} class:silver={d.rank===2} class:bronze={d.rank===3}>
            {d.rank <= 3 ? '★' : d.rank}
          </div>
          <div class="donor-avatar">{d.initials}</div>
          <div class="donor-info">
            <div class="donor-name">{d.name}</div>
            <div class="donor-batch">{d.batch}</div>
          </div>
          <div class="donor-amount">{fmt(d.amount)}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .page { padding:32px 36px; animation:fadeIn .35s ease; }
  .page-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:28px; }
  .page-title  { font-family:'Sora',sans-serif; font-size:1.6rem; font-weight:800; color:#031273; }
  .page-sub    { font-size:.875rem; color:#6b7db3; margin-top:4px; }

  /* Stats */
  .stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px; }
  .stat-card  { padding:22px; display:flex; flex-direction:column; gap:8px; }
  .stat-icon  { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; }
  .stat-value { font-family:'Sora',sans-serif; font-size:1.6rem; font-weight:800; }
  .stat-label { font-size:.8rem; color:#6b7db3; font-weight:500; }

  /* Charts */
  .charts-row { display:grid; grid-template-columns:2fr 1fr; gap:16px; margin-bottom:24px; }
  .chart-card { padding:24px; }
  .card-head  { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:16px; }
  .card-title { font-family:'Sora',sans-serif; font-weight:700; font-size:1rem; color:#031273; }
  .card-sub   { font-size:.78rem; color:#6b7db3; margin-top:2px; }
  .donut-card .donut-wrap { display:flex; align-items:center; gap:20px; }
  .legend     { display:flex; flex-direction:column; gap:10px; flex:1; }
  .legend-item{ display:flex; align-items:center; gap:8px; }
  .legend-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
  .legend-label{ font-size:.8rem; color:#031273; flex:1; }
  .legend-pct { font-size:.8rem; font-weight:700; color:#031273; }

  /* Bottom */
  .bottom-row { display:grid; grid-template-columns:1.4fr 1fr; gap:16px; }

  .campaigns-card, .donors-card { padding:24px; }

  .campaign-row {
    display:flex; align-items:flex-start; gap:12px;
    padding:12px 0; border-bottom:1px solid #f0f4ff;
  }
  .campaign-row:last-child { border-bottom:none; }
  .campaign-dot  { width:10px; height:10px; border-radius:50%; flex-shrink:0; margin-top:4px; }
  .campaign-info { flex:1; min-width:0; }
  .campaign-name { font-size:.875rem; font-weight:600; color:#031273; margin-bottom:6px;
                   white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .prog-wrap  { display:flex; align-items:center; gap:8px; margin-bottom:4px; }
  .prog-bar   { flex:1; height:6px; background:#e8edf8; border-radius:999px; overflow:hidden; }
  .prog-fill  { height:100%; border-radius:999px; transition:width .6s ease; }
  .prog-pct   { font-size:.75rem; font-weight:700; color:#031273; min-width:30px; }
  .campaign-meta{ display:flex; justify-content:space-between; font-size:.75rem; color:#6b7db3; }

  .donor-row {
    display:flex; align-items:center; gap:10px;
    padding:10px 0; border-bottom:1px solid #f0f4ff;
  }
  .donor-row:last-child { border-bottom:none; }
  .donor-rank  {
    width:24px; font-size:.8rem; font-weight:700; color:#6b7db3;
    text-align:center; flex-shrink:0;
  }
  .donor-rank.gold   { color:#d97706; }
  .donor-rank.silver { color:#6b7db3; }
  .donor-rank.bronze { color:#b45309; }
  .donor-avatar {
    width:34px; height:34px; border-radius:50%; background:#e8edf8;
    display:flex; align-items:center; justify-content:center;
    font-size:.75rem; font-weight:700; color:#4169E1; flex-shrink:0;
  }
  .donor-info  { flex:1; min-width:0; }
  .donor-name  { font-size:.825rem; font-weight:600; color:#031273; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .donor-batch { font-size:.72rem; color:#6b7db3; }
  .donor-amount{ font-size:.825rem; font-weight:700; color:#4169E1; white-space:nowrap; }

  .text-btn { background:none; border:none; font-size:.82rem; font-weight:600; color:#4169E1; cursor:pointer; }
</style>
