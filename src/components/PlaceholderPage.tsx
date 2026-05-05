import { Helmet } from "react-helmet-async";
import { PageLayout } from "@/components/PageLayout";
import { ComingSoon } from "@/components/ComingSoon";
import { PageHero } from "@/components/shared/PageHero";

interface PlaceholderPageProps {
  title: string;
  pageTitle: string;
  description?: string;
  hero?: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    backgroundImage: string;
    breadcrumb: string;
  };
}

export const PlaceholderPage = ({ title, pageTitle, description, hero }: PlaceholderPageProps) => (
  <PageLayout>
    <Helmet>
      <title>{pageTitle} | Wietek Gerüstbau</title>
    </Helmet>
    {hero && <PageHero {...hero} />}
    <ComingSoon title={title} description={description} />
  </PageLayout>
);
