import { PlaceholderPage } from "@/components/PlaceholderPage";
import { ASSETS } from "@/lib/site";

const Page = () => (
  <PlaceholderPage
    title="Karriere"
    pageTitle="Karriere"
    hero={{
      eyebrow: "Karriere",
      title: "Werde Teil des Wietek-Teams.",
      backgroundImage: ASSETS.slide(20),
      breadcrumb: "Karriere",
    }}
  />
);
export default Page;
