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
    return await db.user.update({
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
    return await db.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "USER",
      },
    });
  }

  async removeRepositoryComments(repositoryId: number) {
    return await db.comment.deleteMany({
      where: {
        repositoryId: repositoryId,
      },
    });
  }
}

const adminService = new AdminService();

export default adminService;
