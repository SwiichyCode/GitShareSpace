import { db } from "@/config/server/db";
import { Prisma } from "@prisma/client";
import { PrismaError } from "@/config/lib/exceptions";
import type {
  GetResourceByFilterType,
  PostResourceType,
} from "./types/resource.type";
import { constructResourceOrderBy } from "./utils/construct-resource-orderBy";
import { constructResourceWhere } from "./utils/construct-resource-where";

export class RessourceService {
  /**
   * Query to get all resources.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getResources() {
    return await db.resource.findMany();
  }

  /**
   * Query to post a resource.
   * @param {string} url - The url.
   * @param {string} description - The description.
   * @param {string} type - The type.
   * @param {number} userId - The user id.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

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

  /**
   * Query to get resources by filter.
   * @param {string} queryParams - The query parameters.
   * @param {string} params - The parameters.
   * @param {number} offset - The offset.
   * @param {number} limit - The limit.
   * @param {number} cursor - The cursor.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getResourcesByFilter({
    queryParams = "",
    typeParams = "",
    params = "",
    offset = 0,
    limit = 20,
    cursor = 0,
  }: GetResourceByFilterType) {
    const orderBy = constructResourceOrderBy({ params });
    const where = constructResourceWhere({ typeParams });
    const resources = await db.resource.findMany({
      where,
      orderBy,

      take: limit,
      skip: offset,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      resources.length === limit ? resources[limit - 1]!.id : undefined;

    return { resources, nextCursor };
  }
}

const resourceService = new RessourceService();
export default resourceService;
