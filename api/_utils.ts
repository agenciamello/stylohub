import { createClient } from "@supabase/supabase-js";
import { verifyToken } from "@clerk/backend";

export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function requireClerkUser(req: any) {
  const authHeader = req.headers?.authorization || req.headers?.Authorization || "";
  const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) return { ok: false as const, status: 401, error: "Missing Bearer token" };

  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    return { ok: true as const, userId: payload.sub };
  } catch {
    return { ok: false as const, status: 401, error: "Invalid token" };
  }
}
