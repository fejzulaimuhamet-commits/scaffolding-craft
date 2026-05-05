import { PlaceholderPage } from "@/components/PlaceholderPage";
import { ASSETS } from "@/lib/site";

const Page = () => (
  <PlaceholderPage
    title="Kontakt"
    pageTitle="Kontakt"
    hero={{
      eyebrow: "Kontakt",
      title: "Direkt mit uns sprechen.",
      backgroundImage: ASSETS.slide(30),
      breadcrumb: "Kontakt",
    }}
  />
);
export default Page;
