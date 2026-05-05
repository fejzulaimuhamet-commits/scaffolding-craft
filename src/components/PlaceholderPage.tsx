import { Helmet } from "react-helmet-async";
import { PageLayout } from "@/components/PageLayout";
import { ComingSoon } from "@/components/ComingSoon";

interface PlaceholderPageProps {
  title: string;
  pageTitle: string;
  description?: string;
}

export const PlaceholderPage = ({ title, pageTitle, description }: PlaceholderPageProps) => (
  <PageLayout>
    <Helmet>
      <title>{pageTitle} | Wietek Gerüstbau</title>
    </Helmet>
    <ComingSoon title={title} description={description} />
  </PageLayout>
);
