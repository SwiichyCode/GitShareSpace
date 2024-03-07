import { type NextRequest, NextResponse } from "next/server";
import { syncRepositories } from "@/services/repository.service";
import adminService from "@/services/admin.service";
import { env } from "@/env";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  await syncRepositories();
  await adminService.updateCronLastRun();

  return NextResponse.json({ ok: "Cron OK" });
}
