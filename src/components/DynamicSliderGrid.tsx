import { Content } from "@/types/page";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import { useEffect, useState } from "react";
import { Pagination, Grid, Autoplay } from "swiper/modules";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { ImageComponent } from "./ImageComponent";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FALLBACK_SETTINGS } from "@/config";

export const DynamicSliderGrid = ({
  contentData,
  deviceType,
}: {
  contentData: Content;
  deviceType: SupportedDeviceType;
}) => {
  const { section_data_array } = contentData;

  const sliderLength = section_data_array?.length ?? 0;

  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === sliderLength - 1,
  });

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-10 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inactiveStyles = "hidden text-gray-400";

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === sliderLength - 1,
      });
    });
  }, [swiper, sliderLength]);

  const { desktop, mobile, autoplay } =
    contentData?.settings ?? FALLBACK_SETTINGS;

  const getResponsiveSliderOptions = (): SwiperProps => {
    switch (deviceType) {
      case "mobile":
        return {
          slidesPerView: mobile.column ?? 1,
          grid: {
            rows: mobile.row ?? 1,
            fill: "row",
          },
        };
      case "desktop":
        return {
          slidesPerView: desktop.column ?? 1,
          grid: {
            rows: desktop.row ?? 1,
            fill: "row",
          },
        };
    }
  };

  return section_data_array !== null ? (
    <div
      className={cn("group relative overflow-hidden max-w-[1500px] mx-auto", {
        "sm:hidden block": deviceType === "mobile",
        "sm:block hidden": deviceType === "desktop",
      })}
    >
      <div className=" z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(activeStyles, "right-3 transition", {
            [inactiveStyles]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isEnd,
          })}
          aria-label="next image"
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />{" "}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(activeStyles, "left-3 transition", {
            [inactiveStyles]: slideConfig.isBeginning,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isBeginning,
          })}
          aria-label="previous image"
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />{" "}
        </button>
      </div>
      <MaxWidthWrapper>
        <Swiper
          pagination={{
            dynamicBullets: true,
            renderBullet: (_, className) => {
              return `<span class="rounded-full transition ${className}"></span>`;
            },
          }}
          autoplay={autoplay ?? false}
          onSwiper={(swiper) => setSwiper(swiper)}
          modules={[Pagination, Grid, Autoplay]}
          className="h-full w-full"
          {...getResponsiveSliderOptions()}
        >
          {section_data_array.map((sectionData) => (
            <SwiperSlide
              key={sectionData.id}
              className="-z-10 relative h-full w-full"
            >
              <ImageComponent
                key={sectionData.id}
                sectionData={sectionData}
                deviceType={deviceType}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </MaxWidthWrapper>
    </div>
  ) : (
    <div></div>
  );
};
