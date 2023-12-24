import { Content } from "@/types/page";
import { ImageComponent } from "./ImageComponent";
import { cn } from "@/lib/utils";
import { FALLBACK_SETTINGS } from "@/config";

export const DynamicGrid = ({
  contentData,
  deviceType,
}: {
  contentData: Content;
  deviceType: SupportedDeviceType;
}) => {

  const settings = contentData?.settings ?? FALLBACK_SETTINGS

  const getResponsiveGridOptions = () => {
    return {
      gridTemplateColumns: `repeat(${
        settings[deviceType].column ?? 1
      },auto)`,
    };
  };

  return (
    <div
      className={cn("w-full", {
        "sm:hidden block": deviceType === "mobile",
        "sm:block hidden": deviceType === "desktop",
      })}
      style={{ background: settings.background_color }}
    >
      <div style={{ display: "grid", ...getResponsiveGridOptions() }}>
        {contentData.section_data_array?.map((sectionData) => (
          <ImageComponent sectionData={sectionData} deviceType={deviceType} />
        ))}
      </div>
    </div>
  );
};
