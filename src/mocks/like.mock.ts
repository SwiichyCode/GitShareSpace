import { faker } from "@faker-js/faker";
import type { Like } from "@prisma/client";

export const fakerMockLike: Like = {
  id: faker.number.int(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  repositoryId: faker.number.int(),
  userId: faker.string.uuid(),
};
