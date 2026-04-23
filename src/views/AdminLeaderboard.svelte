<script>
  import Icon from '../components/Icon.svelte';
  import { campaigns } from '../store.js';
  import { topDonors } from '../data.js';

  const fmt = (n) => '₱' + n.toLocaleString();

  let filterCampaign = $state('all');
  let filterPeriod   = $state('all');
  let search         = $state('');

  const badgeStyle = {
    Platinum: { bg:'rgba(76,201,240,.15)', color:'#0504AA', label:'🏆 Platinum' },
    Gold:     { bg:'rgba(245,158,11,.15)', color:'#d97706', label:'🥇 Gold'     },
    Silver:   { bg:'rgba(107,119,179,.15)',color:'#4a5580', label:'🥈 Silver'   },
    Bronze:   { bg:'rgba(180,83,9,.12)',   color:'#b45309', label:'🥉 Bronze'   },
  };

  let filtered = $derived(topDonors.filter(d =>
    (search === '' || d.name.toLowerCase().includes(search.toLowerCase()))
  ));
</script>

<div class="page fade-in">
  <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;">
    <div>
      <h1 class="page-title">Donation Leaderboard</h1>
      <p class="page-sub">Top donors ranked by total contributions across all campaigns.</p>
    </div>
    <button class="btn-secondary">
      <Icon name="download" size={15} /> Export CSV
    </button>
  </div>

  <!-- Top 3 podium cards -->
  <div class="podium-row">
    {#each [topDonors[1], topDonors[0], topDonors[2]] as d, pi}
      {@const isFirst = pi === 1}
      <div class="podium-card card" class:first={isFirst}>
        <div class="podium-rank" class:gold={isFirst} class:silver={pi===0} class:bronze={pi===2}>
          {isFirst ? '🏆' : pi===0 ? '🥈' : '🥉'}
        </div>
        <div class="podium-avatar" class:big={isFirst}>{d.initials}</div>
        <div class="podium-name">{d.name}</div>
        <div class="podium-batch">{d.batch}</div>
        <div class="podium-amount" class:highlight={isFirst}>{fmt(d.amount)}</div>
        <div class="podium-meta">{d.campaigns} campaign{d.campaigns !== 1 ? 's' : ''}</div>
      </div>
    {/each}
  </div>

  <!-- Filters -->
  <div class="filter-bar card">
    <div class="search-wrap">
      <Icon name="search" size={15} color="#6b7db3" />
      <input type="text" placeholder="Search donors…" bind:value={search} />
    </div>
    <div class="filter-group">
      <label>Campaign</label>
      <select bind:value={filterCampaign}>
        <option value="all">All Campaigns</option>
        {#each $campaigns as c (c.id)}
          <option value={c.id}>{c.title}</option>
        {/each}
      </select>
    </div>
    <div class="filter-group">
      <label>Period</label>
      <select bind:value={filterPeriod}>
        <option value="all">All Time</option>
        <option value="year">This Year</option>
        <option value="month">This Month</option>
      </select>
    </div>
  </div>

  <!-- Full Leaderboard Table -->
  <div class="card table-wrap">
    <div class="table-head">
      <div>Rank</div>
      <div>Donor</div>
      <div>Batch</div>
      <div>Total Donated</div>
      <div>Campaigns</div>
      <div>Badge</div>
    </div>

    {#each filtered as d (d.rank)}
      {@const bs = badgeStyle[d.badge] ?? badgeStyle.Bronze}
      <div class="table-row" class:top3={d.rank <= 3}>
        <!-- Rank -->
        <div class="rank-cell">
          {#if d.rank === 1}
            <span class="rank-icon">🏆</span>
          {:else if d.rank === 2}
            <span class="rank-icon">🥈</span>
          {:else if d.rank === 3}
            <span class="rank-icon">🥉</span>
          {:else}
            <span class="rank-num">{d.rank}</span>
          {/if}
        </div>

        <!-- Donor -->
        <div class="donor-cell">
          <div class="donor-av">{d.initials}</div>
          <div>
            <div class="donor-name">{d.name}</div>
          </div>
        </div>

        <!-- Batch -->
        <div class="batch-cell">{d.batch}</div>

        <!-- Amount -->
        <div class="amount-cell">{fmt(d.amount)}</div>

        <!-- Campaigns -->
        <div class="camps-cell">
          <div class="camp-pips">
            {#each Array(d.campaigns) as _}
              <span class="pip"></span>
            {/each}
          </div>
          <span>{d.campaigns}</span>
        </div>

        <!-- Badge -->
        <div>
          <span class="badge" style="background:{bs.bg};color:{bs.color};">{bs.label}</span>
        </div>
      </div>
    {/each}

    {#if filtered.length === 0}
      <div style="text-align:center;padding:48px;color:#6b7db3;">
        <Icon name="search" size={32} color="#c7d0f0" />
        <p style="margin-top:12px;">No donors match your search.</p>
      </div>
    {/if}
  </div>

  <!-- Summary stats footer -->
  <div class="summary-row">
    {#each [
      { label:'Total Raised by Top 10', value: fmt(topDonors.reduce((s,d)=>s+d.amount,0)), color:'#4169E1' },
      { label:'Avg. per Top Donor',     value: fmt(Math.round(topDonors.reduce((s,d)=>s+d.amount,0)/topDonors.length)), color:'#2337C6' },
      { label:'Most Active Donor',      value: topDonors.sort((a,b)=>b.campaigns-a.campaigns)[0].name, color:'#4CC9F0' },
    ] as s}
      <div class="card sum-card">
        <div class="sum-val" style="color:{s.color}">{s.value}</div>
        <div class="sum-lbl">{s.label}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .page { padding:32px 36px; animation:fadeIn .35s ease; }
  .page-title{ font-family:'Sora',sans-serif;font-size:1.6rem;font-weight:800;color:#031273; }
  .page-sub  { font-size:.875rem;color:#6b7db3;margin-top:4px; }

  /* Podium */
  .podium-row { display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:16px;margin-bottom:24px;align-items:end; }
  .podium-card {
    padding:24px 20px; text-align:center; display:flex;flex-direction:column;align-items:center;gap:6px;
    transition:transform 200ms; position:relative; overflow:hidden;
  }
  .podium-card.first { background:linear-gradient(160deg,#031273,#2337C6);color:#fff;transform:scaleY(1.03); }
  .podium-card.first::before { content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(76,201,240,.15),transparent); }
  .podium-rank { font-size:1.6rem; }
  .podium-avatar {
    width:52px;height:52px;border-radius:50%;background:#e8edf8;
    display:flex;align-items:center;justify-content:center;
    font-family:'Sora',sans-serif;font-weight:800;font-size:1rem;color:#4169E1;
  }
  .podium-avatar.big { width:64px;height:64px;font-size:1.25rem;background:rgba(255,255,255,.2);color:#fff;border:3px solid rgba(255,255,255,.3); }
  .podium-name  { font-family:'Sora',sans-serif;font-size:.9rem;font-weight:700;color:#031273; }
  .podium-card.first .podium-name { color:#fff; }
  .podium-batch { font-size:.75rem;color:#6b7db3; }
  .podium-card.first .podium-batch { color:rgba(255,255,255,.6); }
  .podium-amount{ font-family:'Sora',sans-serif;font-size:1.1rem;font-weight:800;color:#4169E1; }
  .podium-amount.highlight { color:#4CC9F0;font-size:1.3rem; }
  .podium-meta  { font-size:.72rem;color:#6b7db3; }
  .podium-card.first .podium-meta { color:rgba(255,255,255,.5); }

  /* Filters */
  .filter-bar {
    display:flex; align-items:center; gap:16px; padding:14px 20px; margin-bottom:20px;
  }
  .search-wrap {
    display:flex;align-items:center;gap:9px;flex:1;
    background:#f8faff;border:1.5px solid #e0e7f8;border-radius:10px;padding:9px 14px;
  }
  .search-wrap input { border:none;background:transparent;font-size:.875rem;color:#031273;flex:1;outline:none; }
  .filter-group { display:flex;align-items:center;gap:8px; }
  .filter-group label { font-size:.78rem;font-weight:600;color:#6b7db3;white-space:nowrap; }
  .filter-group select { padding:8px 12px;border:1.5px solid #e0e7f8;border-radius:10px;font-size:.875rem;color:#031273;background:#f8faff;cursor:pointer; }

  /* Table */
  .table-wrap { overflow:hidden; margin-bottom:20px; }
  .table-head {
    display:grid;grid-template-columns:60px 2fr 1fr 1.2fr 1fr 1fr;
    padding:12px 20px;background:#f8faff;font-size:.72rem;font-weight:700;
    color:#6b7db3;text-transform:uppercase;letter-spacing:.05em;border-bottom:1.5px solid #e8edf8;
  }
  .table-row {
    display:grid;grid-template-columns:60px 2fr 1fr 1.2fr 1fr 1fr;
    padding:14px 20px;border-bottom:1px solid #f0f4ff;align-items:center;
    transition:background 150ms;
  }
  .table-row:last-child { border-bottom:none; }
  .table-row:hover      { background:#fafbff; }
  .table-row.top3       { background:rgba(65,105,225,.02); }

  .rank-cell  { display:flex;align-items:center; }
  .rank-icon  { font-size:1.3rem; }
  .rank-num   { width:28px;height:28px;border-radius:50%;background:#f0f4ff;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700;color:#6b7db3; }

  .donor-cell { display:flex;align-items:center;gap:10px; }
  .donor-av   { width:36px;height:36px;border-radius:50%;background:#e8edf8;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;color:#4169E1;flex-shrink:0; }
  .donor-name { font-size:.875rem;font-weight:600;color:#031273; }

  .batch-cell  { font-size:.82rem;color:#6b7db3; }
  .amount-cell { font-family:'Sora',sans-serif;font-size:.95rem;font-weight:800;color:#4169E1; }

  .camps-cell { display:flex;align-items:center;gap:8px;font-size:.875rem;color:#031273; }
  .camp-pips  { display:flex;gap:3px; }
  .pip        { width:8px;height:8px;border-radius:50%;background:#4169E1;opacity:.6; }

  /* Summary */
  .summary-row { display:grid;grid-template-columns:repeat(3,1fr);gap:16px; }
  .sum-card { padding:20px 24px; }
  .sum-val  { font-family:'Sora',sans-serif;font-size:1.3rem;font-weight:800;margin-bottom:4px; }
  .sum-lbl  { font-size:.78rem;color:#6b7db3; }
</style>
