import type { RSVPSubmission } from "@shared/schemas";
import { submitRsvp } from "./api";

const STORAGE_KEY = "pending_rsvp_submissions";
const MAX_RETRIES = 5;

interface PendingSubmission {
  id: string;
  payload: RSVPSubmission;
  createdAt: string;
  retries: number;
}

function getPending(): PendingSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PendingSubmission[]) : [];
  } catch {
    return [];
  }
}

function savePending(list: PendingSubmission[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function queueFailedSubmission(payload: RSVPSubmission) {
  const pending = getPending();
  const exists = pending.find((p) => p.id === `${payload.guest_name}::${payload.phone}`);
  if (exists) {
    exists.retries = Math.min((exists.retries || 0) + 1, MAX_RETRIES);
    exists.createdAt = new Date().toISOString();
    savePending(pending);
    return;
  }

  pending.push({
    id: `${payload.guest_name}::${payload.phone}`,
    payload,
    createdAt: new Date().toISOString(),
    retries: 0,
  });

  savePending(pending);
}

export function getPendingCount(): number {
  return getPending().length;
}

export async function syncPendingSubmissions(): Promise<{
  synced: number;
  failed: number;
}> {
  const pending = getPending();
  if (pending.length === 0) return { synced: 0, failed: 0 };

  const remaining: PendingSubmission[] = [];
  let synced = 0;
  let failed = 0;

  for (const item of pending) {
    if (item.retries >= MAX_RETRIES) {
      failed++;
      continue;
    }

    try {
      await submitRsvp(item.payload);
      synced++;
    } catch {
      item.retries += 1;
      if (item.retries < MAX_RETRIES) {
        remaining.push(item);
      } else {
        failed++;
      }
    }
  }

  savePending(remaining);
  return { synced, failed };
}
