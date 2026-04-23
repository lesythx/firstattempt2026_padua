<script>
  import Icon from '../components/Icon.svelte';
  import { login, go } from '../store.js';
  import { currentUser, adminUser } from '../data.js';
</script>

<div class="root">

  <!-- ═══ LEFT — Branding panel (identical to Login) ═══ -->
  <div class="left">

    <div class="glow"></div>

    <div class="knight-frame">
      <img src="/icons/ateneo-knight.png" alt="Ateneo Knight" class="knight-img" />
    </div>

    <div class="brand-strip">
      <img src="/icons/addu-seal.png"     alt="AdDU Seal"                  class="brand-seal" />
      <img src="/icons/addu-wordmark.png" alt="Ateneo de Davao University" class="brand-wordmark" />
      <span class="brand-tagline">Fortes in Fide</span>
    </div>

  </div>

  <!-- ═══ RIGHT — Role selection ═══ -->
  <div class="right">

    <div class="glow-tr"></div>
    <div class="glow-bl"></div>

    <div class="content-wrap">

      <div class="heading-block">
        <h1 class="title">Choose Your Role</h1>
        <p class="subtitle">How would you like to access the Donation Hub today?</p>
      </div>

      <div class="cards">

        <!-- Alumni -->
        <button class="role-card" onclick={() => login('alumni', currentUser)}>
          <div class="card-top">
            <div class="role-icon alumni-icon">
              <Icon name="user" size={26} color="#4169E1" />
            </div>
            <span class="role-badge alumni-badge">Alumni</span>
          </div>
          <div class="card-body">
            <h2 class="role-title">Alumni Member</h2>
            <p class="role-desc">
              Donate to campaigns, RSVP to events, track your giving history, and download tax certificates.
            </p>
          </div>
          <div class="card-cta alumni-cta">
            <span>Enter as Alumni</span>
            <Icon name="chevron-right" size={15} color="#4169E1" />
          </div>
        </button>

        <!-- Admin -->
        <button class="role-card admin-card" onclick={() => login('admin', adminUser)}>
          <div class="card-top">
            <div class="role-icon admin-icon">
              <Icon name="settings" size={26} color="#fff" />
            </div>
            <span class="role-badge admin-badge">Admin</span>
          </div>
          <div class="card-body">
            <h2 class="role-title">Administrator</h2>
            <p class="role-desc">
              Manage campaigns, track all donations, view the leaderboard, and oversee alumni engagement.
            </p>
          </div>
          <div class="card-cta admin-cta">
            <span>Enter as Admin</span>
            <Icon name="chevron-right" size={15} color="rgba(255,255,255,.65)" />
          </div>
        </button>

      </div>

      <button class="back-btn" onclick={() => go('login')}>
        <Icon name="chevron-left" size={14} color="rgba(255,255,255,.38)" />
        Back to Login
      </button>

    </div>
  </div>
</div>

