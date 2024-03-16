import Link from "next/link";
import { ProfileAvatar } from "@/components/layouts/ProfileAvatar";
import { URL } from "@/config/constants";
import type { Resource } from "@/config/types/prisma.type";

type Props = {
  resource: Resource;
};

export const ResourceCardHeader = ({ resource }: Props) => {
  console.log("ResourceCardHeader", resource.createdBy);
  return (
    <>
      <div className="flex items-center gap-2">
        <ProfileAvatar
          pictureUrl={`${resource.createdBy.image!}?size=40`}
          alt={resource.createdBy.username! ?? resource.createdBy.name!}
        />
        <span className="text-xs">
          Published by{" "}
          <Link
            href={`${URL.PROFILE}/${resource.createdBy.id}?username=${resource.createdBy.username}`}
            className="text-blue underline"
          >
            {resource.createdBy.username ?? resource.createdBy.name}
          </Link>
        </span>
      </div>
    </>
  );
};
