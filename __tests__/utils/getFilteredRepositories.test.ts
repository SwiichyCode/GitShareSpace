import { getRepositoriesAlreadyStarred } from "@/utils/getRepositoriesAlreadyStarred";

jest.mock("@/utils/getRepositoriesAlreadyStarred", () => ({
  getRepositoriesAlreadyStarred: jest.fn(),
}));

import { getFilteredRepositories } from "@/utils/getFilteredRepositories";
import {
  fakerMockRepository,
  fakerMockUser,
  fakerMockLanguage,
} from "@/mocks/_index";
import { Repository } from "@/types/prisma.type";

const repositoriesMock: Repository[] = [
  {
    ...fakerMockRepository,
    id: 1,
    language: { ...fakerMockLanguage, name: "JavaScript" },
  },
  {
    ...fakerMockRepository,
    id: 2,
    repositoryStargazers: 1,
    language: { ...fakerMockLanguage, name: "TypeScript" },
  },
];

describe("getFilteredRepositories", () => {
  it("should return repositories filtered by language", () => {
    const result = getFilteredRepositories({
      query: "",
      language: "JavaScript",
      initialRepositories: repositoriesMock,
      repositories: repositoriesMock,
      user: fakerMockUser,
      toggleFilter: "all",
    });

    expect(result).toEqual([repositoriesMock[0]]);
  });

  it("should execute the appropriate filter function based on the toggleFilter parameter", () => {
    getFilteredRepositories({
      query: "",
      language: "",
      initialRepositories: repositoriesMock,
      repositories: repositoriesMock,
      user: fakerMockUser,
      toggleFilter: "starred",
    });

    expect(getRepositoriesAlreadyStarred).toHaveBeenCalledTimes(1);
  });
});
