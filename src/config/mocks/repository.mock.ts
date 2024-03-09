import { faker } from "@faker-js/faker";
import { fakerMockUser } from "./user.mock";
import { fakerMockComment } from "./comment.mock";
import { fakerMockLanguage } from "./language.mock";
import { fakerMockTopic } from "./topic.mock";
import type { Repository } from "@/config/types/prisma.type";

export const fakerMockRepository: Repository = {
  id: faker.number.int(),
  url: faker.internet.url(),
  description: faker.lorem.sentence(),
  repositoryId: faker.number.int(),
  repositoryName: faker.lorem.words(3),
  repositoryDescription: faker.lorem.sentence(),
  repositoryStargazers: faker.number.int(),
  repositoryCreatedAt: faker.date.past(),
  repositoryUpdatedAt: faker.date.recent(),
  repositoryLicenseName: faker.lorem.word(),
  repositoryLicenseUrl: faker.internet.url(),
  is_template: faker.datatype.boolean(),
  is_visible: faker.datatype.boolean(),
  ownerId: faker.number.int(),
  ownerUsername: faker.internet.userName(),
  ownerAvatarUrl: faker.image.avatarGitHub(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  createdById: faker.string.uuid(),
  languageId: faker.number.int(),
  createdBy: fakerMockUser,
  language: fakerMockLanguage,
  comments: Array.from({ length: 5 }, () => fakerMockComment),
  topics: Array.from({ length: 5 }, () => fakerMockTopic),
};
