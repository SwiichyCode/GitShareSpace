import { faker } from "@faker-js/faker";
import type { User } from "@/types/prisma.type";
import { fakerMockLike } from "./like.mock";

export const fakerMockUser: User = {
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  emailVerified: faker.date.recent(),
  repositoryAlreadyStarred: [],
  image: faker.image.avatarGitHub(),
  firstConnection: faker.datatype.boolean(0),
  dataSharingAgreement: faker.datatype.boolean(0.9),
  role: "USER",
  likes: [fakerMockLike],
};
