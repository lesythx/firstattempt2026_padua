<script>
  import Icon from '../components/Icon.svelte';
  import { go } from '../store.js';

  let email = $state('');
  let sent  = $state(false);
</script>

<div class="auth-page">
  <div class="card">
    <img src="/icons/addu-seal.png" alt="AdDU" style="width:56px;mix-blend-mode:multiply;opacity:.9;margin-bottom:20px;" />

    {#if sent}
      <div style="text-align:center;">
        <div style="width:56px;height:56px;background:rgba(16,185,129,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
          <Icon name="check-circle" size={28} color="#10b981" />
        </div>
        <h2 class="heading">Check your email</h2>
        <p class="sub">We sent a password reset link to <strong>{email}</strong></p>
        <button class="btn-back" onclick={() => go('login')}>← Back to Sign In</button>
      </div>
    {:else}
      <h2 class="heading">Reset Password</h2>
      <p class="sub">Enter your email and we'll send a reset link.</p>

      <form onsubmit={(e) => { e.preventDefault(); sent = true; }}>
        <div class="field">
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" bind:value={email} required />
        </div>
        <button type="submit" class="submit-btn">Send Reset Link</button>
      </form>

      <button class="btn-back" onclick={() => go('login')}>← Back to Sign In</button>
    {/if}
  </div>
</div>

<style>
  .auth-page {
    min-height:100vh; background:linear-gradient(135deg,#031273 0%,#0504AA 100%);
    display:flex; align-items:center; justify-content:center; padding:24px;
  }
  .card {
    background:#fff; border-radius:20px; padding:40px 36px;
    width:100%; max-width:440px; box-shadow:0 24px 64px rgba(3,18,115,.35);
    display:flex; flex-direction:column; align-items:flex-start;
  }
  .heading { font-family:'Sora',sans-serif; font-size:1.5rem; font-weight:800; color:#031273; margin-bottom:6px; }
  .sub     { font-size:.88rem; color:#6b7db3; margin-bottom:24px; }
  .field   { margin-bottom:18px; width:100%; }
  .field label { display:block; font-size:.8rem; font-weight:600; color:#031273; margin-bottom:6px; }
  .field input {
    width:100%; padding:12px 14px; border:1.5px solid #e0e7f8; border-radius:10px;
    font-size:.9rem; color:#031273; background:#f8faff; transition:border-color 150ms;
  }
  .field input:focus { border-color:#4169E1; }
  .submit-btn {
    width:100%; padding:13px; background:#031273; color:#fff; border:none;
    border-radius:10px; font-family:'Sora',sans-serif; font-size:.95rem; font-weight:700;
    cursor:pointer; margin-bottom:14px; transition:background 150ms;
  }
  .submit-btn:hover { background:#0504AA; }
  .btn-back { background:none; border:none; font-size:.88rem; color:#4169E1; font-weight:600; cursor:pointer; }
</style>
