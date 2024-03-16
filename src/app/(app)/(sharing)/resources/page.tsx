import { AddResourceForm } from "@/modules/resources/components/_forms/add-resource-form";
import resourceService from "@/services/resource.service";

export default async function ResourcesPage() {
  const resources = await resourceService.getResources();

  return (
    <>
      {resources.map((resource) => (
        <p key={resource.id}>{resource.url}</p>
      ))}
      <AddResourceForm />
    </>
  );
}
