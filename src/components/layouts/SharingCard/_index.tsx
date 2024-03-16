import React from "react";
import { SharingCardLayout } from "./_layout";
import { SharingCardHeader } from "./SharingCardHeader";
import { SharingCardBody } from "./SharingCardBody";
import { SharingCardFooter } from "./SharingCardFooter";

type Props = {
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
};

export const SharingCard = ({ header, content, footer }: Props) => {
  return (
    <SharingCardLayout>
      <SharingCardHeader>{header}</SharingCardHeader>
      <SharingCardBody>{content}</SharingCardBody>
      <SharingCardFooter>{footer}</SharingCardFooter>
    </SharingCardLayout>
  );
};
