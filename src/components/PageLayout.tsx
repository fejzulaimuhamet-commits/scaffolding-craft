import { ReactNode } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { FloatingButtons } from "@/components/sections/FloatingButtons";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background pb-14 sm:pb-0 flex flex-col">
      <Header />
      <main className="flex-1 pt-24 lg:pt-32">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};
