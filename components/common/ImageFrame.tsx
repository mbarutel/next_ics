import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type ImageFrameProp = {
  img: StaticImport;
  alt: string;
  position: string;
  bg: string;
  transformImg: string;
  transformDiv: string;
};
export default function ImageFrame(
  { img, alt, position, bg, transformImg, transformDiv }: ImageFrameProp,
) {
  return (
    <div className="m-6 rounded max-w-lg">
      <div
        className={`h-[300px] sm:h-[400px] lg:h-[450px] flex rounded relative ${transformDiv} translate-y-[-10px] shadow-lg`}
        style={{ backgroundColor: bg }}
      >
        <Image
          src={img}
          alt={alt}
          style={{
            objectFit: "cover",
            objectPosition: position,
            transform: transformImg,
            borderRadius: "4px",
          }}
          className="shadow-lg"
        />
      </div>
    </div>
  );
}
