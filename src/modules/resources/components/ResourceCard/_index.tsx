import { SharingCard } from "@/components/layouts/SharingCard/_index";
import type { Resource } from "@prisma/client";

type Props = {
  resource: Resource;
};

export const ResourceCard = ({ resource }: Props) => {
  return <SharingCard header={resource.url} content={resource.description} />;
};
