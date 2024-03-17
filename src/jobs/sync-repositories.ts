import { cronTrigger, intervalTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import repositoryService from "@/services/repository.service";

client.defineJob({
  id: "sync-repositories-job",
  name: "Sync Repositories Job",
  version: "0.0.1",
  enabled: true,
  trigger: intervalTrigger({
    seconds: 60,
  }),

  run: async (payload, io, ctx) => {
    await io.runTask("sync-repositories", async () => {
      return await repositoryService.syncRepositories();
    });

    await io.logger.info("✨ Sync Repositories Job");
  },
});
