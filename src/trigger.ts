import { TriggerClient } from "@trigger.dev/sdk";
import { env } from "@/config/env";

export const client = new TriggerClient({
  id: "gitsharespace-ZvGI",
  apiKey: env.TRIGGER_API_KEY,
  apiUrl: env.TRIGGER_API_URL,
});
