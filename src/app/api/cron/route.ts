import { type NextRequest, NextResponse } from "next/server";
import repositoryService from "@/services/repository.service";
import { env } from "@/env";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  await repositoryService.syncRepositories();

  return NextResponse.json({ ok: "Cron OK" });
}
