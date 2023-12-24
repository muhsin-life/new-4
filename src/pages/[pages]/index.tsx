import { PageStructure } from "@/components/PageStructure";
import { getPagesData } from "@/components/hooks/useData";
import getPageData from "@/helpers/api/getHomepageData";
import { generatePagesStaticPaths } from "@/helpers/general";
import { PageProps } from "@/types/page";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPageData("ae-en", "home");
  const paths = generatePagesStaticPaths(data.data.content);

  return {
    fallback: "blocking",
    paths,
  };
};

interface pageConfigProps {
  locale: locale;
  pageName: string;
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const queryClient = new QueryClient();

  const pageConfig = {
    locale: locale as locale,
    pageName: params?.pages as string,
  };

  await queryClient.prefetchQuery({
    queryKey: ["get-page-data", pageConfig.locale, pageConfig.pageName],
    queryFn: async () => {
      const data = await getPageData(pageConfig.locale, pageConfig.pageName);
      return data as PageProps;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      pageConfig,
    },
  };
};

export default function Pages({ pageConfig }: { pageConfig: pageConfigProps }) {
  const { locale, pageName } = pageConfig;

  const { data } = getPagesData(locale, pageName);

  return (
    <div>
      {data?.data.content.map((content) => (
        <PageStructure content={content} key={content.order_id} />
      ))}
    </div>
  );
}
