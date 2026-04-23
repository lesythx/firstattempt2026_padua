<script>
  import Icon from '../components/Icon.svelte';
  import { auth } from '../store.js';
  import { donationHistory } from '../store.js';
  import { currentUser } from '../data.js';

  let editing = $state(false);
  let name    = $state(currentUser.name);
  let phone   = $state(currentUser.phone);
  let address = $state(currentUser.address);
  let job     = $state(currentUser.job);

  const fmt = (n) => '₱' + n.toLocaleString();
  const totalDonated = $derived($donationHistory.reduce((s,d) => s + d.amount, 0));
</script>

<div class="page fade-in">
  <!-- Profile Header -->
  <div class="profile-header card">
    <div class="profile-bg"></div>
    <div class="profile-main">
      <div class="big-avatar">{currentUser.initials}</div>
      <div class="profile-info">
        <h1 class="prof-name">{currentUser.name}</h1>
        <p class="prof-detail">{currentUser.degree} · {currentUser.batch}</p>
        <p class="prof-job"><Icon name="settings" size={13} color="#6b7db3" /> {currentUser.job}</p>
        <div class="prof-badges">
          <span class="badge badge-blue">Alumni</span>
          <span class="badge badge-gold">Silver Donor</span>
          <span class="badge" style="background:rgba(76,201,240,.12);color:#0504AA;">Class of 2015</span>
        </div>
      </div>
      <button class="btn-secondary edit-btn" onclick={() => (editing = !editing)}>
        <Icon name={editing ? 'check' : 'edit'} size={15} />
        {editing ? 'Save Changes' : 'Edit Profile'}
      </button>
    </div>
  </div>

  <div class="profile-grid">
    <!-- Personal Info -->
    <div class="card info-card">
      <h3 class="section-title"><Icon name="user" size={16} color="#4169E1" /> Personal Information</h3>
      <div class="info-grid">
        {#each [
          { label:'Full Name',    field:'name',    value:name,    setter:(v)=>(name=v) },
          { label:'Email',        field:'email',   value:currentUser.email, setter:null },
          { label:'Phone',        field:'phone',   value:phone,   setter:(v)=>(phone=v) },
          { label:'Address',      field:'address', value:address, setter:(v)=>(address=v) },
          { label:'Current Job',  field:'job',     value:job,     setter:(v)=>(job=v) },
        ] as f}
          <div class="info-item">
            <label>{f.label}</label>
            {#if editing && f.setter}
              <input value={f.value} oninput={(e)=>f.setter(e.target.value)} />
            {:else}
              <span>{f.value}</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Academic Records -->
    <div class="card info-card">
      <h3 class="section-title"><Icon name="award" size={16} color="#4169E1" /> Academic Records</h3>
      <div class="info-grid">
        <div class="info-item">
          <label>Student ID</label>
          <span>{currentUser.studentId}</span>
        </div>
        <div class="info-item">
          <label>Degree Program</label>
          <span>{currentUser.degree}</span>
        </div>
        <div class="info-item">
          <label>Graduation Year</label>
          <span>2015</span>
        </div>
        <div class="info-item">
          <label>Honors</label>
          <span>Cum Laude · Dean's Lister</span>
        </div>
      </div>
      <div class="read-only-note">
        <Icon name="info" size={13} color="#4169E1" />
        Records are synced from the university registrar.
      </div>
    </div>

    <!-- Donation Summary -->
    <div class="card info-card stat-summary">
      <h3 class="section-title"><Icon name="heart" size={16} color="#4169E1" /> Giving Summary</h3>
      <div class="summary-stats">
        <div class="sum-stat">
          <div class="sum-val" style="color:#4169E1">{fmt(totalDonated)}</div>
          <div class="sum-lbl">Total Donated</div>
        </div>
        <div class="sum-stat">
          <div class="sum-val" style="color:#2337C6">{$donationHistory.length}</div>
          <div class="sum-lbl">Donations Made</div>
        </div>
        <div class="sum-stat">
          <div class="sum-val" style="color:#10b981">{$donationHistory.filter(d=>d.cert).length}</div>
          <div class="sum-lbl">Certificates</div>
        </div>
        <div class="sum-stat">
          <div class="sum-val" style="color:#f59e0b">4</div>
          <div class="sum-lbl">Campaigns</div>
        </div>
      </div>
      <div class="last-donation">
        Last donation: <strong>{$donationHistory[0]?.date ?? '—'}</strong>
        · <strong>{$donationHistory[0]?.campaign ?? ''}</strong>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card info-card">
      <h3 class="section-title"><Icon name="list" size={16} color="#4169E1" /> Recent Donations</h3>
      {#each $donationHistory.slice(0,4) as d (d.id)}
        <div class="activity-row">
          <div class="act-dot" style="background:{d.amount>=5000?'#4169E1':d.amount>=2500?'#2337C6':'#6b7db3'}"></div>
          <div class="act-info">
            <div class="act-camp">{d.campaign}</div>
            <div class="act-meta">{d.date} · {d.method}</div>
          </div>
          <div class="act-amount">+{fmt(d.amount)}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .page { padding:32px 36px; animation:fadeIn .35s ease; }

  .profile-header { overflow:hidden; margin-bottom:24px; position:relative; }
  .profile-bg { height:100px; background:linear-gradient(135deg,#031273,#2337C6,#4169E1); }
  .profile-main { display:flex; align-items:flex-end; gap:20px; padding:0 28px 24px; margin-top:-40px; }
  .big-avatar {
    width:80px;height:80px;border-radius:50%;background:#2337C6;
    border:4px solid #fff; box-shadow:0 4px 16px rgba(3,18,115,.2);
    display:flex;align-items:center;justify-content:center;
    font-family:'Sora',sans-serif;font-size:1.5rem;font-weight:800;color:#fff;flex-shrink:0;
  }
  .profile-info { flex:1; padding-top:44px; }
  .prof-name    { font-family:'Sora',sans-serif;font-size:1.375rem;font-weight:800;color:#031273; }
  .prof-detail  { font-size:.875rem;color:#6b7db3;margin-top:3px; }
  .prof-job     { display:flex;align-items:center;gap:5px;font-size:.82rem;color:#6b7db3;margin-top:3px; }
  .prof-badges  { display:flex;gap:6px;margin-top:8px;flex-wrap:wrap; }
  .edit-btn     { margin-top:52px;align-self:flex-start;flex-shrink:0; }

  .profile-grid { display:grid;grid-template-columns:1fr 1fr;gap:20px; }

  .info-card { padding:24px; }
  .section-title { display:flex;align-items:center;gap:8px;font-family:'Sora',sans-serif;font-size:.95rem;font-weight:700;color:#031273;margin-bottom:18px; }
  .info-grid { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
  .info-item label { display:block;font-size:.72rem;font-weight:600;color:#6b7db3;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px; }
  .info-item span  { font-size:.875rem;color:#031273;font-weight:500; }
  .info-item input { width:100%;padding:8px 10px;border:1.5px solid #e0e7f8;border-radius:8px;font-size:.875rem;color:#031273;background:#f8faff; }
  .info-item input:focus { border-color:#4169E1; }

  .read-only-note { display:flex;align-items:center;gap:6px;margin-top:16px;font-size:.75rem;color:#4169E1;background:rgba(65,105,225,.06);padding:8px 12px;border-radius:8px; }

  .summary-stats { display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px; }
  .sum-stat      { text-align:center; }
  .sum-val       { font-family:'Sora',sans-serif;font-size:1.4rem;font-weight:800; }
  .sum-lbl       { font-size:.72rem;color:#6b7db3;margin-top:2px; }
  .last-donation { font-size:.8rem;color:#6b7db3;border-top:1px solid #f0f4ff;padding-top:14px; }

  .activity-row { display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f0f4ff; }
  .activity-row:last-child { border-bottom:none; }
  .act-dot  { width:8px;height:8px;border-radius:50%;flex-shrink:0; }
  .act-info { flex:1;min-width:0; }
  .act-camp { font-size:.82rem;font-weight:600;color:#031273;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
  .act-meta { font-size:.72rem;color:#6b7db3; }
  .act-amount { font-size:.875rem;font-weight:700;color:#4169E1;white-space:nowrap; }
</style>
