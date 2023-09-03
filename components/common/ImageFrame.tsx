import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type ImageFrameProp = {
  img: StaticImport;
  alt: string;
  position: string;
  bg: string;
};
export default function ImageFrame({ img, alt, position, bg }: ImageFrameProp) {
  return (
    <div className="m-6 rounded">
      <div
        className="h-[400px] flex rounded relative translate-x-[10px] translate-y-[-10px]"
        style={{ backgroundColor: bg }}
      >
        <Image
          src={img}
          alt={alt}
          style={{
            objectFit: "cover",
            objectPosition: position,
            transform: "translateX(-20px) translateY(20px)",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
}
