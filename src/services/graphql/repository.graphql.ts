import { gql } from "@apollo/client";

export const REPOSITORY_FRAGMENT = gql`
  fragment repoProperties on Repository {
    nameWithOwner
    description
    name
    stargazers {
      totalCount
    }
    licenseInfo {
      name
      url
    }
    updatedAt
  }
`;

export const GET_MULTIPLE_REPOSITORIES = (
  repositories: { ownerUsername: string; repositoryName: string }[],
) => gql`
  {
    ${repositories
      .map(
        ({ ownerUsername, repositoryName }, index) => `repo${
          index + 1
        }: repository(owner: "${ownerUsername}", name: "${repositoryName}") {
      ...repoProperties
    }`,
      )
      .join("\n")}
  }
  ${REPOSITORY_FRAGMENT}
`;
