type GetUserProjects = {
  userId: string;
};

type GetUserProjectById = {
  userId: string;
  projectId: string;
};

type CreateProject = {
  userId: string;
  name: string;
  description: string;
};

type CloseProjectType = {
  projectId: string;
};

type DeleteColumn = {
  columnId: string;
};

type CreateTaskType = {
  name: string;
  description: string;
  columnId: string;
  createdById: string;
};

export type {
  GetUserProjects,
  GetUserProjectById,
  CreateProject,
  DeleteColumn,
  CreateTaskType,
  CloseProjectType,
};
