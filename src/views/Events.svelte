<script>
  import Icon from '../components/Icon.svelte';
  import { events } from '../data.js';

  let viewMode  = $state('list');   // 'list' | 'calendar'
  let rsvpd     = $state(new Set(events.filter(e=>e.rsvpd).map(e=>e.id)));
  let selected  = $state(null);

  // Calendar state
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let calYear  = $state(2026);
  let calMonth = $state(2); // March

  let daysInMonth = $derived(new Date(calYear, calMonth + 1, 0).getDate());
  let firstDay    = $derived(new Date(calYear, calMonth, 1).getDay());

  function eventsOnDay(day) {
    const str = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return events.filter(e => e.date === str);
  }

  function toggleRsvp(id) {
    rsvpd = new Set(rsvpd);
    rsvpd.has(id) ? rsvpd.delete(id) : rsvpd.add(id);
  }

  const typeColors = {
    Reunion:'#4169E1', Fundraiser:'#2337C6', Networking:'#4CC9F0',
    Ceremony:'#f59e0b', Workshop:'#10b981',
  };
</script>

<div class="page fade-in">
  <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;">
    <div>
      <h1 class="page-title">Events</h1>
      <p class="page-sub">RSVP to upcoming alumni gatherings and activities.</p>
    </div>
    <div class="view-toggle">
      <button class:active={viewMode==='list'}     onclick={() => viewMode='list'}>
        <Icon name="list" size={16} /> List
      </button>
      <button class:active={viewMode==='calendar'} onclick={() => viewMode='calendar'}>
        <Icon name="calendar" size={16} /> Calendar
      </button>
    </div>
  </div>

  <!-- LIST VIEW -->
  {#if viewMode === 'list'}
    <div class="events-list">
      {#each events as ev (ev.id)}
        {@const isRsvpd = rsvpd.has(ev.id)}
        <div class="event-card card" class:featured={ev.featured}>
          <div class="event-color-bar" style="background:{typeColors[ev.type] ?? '#4169E1'}"></div>
          <div class="event-body">
            <div class="event-head">
              <div>
                <span class="badge" style="background:{typeColors[ev.type]}22;color:{typeColors[ev.type]};">{ev.type}</span>
                {#if ev.featured}<span class="badge badge-gold" style="margin-left:6px;">Featured</span>{/if}
              </div>
              <div class="event-attendees"><Icon name="users" size={14} color="#6b7db3" /> {ev.attending} attending</div>
            </div>
            <h3 class="event-title">{ev.title}</h3>
            <p class="event-desc">{ev.description}</p>
            <div class="event-meta">
              <span><Icon name="calendar" size={14} color="#6b7db3" /> {ev.dateLabel}</span>
              <span><Icon name="clock"    size={14} color="#6b7db3" /> {ev.time}</span>
              <span><Icon name="map-pin"  size={14} color="#6b7db3" /> {ev.location}</span>
            </div>
            <div class="event-actions">
              <button
                class="rsvp-btn"
                class:rsvpd={isRsvpd}
                onclick={() => toggleRsvp(ev.id)}
              >
                {#if isRsvpd}
                  <Icon name="check" size={15} /> RSVP'd
                {:else}
                  <Icon name="plus" size={15} /> RSVP
                {/if}
              </button>
              <button class="btn-secondary" onclick={() => selected = ev}>View Details</button>
            </div>
          </div>
        </div>
      {/each}
    </div>

  <!-- CALENDAR VIEW -->
  {:else}
    <div class="cal-wrap card">
      <!-- Month nav -->
      <div class="cal-nav">
        <button onclick={() => { if(calMonth===0){calMonth=11;calYear--;}else calMonth--; }}>
          <Icon name="chevron-left" size={18} />
        </button>
        <span class="cal-month">{MONTHS[calMonth]} {calYear}</span>
        <button onclick={() => { if(calMonth===11){calMonth=0;calYear++;}else calMonth++; }}>
          <Icon name="chevron-right" size={18} />
        </button>
      </div>
      <!-- Day headers -->
      <div class="cal-grid header">
        {#each DAYS as d}<div class="cal-day-hd">{d}</div>{/each}
      </div>
      <!-- Cells -->
      <div class="cal-grid">
        {#each Array(firstDay).fill(null) as _}<div></div>{/each}
        {#each Array.from({length:daysInMonth},(_,i)=>i+1) as day}
          {@const dayEvs = eventsOnDay(day)}
          <div class="cal-cell" class:has-event={dayEvs.length>0} onclick={() => dayEvs[0] && (selected = dayEvs[0])}>
            <span class="cal-num">{day}</span>
            {#each dayEvs.slice(0,2) as ev}
              <div class="cal-ev-dot" style="background:{typeColors[ev.type]??'#4169E1'}" title={ev.title}></div>
            {/each}
          </div>
        {/each}
      </div>
      <!-- Legend -->
      <div class="cal-legend">
        {#each Object.entries(typeColors) as [t,c]}
          <div class="legend-item"><span style="width:10px;height:10px;border-radius:50%;background:{c};display:inline-block;margin-right:5px;"></span>{t}</div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<!-- Event Detail Modal -->
{#if selected}
  {@const ev = selected}
  {@const isRsvpd = rsvpd.has(ev.id)}
  <div class="overlay" onclick={() => selected=null} role="presentation">
    <div class="modal card" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header" style="background:{typeColors[ev.type]??'#4169E1'}20;border-bottom:2px solid {typeColors[ev.type]??'#4169E1'}30;">
        <div>
          <span class="badge" style="background:{typeColors[ev.type]}22;color:{typeColors[ev.type]};">{ev.type}</span>
          <h2 style="font-family:'Sora',sans-serif;font-size:1.25rem;font-weight:800;color:#031273;margin-top:8px;">{ev.title}</h2>
        </div>
        <button class="close-btn" onclick={() => selected=null}><Icon name="x" size={18} /></button>
      </div>
      <div class="modal-body">
        <p style="color:#4a5568;line-height:1.6;margin-bottom:20px;">{ev.description}</p>
        <div class="detail-grid">
          <div class="detail-item"><Icon name="calendar" size={16} color="#4169E1" /><span>{ev.dateLabel}</span></div>
          <div class="detail-item"><Icon name="clock"    size={16} color="#4169E1" /><span>{ev.time}</span></div>
          <div class="detail-item"><Icon name="map-pin"  size={16} color="#4169E1" /><span>{ev.location}</span></div>
          <div class="detail-item"><Icon name="users"    size={16} color="#4169E1" /><span>{ev.attending} attending</span></div>
        </div>
        <button
          class="rsvp-btn big"
          class:rsvpd={isRsvpd}
          onclick={() => { toggleRsvp(ev.id); selected=null; }}
        >
          {isRsvpd ? '✓ Cancel RSVP' : '+ Confirm RSVP'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .page { padding:32px 36px; animation:fadeIn .35s ease; }
  .page-title{ font-family:'Sora',sans-serif;font-size:1.6rem;font-weight:800;color:#031273; }
  .page-sub  { font-size:.875rem;color:#6b7db3;margin-top:4px; }

  .view-toggle { display:flex; background:#fff; border-radius:10px; padding:4px; border:1.5px solid #e0e7f8; }
  .view-toggle button {
    display:flex; align-items:center; gap:7px; padding:7px 16px;
    border:none; border-radius:8px; font-size:.82rem; font-weight:600;
    color:#6b7db3; cursor:pointer; background:transparent; transition:all 150ms;
  }
  .view-toggle button.active { background:#4169E1; color:#fff; }

  /* List */
  .events-list { display:flex; flex-direction:column; gap:16px; }
  .event-card  { display:flex; overflow:hidden; transition:transform 200ms; }
  .event-card:hover { transform:translateY(-2px); }
  .event-color-bar { width:5px; flex-shrink:0; }
  .event-body  { flex:1; padding:20px 24px; }
  .event-head  { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
  .event-attendees { display:flex; align-items:center; gap:5px; font-size:.78rem; color:#6b7db3; }
  .event-title { font-family:'Sora',sans-serif; font-size:1.1rem; font-weight:700; color:#031273; margin-bottom:8px; }
  .event-desc  { font-size:.875rem; color:#4a5568; line-height:1.6; margin-bottom:14px; }
  .event-meta  { display:flex; flex-wrap:wrap; gap:16px; margin-bottom:16px; }
  .event-meta span { display:flex; align-items:center; gap:6px; font-size:.8rem; color:#6b7db3; }
  .event-actions { display:flex; gap:10px; }

  .rsvp-btn {
    display:flex; align-items:center; gap:7px; padding:9px 20px;
    background:#4169E1; color:#fff; border:none; border-radius:10px;
    font-weight:600; font-size:.875rem; cursor:pointer; transition:all 150ms;
    font-family:'Sora',sans-serif;
  }
  .rsvp-btn.rsvpd { background:#10b981; }
  .rsvp-btn.big   { width:100%; justify-content:center; padding:14px; font-size:1rem; margin-top:20px; }
  .rsvp-btn:hover { opacity:.9; }

  /* Calendar */
  .cal-wrap { padding:24px; }
  .cal-nav  { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
  .cal-nav button { background:#f0f4ff; border:none; border-radius:8px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#4169E1; }
  .cal-month { font-family:'Sora',sans-serif; font-weight:700; font-size:1.1rem; color:#031273; }
  .cal-grid  { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; margin-bottom:4px; }
  .cal-grid.header { margin-bottom:8px; }
  .cal-day-hd { text-align:center; font-size:.72rem; font-weight:600; color:#6b7db3; padding:4px 0; }
  .cal-cell {
    min-height:68px; border-radius:10px; padding:8px 6px;
    display:flex; flex-direction:column; align-items:center;
    border:1.5px solid transparent; cursor:default; transition:all 150ms;
  }
  .cal-cell.has-event { border-color:rgba(65,105,225,.25); background:rgba(65,105,225,.04); cursor:pointer; }
  .cal-cell.has-event:hover { background:rgba(65,105,225,.1); }
  .cal-num { font-size:.82rem; color:#031273; font-weight:500; }
  .cal-ev-dot { width:8px; height:8px; border-radius:50%; margin-top:4px; }
  .cal-legend { display:flex; flex-wrap:wrap; gap:12px; margin-top:16px; padding-top:16px; border-top:1px solid #f0f4ff; }
  .legend-item { display:flex; align-items:center; font-size:.75rem; color:#6b7db3; }

  /* Modal */
  .overlay { position:fixed;inset:0;background:rgba(3,18,115,.35);z-index:400;display:flex;align-items:center;justify-content:center;padding:24px; }
  .modal   { width:100%;max-width:540px;overflow:hidden; }
  .modal-header { padding:24px 24px 20px; display:flex; align-items:flex-start; justify-content:space-between; }
  .modal-body   { padding:0 24px 24px; }
  .detail-grid  { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .detail-item  { display:flex; align-items:center; gap:8px; font-size:.875rem; color:#031273; background:#f8faff; padding:10px 14px; border-radius:10px; }
  .close-btn    { background:#f0f4ff; border:none; border-radius:8px; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#031273; flex-shrink:0; }
</style>
