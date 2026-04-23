<script>
  import Icon from '../components/Icon.svelte';
  import { go } from '../store.js';

  let email    = $state('');
  let password = $state('');
  let showPass = $state(false);
  let loading  = $state(false);
  let remember = $state(false);

  function handleLogin(e) {
    e.preventDefault();
    loading = true;
    setTimeout(() => { loading = false; go('roleselect'); }, 900);
  }
</script>

<div class="root">

  <!-- ═══ LEFT — Branding panel ═══ -->
  <div class="left">

    <!-- Radial glow decoration -->
    <div class="glow"></div>

    <!-- Knight framed box -->
    <div class="knight-frame">
      <img src="/icons/ateneo-knight.png" alt="Ateneo Knight" class="knight-img" />
    </div>

    <!-- Seal · Wordmark · Tagline -->
    <div class="brand-strip">
      <img src="/icons/addu-seal.png"     alt="AdDU Seal"                     class="brand-seal" />
      <img src="/icons/addu-wordmark.png" alt="Ateneo de Davao University"    class="brand-wordmark" />
      <span class="brand-tagline">Fortes in Fide</span>
    </div>

  </div>

  <!-- ═══ RIGHT — Form panel ═══ -->
  <div class="right">

    <!-- Subtle accent glows -->
    <div class="glow-tr"></div>
    <div class="glow-bl"></div>

    <div class="form-wrap">

      <h1 class="title">Welcome Back</h1>
      <p class="subtitle">Sign in to your alumni career passport</p>

      <form onsubmit={handleLogin} novalidate>

        <!-- Email -->
        <div class="field">
          <span class="field-label">Email Address</span>
          <div class="input-row">
            <span class="i-left"><Icon name="mail" size={17} color="rgba(255,255,255,.4)" /></span>
            <input type="email" placeholder="Enter your email"
              bind:value={email} autocomplete="email" />
          </div>
        </div>

        <!-- Password -->
        <div class="field">
          <span class="field-label">Password</span>
          <div class="input-row">
            <span class="i-left"><Icon name="eye-off" size={17} color="rgba(255,255,255,.4)" /></span>
            <input type={showPass ? 'text' : 'password'} placeholder="Enter your password"
              bind:value={password} autocomplete="current-password" style="padding-right:48px;" />
            <button type="button" class="eye-btn" onclick={() => (showPass = !showPass)}>
              <Icon name={showPass ? 'eye' : 'eye-off'} size={17} color="rgba(255,255,255,.4)" />
            </button>
          </div>
        </div>

        <!-- Remember / Forgot -->
        <div class="meta-row">
          <label class="check-label">
            <input type="checkbox" bind:checked={remember} />
            <span>Remember me</span>
          </label>
          <button type="button" class="forgot-btn" onclick={() => go('forgot')}>Forgot Password?</button>
        </div>

        <!-- Submit -->
        <button type="submit" class="submit-btn" disabled={loading}>
          {#if loading}
            <span class="spinner"></span> Signing in…
          {:else}
            Sign In
          {/if}
        </button>

      </form>

      <!-- Divider -->
      <div class="divider"><span>or continue with</span></div>

      <!-- Social -->
      <div class="social-row">
        {#each ['Google', 'Facebook'] as p}
          <button class="social-btn">{p}</button>
        {/each}
      </div>

      <!-- Sign-up link -->
      <p class="bottom-link">
        Don't have an account?
        <button class="link-btn" onclick={() => go('roleselect')}>Sign Up</button>
      </p>

    </div>
  </div>
</div>

<style>
  /* ── Root: locked to full viewport, zero overflow ── */
  .root {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #0b1040;
  }

  /* ════════════════════════════════════════
     LEFT PANEL
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

  /* Glow orb */
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

  /* Knight frame */
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
    box-shadow:
      0 28px 72px rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,255,255,0.05);
    flex-shrink: 0;
  }

  .knight-img {
    width: 92%;
    height: 92%;
    object-fit: contain;
    mix-blend-mode: screen;
    filter: drop-shadow(0 0 28px rgba(76,201,240,0.18));
  }

  /* Brand strip */
  .brand-strip {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 28px 24px 0;
    position: relative;
    z-index: 1;
  }

  .brand-seal {
    width: 50px;
    height: 50px;
    object-fit: contain;
    mix-blend-mode: screen;
    opacity: 0.9;
  }

  .brand-wordmark {
    width: 220px;
    object-fit: contain;
    mix-blend-mode: screen;
    opacity: 0.87;
  }

  .brand-tagline {
    font-family: 'Sora', sans-serif;
    font-style: italic;
    font-size: 0.8rem;
    color: #4CC9F0;
    letter-spacing: 0.12em;
    opacity: 0.82;
  }

  /* ════════════════════════════════════════
     RIGHT PANEL
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
    padding: 40px;
  }

  /* Accent glows */
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

  .form-wrap {
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
  }

  /* Heading */
  .title {
    font-family: 'Sora', sans-serif;
    font-size: 2.1rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 6px;
    line-height: 1.15;
  }

  .subtitle {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.5);
    margin-bottom: 34px;
  }

  /* Fields */
  .field { margin-bottom: 18px; }

  .field-label {
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    color: rgba(255,255,255,0.72);
    margin-bottom: 8px;
  }

  .input-row { position: relative; }

  .i-left {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    display: flex;
  }

  .input-row input {
    width: 100%;
    padding: 13px 16px 13px 46px;
    background: rgba(255,255,255,0.07);
    border: 1.5px solid rgba(255,255,255,0.11);
    border-radius: 12px;
    font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    transition: border-color 150ms, background 150ms;
  }

  .input-row input::placeholder { color: rgba(255,255,255,0.28); }

  .input-row input:focus {
    border-color: rgba(65,105,225,0.65);
    background: rgba(255,255,255,0.1);
    outline: none;
  }

  .eye-btn {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
  }

  /* Meta row */
  .meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 26px;
  }

  .check-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    user-select: none;
  }

  .check-label input[type=checkbox] {
    width: 15px;
    height: 15px;
    accent-color: #4169E1;
    cursor: pointer;
  }

  .forgot-btn {
    background: none;
    border: none;
    font-size: 0.82rem;
    font-weight: 600;
    color: #4CC9F0;
    cursor: pointer;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
    transition: opacity 150ms;
  }
  .forgot-btn:hover { opacity: 0.75; }

  /* Submit */
  .submit-btn {
    width: 100%;
    padding: 14px;
    background: #06092a;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Sora', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 160ms;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    letter-spacing: 0.025em;
    box-shadow: 0 6px 24px rgba(0,0,0,0.45);
  }

  .submit-btn:hover:not(:disabled) {
    background: #030520;
    transform: translateY(-1px);
    box-shadow: 0 10px 32px rgba(0,0,0,0.55);
  }

  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.22);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Divider */
  .divider {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 24px 0;
    font-size: 0.77rem;
    color: rgba(255,255,255,0.32);
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.09);
  }

  /* Social */
  .social-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 28px;
  }

  .social-btn {
    padding: 12px;
    background: rgba(255,255,255,0.055);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(255,255,255,0.78);
    cursor: pointer;
    transition: all 150ms;
  }

  .social-btn:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.22);
  }

  /* Bottom */
  .bottom-link {
    text-align: center;
    font-size: 0.87rem;
    color: rgba(255,255,255,0.48);
  }

  .link-btn {
    background: none;
    border: none;
    font-size: 0.87rem;
    font-weight: 700;
    color: #4CC9F0;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
    transition: opacity 150ms;
  }

  .link-btn:hover { opacity: 0.8; }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .root        { flex-direction: column; height: auto; overflow: auto; }
    .left        { width: 100%; height: auto; padding: 40px 24px 0; }
    .knight-frame{ max-width: 200px; }
    .brand-strip { padding: 20px 0; }
    .right       { height: auto; padding: 36px 20px; }
  }
</style>