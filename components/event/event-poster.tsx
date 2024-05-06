import Image from "next/image";

type PosterProps = {
  src: string;
  alt: string;
};
export default function Poster({ src, alt }: PosterProps) {
  return (
    <div className="relative float-right hidden bg-yellow-400 ml-8 mb-3.5 mr-3 md:block h-[280px] w-[200px] md:h-[370px] md:w-[260px] lg:h-[450px] lg:w-[320px] box_shadow rounded-md">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover -translate-x-3 translate-y-3 box_shadow rounded-md"
      />
    </div>
  );
}
