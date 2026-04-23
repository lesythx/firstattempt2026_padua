<script>
  import Icon from '../components/Icon.svelte';
  import { campaigns } from '../store.js';

  const fmt = (n) => '₱' + n.toLocaleString();

  // Create modal
  let showCreate = $state(false);
  let createStep = $state(1); // 1=Details, 2=Options, 3=Review
  let form = $state({
    title:'', description:'', category:'Scholarship', deadline:'',
    goal:'', minDonation:'500', presets:['500','1000','2500','5000'],
  });

  function publish() {
    if (!form.title || !form.goal) return;
    campaigns.update(cs => [{
      id: 'c' + Date.now(),
      title: form.title,
      description: form.description,
      category: form.category,
      goal: parseInt(form.goal),
      raised: 0,
      donors: 0,
      deadline: form.deadline,
      urgent: false,
      color: '#4169E1',
      image: 'new',
      featured: false,
    }, ...cs]);
    showCreate = false;
    createStep = 1;
    form = { title:'',description:'',category:'Scholarship',deadline:'',goal:'',minDonation:'500',presets:['500','1000','2500','5000'] };
  }

  let deleteId = $state(null);
</script>

<div class="page fade-in">
  <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;">
    <div>
      <h1 class="page-title">Campaigns</h1>
      <p class="page-sub">Create and manage donation campaigns.</p>
    </div>
    <button class="btn-primary" onclick={() => { showCreate=true; createStep=1; }}>
      <Icon name="plus" size={16} /> Create Campaign
    </button>
  </div>

  <!-- Campaign Cards -->
  <div class="camp-grid">
    {#each $campaigns as c (c.id)}
      {@const pct = Math.min(100,Math.round((c.raised/c.goal)*100))}
      <div class="camp-card card">
        <div class="camp-color-bar" style="background:{c.color}"></div>
        <div class="camp-body">
          <div class="camp-head">
            <span class="badge" style="background:{c.color}15;color:{c.color};">{c.category}</span>
            <div class="camp-actions">
              {#if c.urgent}<span class="badge badge-red">Urgent</span>{/if}
              <button class="icon-btn" title="Edit"><Icon name="edit" size={15} color="#4169E1" /></button>
              <button class="icon-btn del" title="Delete" onclick={() => deleteId=c.id}><Icon name="trash" size={15} color="#ef4444" /></button>
            </div>
          </div>
          <h3 class="camp-title">{c.title}</h3>
          <p class="camp-desc">{c.description}</p>

          <div class="camp-stats-row">
            <div class="cstat"><div class="cstat-val" style="color:{c.color}">{pct}%</div><div class="cstat-lbl">Funded</div></div>
            <div class="cstat"><div class="cstat-val">{fmt(c.raised)}</div><div class="cstat-lbl">Raised</div></div>
            <div class="cstat"><div class="cstat-val">{c.donors}</div><div class="cstat-lbl">Donors</div></div>
          </div>

          <div class="prog-bar" style="margin-bottom:8px;">
            <div class="prog-fill" style="width:{pct}%;background:{c.color}"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.75rem;color:#6b7db3;">
            <span>Goal: {fmt(c.goal)}</span>
            <span>Ends {c.deadline}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- Delete confirm -->
{#if deleteId}
  <div class="overlay" onclick={() => deleteId=null} role="presentation">
    <div class="confirm-modal card" onclick={(e)=>e.stopPropagation()}>
      <div class="conf-icon"><Icon name="trash" size={28} color="#ef4444" /></div>
      <h3>Delete Campaign?</h3>
      <p>This action cannot be undone. All associated data will be removed.</p>
      <div style="display:flex;gap:10px;margin-top:20px;">
        <button class="btn-secondary" style="flex:1;justify-content:center;" onclick={() => deleteId=null}>Cancel</button>
        <button class="btn-danger" onclick={() => { campaigns.update(cs=>cs.filter(c=>c.id!==deleteId)); deleteId=null; }}>Delete</button>
      </div>
    </div>
  </div>
{/if}

<!-- Create Modal -->
{#if showCreate}
  <div class="overlay" onclick={() => showCreate=false} role="presentation">
    <div class="create-modal card" onclick={(e)=>e.stopPropagation()}>
      <!-- Step bar -->
      <div class="step-bar">
        <div class="modal-title-row">
          <h3>New Campaign</h3>
          <button class="close-btn" onclick={() => showCreate=false}><Icon name="x" size={18} /></button>
        </div>
        <div class="steps">
          {#each ['Campaign Details','Donation Options','Review & Publish'] as s, i}
            <div class="step" class:active={createStep===i+1} class:done={createStep>i+1}>
              <div class="step-num">{createStep>i+1?'✓':i+1}</div>
              <span>{s}</span>
            </div>
            {#if i<2}<div class="step-connector" class:done={createStep>i+1}></div>{/if}
          {/each}
        </div>
      </div>

      <div class="create-body">
        {#if createStep === 1}
          <div class="form-grid">
            <div class="field full"><label>Campaign Title *</label>
              <input placeholder="e.g. AdDU Excellence Scholarship Fund" bind:value={form.title} /></div>
            <div class="field full"><label>Description *</label>
              <textarea placeholder="Describe the campaign and its impact…" bind:value={form.description} rows="3"></textarea></div>
            <div class="field"><label>Category</label>
              <select bind:value={form.category}>
                {#each ['Scholarship','Infrastructure','Relief','Environment','Sports','Research'] as cat}
                  <option>{cat}</option>
                {/each}
              </select>
            </div>
            <div class="field"><label>Goal Amount (₱) *</label>
              <input type="number" placeholder="500000" bind:value={form.goal} /></div>
            <div class="field"><label>Deadline</label>
              <input type="date" bind:value={form.deadline} /></div>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" onclick={() => showCreate=false}>Cancel</button>
            <button class="btn-primary" onclick={() => createStep=2} disabled={!form.title||!form.goal}>Next: Donation Options →</button>
          </div>

        {:else if createStep === 2}
          <div class="form-grid">
            <div class="field"><label>Minimum Donation (₱)</label>
              <input type="number" bind:value={form.minDonation} /></div>
            <div class="field full"><label>Suggested Amount Presets</label>
              <div class="preset-row">
                {#each form.presets as _, i}
                  <input type="number" bind:value={form.presets[i]} class="preset-input" />
                {/each}
              </div>
            </div>
            <div class="field full">
              <div class="toggle-row">
                <div><div style="font-size:.875rem;font-weight:600;color:#031273;">Enable Matching Donations</div>
                  <div style="font-size:.8rem;color:#6b7db3;">Allow a sponsor to match donations up to a set amount</div></div>
                <div class="toggle"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" onclick={() => createStep=1}>← Back</button>
            <button class="btn-primary" onclick={() => createStep=3}>Next: Review →</button>
          </div>

        {:else}
          <div class="review-box">
            <h4 style="font-family:'Sora',sans-serif;font-size:1rem;font-weight:700;color:#031273;margin-bottom:16px;">Review Campaign</h4>
            {#each [
              ['Title', form.title||'—'],
              ['Category', form.category],
              ['Goal', form.goal ? '₱'+parseInt(form.goal).toLocaleString() : '—'],
              ['Deadline', form.deadline||'Not set'],
              ['Min. Donation', '₱'+parseInt(form.minDonation||0).toLocaleString()],
            ] as [k,v]}
              <div class="review-row"><span class="rk">{k}</span><span class="rv">{v}</span></div>
            {/each}
            {#if form.description}<div class="review-row" style="flex-direction:column;gap:4px;"><span class="rk">Description</span><span class="rv" style="font-size:.82rem;">{form.description}</span></div>{/if}
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" onclick={() => createStep=2}>← Back</button>
            <button class="btn-primary" onclick={publish} style="background:#10b981;">
              <Icon name="check" size={16} /> Publish Campaign
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .page { padding:32px 36px; animation:fadeIn .35s ease; }
  .page-title{ font-family:'Sora',sans-serif;font-size:1.6rem;font-weight:800;color:#031273; }
  .page-sub  { font-size:.875rem;color:#6b7db3;margin-top:4px; }

  .camp-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
  .camp-card { display:flex;overflow:hidden;transition:transform 200ms; }
  .camp-card:hover { transform:translateY(-2px); }
  .camp-color-bar { width:5px;flex-shrink:0; }
  .camp-body  { flex:1;padding:20px; }
  .camp-head  { display:flex;align-items:center;justify-content:space-between;margin-bottom:10px; }
  .camp-actions{ display:flex;align-items:center;gap:6px; }
  .icon-btn   { background:none;border:none;cursor:pointer;padding:5px;border-radius:6px;transition:background 150ms; }
  .icon-btn:hover     { background:#f0f4ff; }
  .icon-btn.del:hover { background:rgba(239,68,68,.1); }
  .camp-title { font-family:'Sora',sans-serif;font-size:.95rem;font-weight:700;color:#031273;margin-bottom:6px; }
  .camp-desc  { font-size:.78rem;color:#6b7db3;line-height:1.5;margin-bottom:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
  .camp-stats-row { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px; }
  .cstat      { text-align:center;background:#f8faff;border-radius:8px;padding:8px; }
  .cstat-val  { font-family:'Sora',sans-serif;font-size:.95rem;font-weight:800;color:#031273; }
  .cstat-lbl  { font-size:.68rem;color:#6b7db3;margin-top:2px; }
  .prog-bar   { height:6px;background:#e8edf8;border-radius:999px;overflow:hidden; }
  .prog-fill  { height:100%;border-radius:999px;transition:width .6s ease; }

  /* Modals */
  .overlay { position:fixed;inset:0;background:rgba(3,18,115,.4);z-index:500;display:flex;align-items:center;justify-content:center;padding:24px; }

  .confirm-modal { width:100%;max-width:380px;padding:32px;text-align:center; }
  .conf-icon { width:60px;height:60px;background:rgba(239,68,68,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px; }
  .confirm-modal h3 { font-family:'Sora',sans-serif;font-size:1.2rem;font-weight:700;color:#031273;margin-bottom:8px; }
  .confirm-modal p  { font-size:.875rem;color:#6b7db3; }
  .btn-danger { flex:1;padding:10px 20px;background:#ef4444;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-family:'Sora',sans-serif;transition:background 150ms; }
  .btn-danger:hover { background:#dc2626; }

  .create-modal { width:100%;max-width:580px;overflow:hidden; }
  .step-bar { background:#f8faff;padding:20px 24px;border-bottom:1px solid #e8edf8; }
  .modal-title-row { display:flex;align-items:center;justify-content:space-between;margin-bottom:16px; }
  .modal-title-row h3 { font-family:'Sora',sans-serif;font-size:1.1rem;font-weight:800;color:#031273; }
  .close-btn { background:#e8edf8;border:none;border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#031273; }

  .steps { display:flex;align-items:center; }
  .step  { display:flex;align-items:center;gap:8px; }
  .step-num { width:26px;height:26px;border-radius:50%;background:#e0e7f8;color:#6b7db3;font-size:.75rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
  .step.active .step-num { background:#4169E1;color:#fff; }
  .step.done   .step-num { background:#10b981;color:#fff; }
  .step span { font-size:.78rem;font-weight:600;color:#6b7db3;white-space:nowrap; }
  .step.active span,.step.done span { color:#031273; }
  .step-connector { flex:1;height:2px;background:#e0e7f8;margin:0 6px; }
  .step-connector.done { background:#10b981; }

  .create-body { padding:24px; }
  .form-grid   { display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:24px; }
  .field.full  { grid-column:1/-1; }
  .field label { display:block;font-size:.78rem;font-weight:600;color:#031273;margin-bottom:5px; }
  .field input,.field select,.field textarea {
    width:100%;padding:10px 12px;border:1.5px solid #e0e7f8;border-radius:10px;
    font-size:.875rem;color:#031273;background:#f8faff;resize:vertical;
  }
  .field input:focus,.field select:focus,.field textarea:focus { border-color:#4169E1; }
  .preset-row { display:grid;grid-template-columns:repeat(4,1fr);gap:8px; }
  .preset-input { text-align:center; }
  .toggle-row { display:flex;align-items:center;justify-content:space-between;background:#f8faff;border-radius:10px;padding:14px; }
  .toggle { width:42px;height:24px;background:#e0e7f8;border-radius:999px; }

  .review-box { background:#f8faff;border-radius:12px;padding:20px;margin-bottom:24px;display:flex;flex-direction:column;gap:10px; }
  .review-row { display:flex;align-items:flex-start;justify-content:space-between;gap:12px; }
  .rk { font-size:.78rem;font-weight:600;color:#6b7db3;min-width:100px; }
  .rv { font-size:.875rem;color:#031273;font-weight:500;text-align:right;flex:1; }

  .modal-footer { display:flex;justify-content:flex-end;gap:10px;border-top:1px solid #e8edf8;padding-top:20px;margin-top:4px; }
</style>
