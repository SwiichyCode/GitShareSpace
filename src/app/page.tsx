import { Hero } from "@/modules/landing/Hero";
import { Faqs } from "@/modules/landing/Faqs";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Faqs />
    </>
  );
}
