import { PageProps } from "@/types/page";
import axios from "axios";

export default async function getPageData(locale: string, pageType: string) {
  const { data } = await axios.get(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/cms/page/${pageType}?lang=${locale}`
  );

  return data as PageProps;
}
