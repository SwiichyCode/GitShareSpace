import { db } from "@/config/server/db";
import type {
  CreateProject,
  CreateTaskType,
  DeleteColumn,
  GetUserProjectById,
  GetUserProjects,
} from "./types/project.type";

import {
  COLUMN_COLOR,
  DEFAULT_COLUMN_DESCRIPTION,
  DEFAULT_COLUMN_NAME,
} from "@/config/constants";

class ProjectService {
  /**
   * Query to get all projects created by a user.
   * @param {GetUserProjects} - The user id.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getUserProjects({ userId }: GetUserProjects) {
    try {
      return await db.project.findMany({
        where: {
          createdById: userId,
        },
        include: {
          createdBy: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  /**
   * Query to get a project created by a user.
   * @param {GetUserProjectById} - The user id and project id.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async getUserProjectById({ userId, projectId }: GetUserProjectById) {
    try {
      return await db.project.findFirst({
        where: {
          id: projectId,
          createdById: userId,
        },
        include: {
          createdBy: true,
          columns: {
            include: {
              tasks: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  /**
   * Query to create a project.
   * @param {CreateProject} - The user id, project name, and project description.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async createProject({ userId, name, description }: CreateProject) {
    try {
      await db.project.create({
        data: {
          name,
          description,
          columns: {
            create: [
              {
                name: DEFAULT_COLUMN_NAME.TO_DO,
                description: DEFAULT_COLUMN_DESCRIPTION.TO_DO,
                color: COLUMN_COLOR.GRAY,
                createdById: userId,
              },
              {
                name: DEFAULT_COLUMN_NAME.IN_PROGRESS,
                description: DEFAULT_COLUMN_DESCRIPTION.IN_PROGRESS,
                color: COLUMN_COLOR.YELLOW,
                createdById: userId,
              },
              {
                name: DEFAULT_COLUMN_NAME.DONE,
                description: DEFAULT_COLUMN_DESCRIPTION.DONE,
                color: COLUMN_COLOR.PURPLE,
                createdById: userId,
              },
            ],
          },

          createdBy: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  /**
   * Query to delete a column.
   * @param {DeleteColumn} - The column id.
   * @throws {Error} - Throws an error if there's an error accessing the database.
   */

  async deleteColumn({ columnId }: DeleteColumn) {
    try {
      await db.$transaction([
        db.column.delete({
          where: {
            id: columnId,
          },
        }),
        db.task.deleteMany({
          where: {
            columnId,
          },
        }),
      ]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async createTask({
    name,
    description,
    columnId,
    createdById,
  }: CreateTaskType) {
    try {
      await db.task.create({
        data: {
          name,
          description,
          createdById,
          columnId,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

const projectService = new ProjectService();
export default projectService;
