import { db } from "@/server/db";

class UserService {
  async getUser(userId: string) {
    return await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        likes: true,
      },
    });
  }

  async updateAgreement(userId: string, agreement: boolean) {
    return await db.user.update({
      where: {
        id: userId,
      },
      data: {
        dataSharingAgreement: agreement,
        firstConnection: false,
      },
    });
  }
}

const userService = new UserService();

export default userService;
