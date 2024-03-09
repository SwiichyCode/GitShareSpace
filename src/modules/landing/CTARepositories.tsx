"use client";
import { usePrefetchRepositories } from "@/modules/repositories/hooks/use-prefetch-repositories";
import { CTALink } from "@/components/ui/cta-link";
import { URL } from "@/config/constants";

export const CTARepositories = () => {
  const { prefetchRepositories } = usePrefetchRepositories();

  return <CTALink url={URL.REPOSITORIES} fn={prefetchRepositories} />;
};
