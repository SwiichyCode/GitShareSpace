import { SharingCardLayout } from "./_layout";
import { SharingCardHeader } from "./SharingCardHeader";
import { SharingCardBody } from "./SharingCardBody";
import { SharingCardFooter } from "./SharingCardFooter";

type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
  className?: string;
};

export const SharingCard = ({ header, body, footer, className }: Props) => {
  return (
    <SharingCardLayout className={className}>
      <SharingCardHeader>{header}</SharingCardHeader>
      <SharingCardBody>{body}</SharingCardBody>
      <SharingCardFooter>{footer}</SharingCardFooter>
    </SharingCardLayout>
  );
};
