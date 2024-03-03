import { getRepositoriesAlreadyStarred } from "@/utils/getRepositoriesAlreadyStarred";
import { fakerMockUser, fakerMockRepository } from "@/mocks/_index";

describe("getRepositoriesAlreadyStarred", () => {
  const mockUser = {
    ...fakerMockUser,
    repositoryAlreadyStarred: ["https://dummy.com/repository/1"],
  };

  const mockRepositories = [
    { ...fakerMockRepository, url: "https://dummy.com/repository/1" },
  ];

  it("should return starred repositories", () => {
    const result = getRepositoriesAlreadyStarred(mockRepositories, mockUser);
    expect(result).toEqual([mockRepositories[0]]);
  });

  it("should return empty array if user is null", () => {
    const result = getRepositoriesAlreadyStarred(mockRepositories, null);
    expect(result).toEqual([]);
  });

  it("should return empty array if user has no starred repositories", () => {
    const result = getRepositoriesAlreadyStarred(mockRepositories, {
      ...mockUser,
      repositoryAlreadyStarred: [],
    });
    expect(result).toEqual([]);
  });
});
