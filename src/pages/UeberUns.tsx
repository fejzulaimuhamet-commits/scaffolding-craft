import { PlaceholderPage } from "@/components/PlaceholderPage";
import { ASSETS } from "@/lib/site";

const Page = () => (
  <PlaceholderPage
    title="Über uns"
    pageTitle="Über uns"
    hero={{
      eyebrow: "Über uns",
      title: "Familiengeführt. Verwurzelt in Hamburg.",
      backgroundImage: ASSETS.slide(4),
      breadcrumb: "Über uns",
    }}
  />
);
export default Page;
