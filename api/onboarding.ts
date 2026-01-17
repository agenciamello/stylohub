import { requireClerkUser, supabaseAdmin } from "./_utils";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const auth = await requireClerkUser(req);
  if (!auth.ok) return res.status(auth.status).json({ error: auth.error });

  const { avgPrice, clientsPerDay, daysPerWeek, firstName, fullName, email } = req.body || {};

  const sb = supabaseAdmin();

  const { data, error } = await sb
    .from("barbers")
    .upsert(
      {
        clerk_user_id: auth.userId,
        email: email ?? null,
        first_name: firstName ?? null,
        full_name: fullName ?? null,
        avg_price: avgPrice ?? null,
        clients_per_day: clientsPerDay ?? null,
        days_per_week: daysPerWeek ?? null,
      },
      { onConflict: "clerk_user_id" }
    )
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ barber: data });
}
