<script>
  import Icon from '../components/Icon.svelte';
  import { campaigns, donationHistory, addDonation } from '../store.js';

  const fmt = (n) => '₱' + n.toLocaleString();

  // Checkout modal state
  let checkoutCampaign = $state(null);
  let step    = $state(1); // 1=amount, 2=payment, 3=success
  let amount  = $state('');
  let method  = $state('gcash'); // gcash | maya | card
  let phone   = $state('');
  let refNum  = $state('');
  let cardNum = $state('');
  let expiry  = $state('');
  let cvv     = $state('');
  let processing = $state(false);

  const presets = [500, 1000, 2500, 5000];

  function openCheckout(c) {
    checkoutCampaign = c; step=1; amount=''; method='gcash';
    phone=''; refNum=''; cardNum=''; expiry=''; cvv='';
  }
  function closeCheckout() { checkoutCampaign=null; step=1; }

  function nextStep() {
    if (step === 1 && !amount) return;
    if (step === 2) {
      processing = true;
      setTimeout(() => {
        processing = false;
        // Add to history
        addDonation({
          id: 'd' + Date.now(),
          campaignId: checkoutCampaign.id,
          campaign: checkoutCampaign.title,
          amount: parseInt(amount.toString().replace(/,/g, '')),
          date: new Date().toLocaleDateString('en-PH', {day:'2-digit',month:'short',year:'numeric'}),
          method: method === 'gcash' ? 'GCash' : method === 'maya' ? 'Maya' : 'Card',
          status: 'Confirmed',
          cert: parseInt(amount) >= 1000,
        });
        step = 3;
      }, 1500);
      return;
    }
    step++;
  }

  let activeTab = $state('campaigns'); // 'campaigns' | 'history' | 'certificates'
</script>

