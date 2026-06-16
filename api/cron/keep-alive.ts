import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabaseClient } from "../_lib/supabase.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("rsvp_confirmations")
      .select("id", { count: "exact", head: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ ok: true, count: data ?? "unknown" });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "keep-alive failed",
    });
  }
}
