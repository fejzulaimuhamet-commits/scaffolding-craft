import { PlaceholderPage } from "@/components/PlaceholderPage";
import { ASSETS } from "@/lib/site";

const Page = () => (
  <PlaceholderPage
    title="Projekte"
    pageTitle="Projekte"
    hero={{
      eyebrow: "Referenzen",
      title: "Was wir eingerüstet haben.",
      backgroundImage: ASSETS.slide(12),
      breadcrumb: "Projekte",
    }}
  />
);
export default Page;
