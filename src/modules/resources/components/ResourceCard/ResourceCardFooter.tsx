import { ResourceCardType } from "./ResourceCardType";
import type { Resource } from "@/config/types/prisma.type";

type Props = {
  resource: Resource;
};

export const ResourceCardFooter = ({ resource }: Props) => {
  return (
    <>
      <ResourceCardType type={resource.type} />
    </>
  );
};
