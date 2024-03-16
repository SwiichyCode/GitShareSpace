import { db } from "@/config/server/db";
import { Prisma } from "@prisma/client";
import { PrismaError } from "@/config/lib/exceptions";
import type { PostResourceType } from "./types/resource.type";

export class RessourceService {
  async getResources() {
    return await db.resource.findMany();
  }

  async postResource({ url, description, type, userId }: PostResourceType) {
    try {
      await db.resource.create({
        data: {
          url,
          description,
          type,
          createdBy: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaError(error);
      }
    }
  }
}

const resourceService = new RessourceService();
export default resourceService;
