import { ReactNode } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 lg:pt-32">{children}</main>
      <Footer />
    </div>
  );
};
