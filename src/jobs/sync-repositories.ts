import { cronTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import repositoryService from "@/services/repository.service";

client.defineJob({
  id: "sync-repositories-job",
  name: "Sync Repositories Job",
  version: "0.0.1",

  trigger: cronTrigger({
    cron: "30 02 * * *",
  }),

  run: async (payload, io, ctx) => {
    await io.runTask("sync-repositories", async () => {
      return repositoryService.syncRepositories();
    });

    await io.logger.info("✨ Sync Repositories Job");
  },
});
