import { faker } from "@faker-js/faker";

interface Repository {
  id: number;
  description: string;
  ownerAvatarUrl: string;
  ownerUsername: string;
  repositoryName: string;
  repositoryDescription: string;
  repositoryStargazers: number;
  repositoryLicenseUrl: string;
  repositoryLicenseName: string;
  language: {
    name: string;
  };
  createdBy: {
    name: string;
  };
}

function createRandomRepository(): Repository {
  return {
    id: faker.number.int(),
    description: faker.lorem.sentence(),
    ownerAvatarUrl: faker.image.avatar(),
    ownerUsername: faker.internet.userName(),
    repositoryName: faker.person.firstName(),
    repositoryDescription: faker.lorem.sentence(),
    repositoryStargazers: faker.number.int(),
    repositoryLicenseUrl: faker.internet.url(),
    repositoryLicenseName: faker.random.word(),
    language: {
      name: faker.random.word(),
    },
    createdBy: {
      name: faker.person.firstName(),
    },
  };
}

const repository = createRandomRepository();

export const repositoryMock = {
  repository,
  createRandomRepository,
};
