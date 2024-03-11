import { faker } from "@faker-js/faker";
import { fakerMockLike } from "./like.mock";
import type { User } from "@/config/types/prisma.type";

export const fakerMockUser: User = {
  id: faker.string.uuid(),
  githubUserID: faker.number.int(),
  name: faker.person.firstName(),
  username: faker.internet.userName(),
  bio: faker.lorem.sentence(),
  location: faker.location.city(),
  company: faker.company.name(),
  blog: faker.internet.url(),
  email: faker.internet.email(),
  emailVerified: faker.date.recent(),
  repositoryAlreadyStarred: [],
  image: faker.image.avatarGitHub(),
  firstConnection: faker.datatype.boolean(0),
  dataSharingAgreement: faker.datatype.boolean(0.9),
  personalAccessToken: faker.internet.password(),
  role: "USER",
  likes: [fakerMockLike],
};
