import { Content } from "@/types/page";

export const Gap = ({ contentData }: { contentData: Content }) => {
  const { settings } = contentData;
  return (
    <div
      className="w-full min-h-[20px]"
      style={{ backgroundColor: settings?.background_color ?? "white" }}
    ></div>
  );
};
