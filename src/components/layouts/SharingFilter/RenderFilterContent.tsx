import { URL } from "@/config/constants";
import { DirectionListToggle } from "@/modules/repositories/components/DirectionListToggle";
import { SelectLanguage } from "@/modules/repositories/components/SelectLanguage";
import { SelectParam } from "@/components/layouts/SharingFilter/SelectParam";
import { SelectType } from "@/modules/resources/components/SelectType";
import type { PathnameType } from "@/components/layouts/SharingFilter/_index";

type Props = {
  pathname: PathnameType;
};

export const RenderFilterContent = ({ pathname }: Props) => {
  switch (pathname) {
    case URL.REPOSITORIES:
      return (
        <>
          <DirectionListToggle />
          <SelectLanguage />
          <SelectParam pathname={pathname} />
        </>
      );

    case URL.RESOURCES:
      return (
        <>
          <SelectType />
          <SelectParam pathname={pathname} />
        </>
      );
    default:
      return null;
  }
};
