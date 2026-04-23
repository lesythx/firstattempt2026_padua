import { writable, derived } from 'svelte/store';

// ── Auth ─────────────────────────────────────────────────────
export const auth = writable({
  loggedIn: false,
  role: null,     // 'alumni' | 'admin'
  user: null
});

// ── Active view ───────────────────────────────────────────────
// alumni views:  home | events | donations | notifications | profile
// admin views:   admin-dashboard | admin-campaigns | admin-leaderboard
// auth views:    login | forgot | roleselect
export const view = writable('login');

// ── Navigation helper ─────────────────────────────────────────
export function go(v) { view.set(v); }

export function login(role, user) {
  auth.set({ loggedIn: true, role, user });
  go(role === 'admin' ? 'admin-dashboard' : 'home');
}

export function logout() {
  auth.set({ loggedIn: false, role: null, user: null });
  go('login');
}

// ── Notifications store (live state) ─────────────────────────
import { notifications as initialNotifs } from './data.js';
export const notifications = writable([...initialNotifs]);
export const unreadCount = derived(notifications, $n => $n.filter(n => n.unread).length);

export function markAllRead() {
  notifications.update(items => items.map(n => ({ ...n, unread: false })));
}

// ── Campaigns store (live state for donations + admin) ────────
import { campaigns as initialCampaigns } from './data.js';
export const campaigns = writable([...initialCampaigns]);

// ── Donation history store ────────────────────────────────────
import { donationHistory as initialHistory } from './data.js';
export const donationHistory = writable([...initialHistory]);

export function addDonation(donation) {
  donationHistory.update(h => [donation, ...h]);
  campaigns.update(cs => cs.map(c =>
    c.id === donation.campaignId
      ? { ...c, raised: c.raised + donation.amount }
      : c
  ));
}
