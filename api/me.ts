import { requireClerkUser, supabaseAdmin } from "./_utils";

export default async function handler(req: any, res: any) {
  const auth = await requireClerkUser(req);
  if (!auth.ok) return res.status(auth.status).json({ error: auth.error });

  const sb = supabaseAdmin();

  const { data, error } = await sb
    .from("barbers")
    .select("*")
    .eq("clerk_user_id", auth.userId)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ barber: data ?? null });
}
