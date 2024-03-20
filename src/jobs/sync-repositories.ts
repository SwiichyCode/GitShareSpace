import { cronTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import repositoryService from "@/services/repository.service";

client.defineJob({
  id: "sync-repositories-job",
  name: "Sync Repositories Job",
  version: "0.0.1",
  enabled: true,

  trigger: cronTrigger({
    cron: "0 0 * * *",
  }),

  run: async (_, io) => {
    await io.runTask("sync-repositories", async () => {
      return await repositoryService.updatedSyncRepositories();
    });

    await io.logger.info("✨ Sync Repositories Job");
  },
});
