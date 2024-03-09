"use client";
import Link from "next/link";

type Props = {
  url: string;
  fn?: () => void;
};

export const CTALink = ({ url, fn }: Props) => {
  return (
    <Link
      className="bg-cta hover:bg-cta/90 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      href={url}
      onMouseEnter={fn}
    >
      Get started
    </Link>
  );
};
