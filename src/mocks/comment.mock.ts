import { faker } from "@faker-js/faker";
import type { Comment } from "@prisma/client";

export const fakerMockComment: Comment = {
  id: faker.number.int(),
  content: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  createdById: faker.string.uuid(),
  repositoryId: faker.number.int(),
};
