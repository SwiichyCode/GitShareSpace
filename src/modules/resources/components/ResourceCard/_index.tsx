import { SharingCard } from "@/components/layouts/SharingCard/_index";
import { ResourceCardHeader } from "./ResourceCardHeader";
import { ResourceCardUrl } from "./ResourceCardUrl";
import { ResourceCardDescription } from "./ResourceCardDescription";
import { ResourceCardFooter } from "./ResourceCardFooter";
import type { Resource } from "@/config/types/prisma.type";

type Props = {
  resource: Resource;
};

export const ResourceCard = ({ resource }: Props) => {
  const { url, description } = resource;

  return (
    <SharingCard
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
