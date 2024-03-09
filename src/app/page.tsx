import { Hero } from "@/modules/landing/Hero";
import { Faqs } from "@/modules/landing/Faqs";
import { Footer } from "@/modules/landing/Footer";
import { Features } from "@/modules/landing/Features";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Faqs />
      <Footer />
    </>
  );
}
