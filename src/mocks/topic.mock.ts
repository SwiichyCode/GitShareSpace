import { faker } from "@faker-js/faker";
import type { Topic } from "@prisma/client";

export const fakerMockTopic: Topic = {
  id: faker.number.int(),
  name: faker.lorem.word(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};