<style>
  /* ── Root: locked full viewport ── */
  .root {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #0b1040;
  }

  /* ════════════════════════════════════════
     LEFT — identical to Login
  ════════════════════════════════════════ */
  .left {
    width: 46%;
    height: 100%;
    background: linear-gradient(175deg, #07102e 0%, #0c1a5c 55%, #080f38 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .glow {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(65,105,225,0.16) 0%, transparent 68%);
    pointer-events: none;
  }

  .knight-frame {
    width: 72%;
    max-width: 360px;
    aspect-ratio: 1;
    background: linear-gradient(145deg, #0c1a5a 0%, #091445 50%, #07103a 100%);
    border: 1.5px solid rgba(65,105,225,0.22);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    z-index: 1;
    box-shadow: 0 28px 72px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05);
    flex-shrink: 0;
  }

  .knight-img {
    width: 92%;
    height: 92%;
    object-fit: contain;
    mix-blend-mode: screen;
    filter: drop-shadow(0 0 28px rgba(76,201,240,0.18));
  }

  .brand-strip {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 28px 24px 0;
    position: relative;
    z-index: 1;
  }

  .brand-seal     { width:50px; height:50px; object-fit:contain; mix-blend-mode:screen; opacity:0.9; }
  .brand-wordmark { width:220px; object-fit:contain; mix-blend-mode:screen; opacity:0.87; }
  .brand-tagline  {
    font-family: 'Sora', sans-serif;
    font-style: italic;
    font-size: 0.8rem;
    color: #4CC9F0;
    letter-spacing: 0.12em;
    opacity: 0.82;
  }

  /* ════════════════════════════════════════
     RIGHT
  ════════════════════════════════════════ */
  .right {
    flex: 1;
    height: 100%;
    background: linear-gradient(148deg, #0e175a 0%, #101f72 45%, #0d1a7a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    position: relative;
    padding: 40px 48px;
  }

  .glow-tr {
    position: absolute;
    top: -80px;
    right: -80px;
    width: 340px;
    height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(76,201,240,0.07) 0%, transparent 65%);
    pointer-events: none;
  }

  .glow-bl {
    position: absolute;
    bottom: -60px;
    left: -60px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(65,105,225,0.09) 0%, transparent 65%);
    pointer-events: none;
  }

  .content-wrap {
    width: 100%;
    max-width: 540px;
    position: relative;
    z-index: 1;
  }

  /* Heading */
  .heading-block { margin-bottom: 38px; }

  .title {
    font-family: 'Sora', sans-serif;
    font-size: 2.1rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 8px;
    line-height: 1.15;
  }

  .subtitle {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.48);
  }

  /* ── Role cards ── */
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin-bottom: 38px;
  }

  .role-card {
    background: rgba(255,255,255,0.038);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    padding: 26px 22px;
    text-align: left;
    cursor: pointer;
    transition: all 220ms;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .role-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 22px 60px rgba(0,0,0,0.4);
    border-color: rgba(65,105,225,0.5);
    background: rgba(65,105,225,0.1);
  }

  .admin-card {
    background: linear-gradient(145deg, rgba(3,18,115,0.55) 0%, rgba(35,55,198,0.45) 100%);
    border-color: rgba(65,105,225,0.28);
  }

  .admin-card:hover {
    background: linear-gradient(145deg, rgba(3,18,115,0.75) 0%, rgba(35,55,198,0.65) 100%);
    border-color: rgba(76,201,240,0.5);
  }

  /* Card top */
  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .role-icon {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .alumni-icon { background: rgba(65,105,225,0.14); border: 1px solid rgba(65,105,225,0.24); }
  .admin-icon  { background: rgba(255,255,255,0.1);  border: 1px solid rgba(255,255,255,0.14); }

  .role-badge {
    font-family: 'Sora', sans-serif;
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 999px;
  }

  .alumni-badge { background: rgba(65,105,225,0.14); color: #4CC9F0; border: 1px solid rgba(65,105,225,0.28); }
  .admin-badge  { background: rgba(255,255,255,0.09); color: rgba(255,255,255,0.68); border: 1px solid rgba(255,255,255,0.14); }

  /* Card body */
  .role-title {
    font-family: 'Sora', sans-serif;
    font-size: 1.05rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 6px;
  }

  .role-desc {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.48);
    line-height: 1.65;
    flex: 1;
  }

  /* CTA */
  .card-cta {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.84rem;
    font-weight: 700;
    margin-top: 2px;
    transition: gap 150ms;
  }

  .alumni-cta { color: #4169E1; }
  .admin-cta  { color: rgba(255,255,255,0.62); }

  .role-card:hover .alumni-cta { color: #4CC9F0; gap: 8px; }
  .role-card:hover .admin-cta  { color: rgba(255,255,255,0.85); gap: 8px; }

  /* Back */
  .back-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.84rem;
    color: rgba(255,255,255,0.33);
    cursor: pointer;
    transition: color 150ms;
    padding: 0;
  }

  .back-btn:hover { color: rgba(255,255,255,0.68); }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .root  { flex-direction: column; height: auto; overflow: auto; }
    .left  { width: 100%; height: auto; padding: 40px 24px 0; }
    .knight-frame { max-width: 200px; }
    .brand-strip  { padding: 20px 0; }
    .right { height: auto; padding: 36px 20px; }
    .cards { grid-template-columns: 1fr; }
  }
</style>