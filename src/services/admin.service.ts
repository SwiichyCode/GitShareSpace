import { db } from "@/config/server/db";
import type {
  RemoveRepositoryCommentsType,
  UserEntry,
} from "./types/admin.type";

class AdminService {
  /**
   * Action to update the data sharing agreement of all users who have already connected to the app.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

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

  /**
   * Action to remove starred repositories from a user.
   * @param {string} userId - The user ID to remove the starred repositories from.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async removeStarredRepositories({ userId }: UserEntry) {
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

  /**
   * Action to update the role of a user.
   * @param {string} userId - The user ID to update the role.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async updateUserRole({ userId }: UserEntry) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "USER",
      },
    });
  }

  /**
   * Action to remove comments from a repository.
   * @param {number} repositoryId - The repository ID to remove the comments from.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async removeRepositoryComments({
    repositoryId,
  }: RemoveRepositoryCommentsType) {
    await db.comment.deleteMany({
      where: {
        repositoryId,
      },
    });
  }

  /**
   * Action to update the last run of the cron job.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

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
