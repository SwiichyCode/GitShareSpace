import { SharingCard } from "@/components/layouts/SharingCard/_index";
import { ResourceCardHeader } from "./ResourceCardHeader";
import { ResourceCardUrl } from "./ResourceCardUrl";
import { ResourceCardDescription } from "./ResourceCardDescription";
import type { Resource } from "@/config/types/prisma.type";
import { ResourceCardFooter } from "./ResourceCardFooter";

type Props = {
  resource: Resource;
};

export const ResourceCard = ({ resource }: Props) => {
  const { url, description } = resource;

  return (
    <SharingCard
      className="w-full max-w-md"
      header={<ResourceCardHeader resource={resource} />}
      body={
        <>
          <ResourceCardUrl url={url} />
          <ResourceCardDescription description={description} />
        </>
      }
      footer={<ResourceCardFooter resource={resource} />}
    />
  );
};
