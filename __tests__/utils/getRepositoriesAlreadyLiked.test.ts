import { getRepositoriesAlreadyLiked } from "@/utils/getRepositoriesAlreadyLiked";
import { fakerMockUser, fakerMockRepository } from "@/mocks/_index";

describe("getRepositoriesAlreadyLiked", () => {
  it("should return an empty array if user is null", () => {
    const result = getRepositoriesAlreadyLiked([fakerMockRepository], null);
    expect(result).toEqual([]);
  });

  it("should return an empty array if user has no likes", () => {
    const userWithNoLikes = { ...fakerMockUser, likes: [] };
    const result = getRepositoriesAlreadyLiked(
      [fakerMockRepository],
      userWithNoLikes,
    );
    expect(result).toEqual([]);
  });

  it("should return repositories that the user has liked", () => {
    const likedRepository = { ...fakerMockRepository, id: 1 };
    const userWithLikes = {
      ...fakerMockUser,
      likes: [
        {
          ...fakerMockUser.likes[0]!,
          id: 1,
        },
      ],
    };

    const result = getRepositoriesAlreadyLiked(
      [fakerMockRepository, likedRepository],
      userWithLikes,
    );
    expect(result).toEqual([likedRepository]);
  });
});
