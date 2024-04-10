import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { PopoverKebabBtn } from "@/components/ui/popover-kebab-btn";
import { useProjectParams } from "@/modules/projects/hooks/use-projects-params";
import { useProjectsContext } from "@/modules/projects/context/projectContext";
import { DeleteActionBtn } from "@/modules/projects/components/DeleteActionBtn";
import { useActionDialog } from "@/modules/projects/stores/useActionDialog";

type Props = {
  columnId: string;
};

export const ColumnAction = ({ columnId }: Props) => {
  const { project } = useProjectsContext();
  const { params, setParams } = useProjectParams();
  const { setOpen } = useActionDialog();

  const handleParams = async () => {
    await setParams({ ...params, columnId, projectId: project.id });
  };

  return (
    <Popover>
      <PopoverTrigger onClick={handleParams}>
        <PopoverKebabBtn />
      </PopoverTrigger>
      <PopoverContent>
        <h3 className="mb-2 text-sm text-[#848d97]">Column</h3>
        <DeleteActionBtn
          text={"Delete column"}
          onClick={() => setOpen("column", true)}
        />
      </PopoverContent>
    </Popover>
  );
};
