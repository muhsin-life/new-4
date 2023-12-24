import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { PageStructure } from "@/components/PageStructure";
import getPageData from "@/helpers/api/getHomepageData";
import { PageProps } from "@/types/page";
import { GetStaticProps } from "next";

export default function Home({ data }: PageProps) {
  return (
    <div>
      {data.content.map((content) => (
        <PageStructure content={content} key={content.order_id} />
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const data = await getPageData(locale ?? "ae-en", "home");

  return {
    props: {
      data: data.data,
    },
  };
};
