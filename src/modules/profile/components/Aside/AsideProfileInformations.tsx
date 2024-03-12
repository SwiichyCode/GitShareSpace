import Link from "next/link";
import {
  LocationIcon,
  OrganizationIcon,
  MailIcon,
  LinkIcon,
} from "@primer/octicons-react";
import { cn } from "@/lib/utils";
import type { OctokitSocialAccountsResponse } from "@/services/types/octokit.type";
import type { User } from "@/config/types/prisma.type";

type Props = {
  githubProfile: User;
  githubProfileSocialAccounts: OctokitSocialAccountsResponse;
};

// TODO:
// - Parse social url to display only necessary information
// - Parse social url to display icon based on the social url

const profileInformationsItems = (githubProfile: User) => [
  {
    name: githubProfile.company,
    icon: <OrganizationIcon className="text-grey h-4 w-4" />,
  },
  {
    name: githubProfile.location,
    icon: <LocationIcon className="text-grey h-4 w-4" />,
  },
  {
    name: (
      <Link href={`mailto:${githubProfile.email}`}>{githubProfile.email}</Link>
    ),
    icon: <MailIcon className="text-grey h-4 w-4" />,
  },
  {
    name: <Link href={githubProfile.blog ?? ""}>{githubProfile.blog}</Link>,
    icon: <LinkIcon className="text-grey h-4 w-4" />,
    value: githubProfile.blog,
  },
];

export const AsideProfileInformations = ({
  githubProfile,
  githubProfileSocialAccounts,
}: Props) => {
  return (
    <ul className="space-y-1 pt-8">
      {profileInformationsItems(githubProfile).map(
        (item, index) =>
          item.name && (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2",
                typeof item.name !== "string" && "underline hover:text-blue",
              )}
            >
              {item.icon}
              <div className="text-sm">{item.name}</div>
            </li>
          ),
      )}

      {githubProfileSocialAccounts.data.map((account, index) => (
        <li key={index} className="flex items-center gap-2">
          <LinkIcon className="text-grey h-4 w-4" />
          <Link
            href={account.url}
            className=" w-40 truncate text-sm underline hover:text-blue"
          >
            {account.url}
          </Link>
        </li>
      ))}
    </ul>
  );
};
