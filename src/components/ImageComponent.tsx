import { SectionDataArray } from "@/types/page";
import Image from "next/image";
import Link from "next/link";

export const ImageComponent = ({
  sectionData,
  deviceType,
}: {
  sectionData: SectionDataArray;
  deviceType: SupportedDeviceType;
}) => {
  const { slug, type_key, type_value, title } = sectionData;

  const getResponsiveImageData = () => {
    return {
      src:
        sectionData[deviceType].image_url ??
        "/images/default-product-image.png",
      height: sectionData[deviceType].height ?? 500,
      width: sectionData[deviceType].width ?? 1440,
    };
  };

  const generatePath = () => {
    switch (type_key) {
      case "page":
        return `/${slug}`;
      case "category":
        return `/products?categories=${slug}`;
      case "collection":
        return `/products?collections=${slug}`;
      case "brand":
        return `/products?brands=${slug}`;
      case "link":
        return type_value ?? "#";
      case "product":
        return `/product/${slug}`;
      case "clinic-appointment-screen":
        return "/medical-centre";
      default:
        return "#";
    }
  };

  return (
    sectionData[deviceType].image_url && (
      <Link href={generatePath()}>
        <Image loading="eager" {...getResponsiveImageData()} alt={title} />
      </Link>
    )
  );
};