<div class="page fade-in">
  <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;">
    <div>
      <h1 class="page-title">Donations</h1>
      <p class="page-sub">Support active campaigns and track your giving history.</p>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    {#each [['campaigns','Campaigns'],['history','My History'],['certificates','Certificates']] as [id,label]}
      <button class="tab" class:active={activeTab===id} onclick={() => (activeTab=id)}>{label}</button>
    {/each}
  </div>

  <!-- CAMPAIGNS TAB -->
  {#if activeTab === 'campaigns'}
    <div class="campaigns-grid">
      {#each $campaigns as c (c.id)}
        {@const pct = Math.min(100, Math.round((c.raised / c.goal) * 100))}
        <div class="camp-card card">
          <!-- Gradient image area -->
          <div class="camp-img" style="background:linear-gradient(135deg,{c.color}22,{c.color}55);">
            <div class="camp-img-icon" style="background:{c.color}33;">
              <Icon name="gift" size={32} color={c.color} />
            </div>
            {#if c.urgent}<span class="urgent-badge">🔥 Urgent</span>{/if}
          </div>

          <div class="camp-body">
            <span class="badge" style="background:{c.color}15;color:{c.color};margin-bottom:8px;">{c.category}</span>
            <h3 class="camp-title">{c.title}</h3>
            <p class="camp-desc">{c.description}</p>

            <div class="camp-progress">
              <div class="camp-prog-bar">
                <div class="camp-prog-fill" style="width:{pct}%;background:{c.color}"></div>
              </div>
              <div class="camp-prog-meta">
                <span class="raised">{fmt(c.raised)} raised</span>
                <span class="pct">{pct}%</span>
              </div>
              <div class="camp-goal">Goal: {fmt(c.goal)} · {c.donors} donors · Ends {c.deadline}</div>
            </div>

            <button class="btn-primary donate-btn" onclick={() => openCheckout(c)}>
              <Icon name="heart" size={16} /> Donate Now
            </button>
          </div>
        </div>
      {/each}
    </div>

  <!-- HISTORY TAB -->
  {:else if activeTab === 'history'}
    <div class="card hist-table">
      <div class="table-head">
        <div>Campaign</div>
        <div>Amount</div>
        <div>Date</div>
        <div>Method</div>
        <div>Status</div>
        <div>Action</div>
      </div>
      {#each $donationHistory as d (d.id)}
        <div class="table-row">
          <div class="camp-cell">{d.campaign}</div>
          <div class="amount-cell">{fmt(d.amount)}</div>
          <div class="date-cell">{d.date}</div>
          <div><span class="badge badge-blue">{d.method}</span></div>
          <div><span class="badge badge-green">{d.status}</span></div>
          <div>
            {#if d.cert}
              <button class="btn-secondary" style="font-size:.75rem;padding:5px 12px;">
                <Icon name="download" size={13} /> Receipt
              </button>
            {:else}
              <span style="font-size:.75rem;color:#6b7db3;">—</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>

  <!-- CERTIFICATES TAB -->
  {:else}
    <div class="certs-grid">
      {#each $donationHistory.filter(d=>d.cert) as d (d.id)}
        <div class="cert-card card">
          <div class="cert-header">
            <img src="/icons/addu-seal.png" alt="AdDU Seal" style="width:44px;opacity:.9;" />
            <div>
              <div class="cert-label">Certificate of Donation</div>
              <div class="cert-date">Issued {d.date}</div>
            </div>
          </div>
          <div class="cert-campaign">{d.campaign}</div>
          <div class="cert-amount">{fmt(d.amount)}</div>
          <button class="btn-primary" style="width:100%;justify-content:center;margin-top:16px;">
            <Icon name="download" size={16} /> Download PDF
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Checkout Modal -->
{#if checkoutCampaign}
  {@const c = checkoutCampaign}
  <div class="overlay" onclick={closeCheckout} role="presentation">
    <div class="modal card" onclick={(e) => e.stopPropagation()}>

      <!-- Step indicator -->
      <div class="step-bar">
        {#each ['Amount','Payment','Done'] as s, i}
          <div class="step-item" class:done={step > i+1} class:active={step === i+1}>
            <div class="step-num">{step > i+1 ? '✓' : i+1}</div>
            <span>{s}</span>
          </div>
          {#if i < 2}<div class="step-line" class:done={step > i+1}></div>{/if}
        {/each}
      </div>

      <div class="modal-inner">

        <!-- STEP 1 -->
        {#if step === 1}
          <h3 class="modal-title">Choose Amount</h3>
          <p class="modal-sub">Donating to: <strong>{c.title}</strong></p>
          <div class="presets">
            {#each presets as p}
              <button class="preset-btn" class:selected={amount==p} onclick={() => amount=p}>₱{p.toLocaleString()}</button>
            {/each}
          </div>
          <input
            type="number" placeholder="Or enter custom amount (₱)"
            bind:value={amount}
            class="amount-input"
          />
          <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;margin-top:16px;"
            onclick={nextStep} disabled={!amount}>
            Continue →
          </button>

        <!-- STEP 2 -->
        {:else if step === 2}
          <h3 class="modal-title">Payment Method</h3>
          <p class="modal-sub">Amount: <strong>₱{parseInt(amount||0).toLocaleString()}</strong></p>

          <div class="method-tabs">
            {#each [['gcash','GCash','smartphone'],['maya','Maya','smartphone'],['card','Credit/Debit','credit-card']] as [id,label,icon]}
              <button class="method-tab" class:active={method===id} onclick={() => method=id}>
                <Icon name={icon} size={18} color={method===id?'#fff':'#4169E1'} />
                {label}
              </button>
            {/each}
          </div>

          {#if method === 'gcash' || method === 'maya'}
            <div class="pay-info">
              <div class="info-box">📲 Send to <strong>0917-888-2015</strong> (AdDU Alumni Foundation)</div>
              <div class="field"><label>Your {method==='gcash'?'GCash':'Maya'} Number</label>
                <input type="tel" placeholder="09XX-XXX-XXXX" bind:value={phone} /></div>
              <div class="field"><label>Reference / Confirmation Number</label>
                <input type="text" placeholder="From your transaction receipt" bind:value={refNum} /></div>
            </div>
          {:else}
            <div class="pay-info">
              <div class="field"><label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" bind:value={cardNum} maxlength="19" /></div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div class="field"><label>Expiry (MM/YY)</label>
                  <input type="text" placeholder="MM/YY" bind:value={expiry} maxlength="5" /></div>
                <div class="field"><label>CVV</label>
                  <input type="text" placeholder="123" bind:value={cvv} maxlength="4" /></div>
              </div>
            </div>
          {/if}

          <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;margin-top:16px;"
            onclick={nextStep} disabled={processing}>
            {#if processing}<span class="spinner-dark"></span> Processing…{:else}Confirm Donation →{/if}
          </button>

        <!-- STEP 3 -->
        {:else}
          <div class="success-wrap">
            <div class="success-icon"><Icon name="check-circle" size={48} color="#10b981" /></div>
            <h3 class="modal-title">Thank You! 🎉</h3>
            <p class="modal-sub">Your donation of <strong>₱{parseInt(amount||0).toLocaleString()}</strong> to <strong>{c.title}</strong> was received.</p>
            <div style="display:flex;gap:10px;margin-top:20px;width:100%;">
              <button class="btn-secondary" style="flex:1;justify-content:center;padding:11px;">
                <Icon name="download" size={16} /> Receipt
              </button>
              {#if parseInt(amount||0) >= 1000}
                <button class="btn-primary" style="flex:1;justify-content:center;padding:11px;">
                  <Icon name="award" size={16} /> Certificate
                </button>
              {/if}
            </div>
            <button class="text-close" onclick={closeCheckout}>Close</button>
          </div>
        {/if}

      </div>
    </div>
  </div>
{/if}

<style>
  .page { padding:32px 36px; animation:fadeIn .35s ease; }
  .page-title { font-family:'Sora',sans-serif;font-size:1.6rem;font-weight:800;color:#031273; }
  .page-sub   { font-size:.875rem;color:#6b7db3;margin-top:4px; }

  /* Tabs */
  .tabs { display:flex; gap:4px; background:#fff; border-radius:12px; padding:4px; margin-bottom:24px; width:fit-content; border:1.5px solid #e0e7f8; }
  .tab  { padding:8px 22px; border:none; border-radius:9px; font-size:.875rem; font-weight:600; color:#6b7db3; background:transparent; cursor:pointer; transition:all 150ms; }
  .tab.active { background:#4169E1; color:#fff; }

  /* Campaign grid */
  .campaigns-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .camp-card { overflow:hidden; transition:transform 200ms; }
  .camp-card:hover { transform:translateY(-3px); }
  .camp-img  { height:130px; display:flex; align-items:center; justify-content:center; position:relative; }
  .camp-img-icon { width:64px;height:64px;border-radius:18px;display:flex;align-items:center;justify-content:center; }
  .urgent-badge  { position:absolute;top:12px;right:12px;background:rgba(239,68,68,.9);color:#fff;font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:999px; }
  .camp-body  { padding:18px; }
  .camp-title { font-family:'Sora',sans-serif;font-size:1rem;font-weight:700;color:#031273;margin-bottom:6px;line-height:1.3; }
  .camp-desc  { font-size:.8rem;color:#6b7db3;line-height:1.5;margin-bottom:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
  .camp-progress { margin-bottom:14px; }
  .camp-prog-bar { height:7px;background:#e8edf8;border-radius:999px;overflow:hidden;margin-bottom:6px; }
  .camp-prog-fill{ height:100%;border-radius:999px;transition:width .6s ease; }
  .camp-prog-meta{ display:flex;justify-content:space-between;margin-bottom:3px; }
  .raised { font-size:.8rem;font-weight:700;color:#031273; }
  .pct    { font-size:.8rem;font-weight:700;color:#4169E1; }
  .camp-goal { font-size:.72rem;color:#6b7db3; }
  .donate-btn { width:100%;justify-content:center;padding:11px; }

  /* History table */
  .hist-table { overflow:hidden; }
  .table-head {
    display:grid;grid-template-columns:3fr 1fr 1.2fr 1fr 1fr 1fr;
    padding:12px 20px;background:#f8faff;
    font-size:.75rem;font-weight:700;color:#6b7db3;text-transform:uppercase;letter-spacing:.05em;
    border-bottom:1px solid #e8edf8;
  }
  .table-row {
    display:grid;grid-template-columns:3fr 1fr 1.2fr 1fr 1fr 1fr;
    padding:14px 20px;border-bottom:1px solid #f0f4ff;align-items:center;
    font-size:.875rem;
  }
  .table-row:last-child { border-bottom:none; }
  .camp-cell   { color:#031273;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
  .amount-cell { font-weight:700;color:#4169E1; }
  .date-cell   { color:#6b7db3;font-size:.82rem; }

  /* Certificates */
  .certs-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
  .cert-card  { padding:24px; }
  .cert-header{ display:flex;align-items:center;gap:14px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f0f4ff; }
  .cert-label { font-family:'Sora',sans-serif;font-size:.85rem;font-weight:700;color:#031273; }
  .cert-date  { font-size:.75rem;color:#6b7db3;margin-top:2px; }
  .cert-campaign{ font-size:.875rem;color:#4a5568;margin-bottom:8px;line-height:1.4; }
  .cert-amount  { font-family:'Sora',sans-serif;font-size:1.5rem;font-weight:800;color:#4169E1; }

  /* Checkout Modal */
  .overlay { position:fixed;inset:0;background:rgba(3,18,115,.4);z-index:500;display:flex;align-items:center;justify-content:center;padding:24px; }
  .modal   { width:100%;max-width:480px;overflow:hidden; }

  .step-bar { display:flex;align-items:center;padding:20px 24px;background:#f8faff;border-bottom:1px solid #e8edf8; }
  .step-item{ display:flex;align-items:center;gap:8px; }
  .step-num { width:26px;height:26px;border-radius:50%;background:#e0e7f8;color:#6b7db3;font-size:.78rem;font-weight:700;display:flex;align-items:center;justify-content:center; }
  .step-item.active .step-num { background:#4169E1;color:#fff; }
  .step-item.done   .step-num { background:#10b981;color:#fff; }
  .step-item span { font-size:.78rem;font-weight:600;color:#6b7db3; }
  .step-item.active span,.step-item.done span { color:#031273; }
  .step-line { flex:1;height:2px;background:#e0e7f8;margin:0 8px; }
  .step-line.done { background:#10b981; }

  .modal-inner { padding:24px; }
  .modal-title { font-family:'Sora',sans-serif;font-size:1.2rem;font-weight:800;color:#031273;margin-bottom:4px; }
  .modal-sub   { font-size:.875rem;color:#6b7db3;margin-bottom:20px; }

  .presets { display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px; }
  .preset-btn { padding:12px;border:1.5px solid #e0e7f8;border-radius:10px;background:#f8faff;font-size:.875rem;font-weight:600;color:#031273;cursor:pointer;transition:all 150ms; }
  .preset-btn.selected { border-color:#4169E1;background:rgba(65,105,225,.08);color:#4169E1; }
  .preset-btn:hover    { border-color:#4169E1; }
  .amount-input { width:100%;padding:12px 14px;border:1.5px solid #e0e7f8;border-radius:10px;font-size:.95rem;color:#031273;background:#f8faff; }
  .amount-input:focus  { border-color:#4169E1; }

  .method-tabs { display:flex;gap:8px;margin-bottom:16px; }
  .method-tab  { flex:1;display:flex;align-items:center;justify-content:center;gap:7px;padding:10px;border:1.5px solid #e0e7f8;border-radius:10px;background:#f8faff;font-size:.82rem;font-weight:600;color:#4169E1;cursor:pointer;transition:all 150ms; }
  .method-tab.active { background:#4169E1;color:#fff;border-color:#4169E1; }

  .pay-info { display:flex;flex-direction:column;gap:12px; }
  .info-box  { background:rgba(65,105,225,.07);border-radius:10px;padding:12px;font-size:.82rem;color:#031273; }
  .field     { display:flex;flex-direction:column;gap:5px; }
  .field label { font-size:.78rem;font-weight:600;color:#031273; }
  .field input { padding:10px 12px;border:1.5px solid #e0e7f8;border-radius:10px;font-size:.875rem;color:#031273;background:#f8faff; }
  .field input:focus { border-color:#4169E1; }

  .success-wrap { display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px; }
  .success-icon { width:80px;height:80px;background:rgba(16,185,129,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:8px; }
  .text-close   { background:none;border:none;color:#6b7db3;font-size:.875rem;cursor:pointer;margin-top:12px; }

  .spinner-dark { width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0;display:inline-block; }
  @keyframes spin { to { transform:rotate(360deg); } }
</style>
