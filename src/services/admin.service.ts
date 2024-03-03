import { db } from "@/server/db";

class AdminService {
  async refreshAgreement() {
    await db.user.updateMany({
      where: {
        firstConnection: false,
      },
      data: {
        dataSharingAgreement: false,
        firstConnection: true,
      },
    });
  }

  async removeRepositoryAlreadyStarred(userId: string) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        repositoryAlreadyStarred: {
          set: [],
        },
      },
    });
  }

  async updateUserRole(userId: string) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "USER",
      },
    });
  }

  async removeRepositoryComments(repositoryId: number) {
    await db.comment.deleteMany({
      where: {
        repositoryId: repositoryId,
      },
    });
  }

  async updateCronLastRun() {
    await db.cron.update({
      where: {
        id: 1,
      },

      data: {
        lastRun: new Date(),
      },
    });
  }
}

const adminService = new AdminService();

export default adminService;
