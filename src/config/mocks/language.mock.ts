import { faker } from "@faker-js/faker";
import type { Language } from "@prisma/client";

export const fakerMockLanguage: Language = {
  id: faker.number.int(),
  name: faker.lorem.word(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};
